<?php
// Robust File Upload API for Hostinger / cPanel / Apache / Nginx
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/_guard.php';
bh_require_admin();

$uploadDir = __DIR__ . '/../uploads';
if (!file_exists($uploadDir)) {
    @mkdir($uploadDir, 0777, true);
}
if (!file_exists($uploadDir)) {
    $uploadDir = __DIR__ . '/uploads';
    if (!file_exists($uploadDir)) {
        @mkdir($uploadDir, 0777, true);
    }
}

// Handle DELETE: remove uploaded file from disk
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $fileUrl = $_GET['file'] ?? null;
    if (!$fileUrl) {
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true);
        $fileUrl = $body['file'] ?? ($body['url'] ?? null);
    }

    if (!$fileUrl) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing file parameter']);
        exit();
    }

    $basename = basename($fileUrl);
    $targetPath = $uploadDir . '/' . $basename;

    if (file_exists($targetPath)) {
        @unlink($targetPath);
        echo json_encode(['success' => true, 'message' => 'File deleted from disk', 'filename' => $basename]);
    } else {
        echo json_encode(['success' => true, 'message' => 'File was already removed or does not exist', 'filename' => $basename]);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit();
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errCode = $_FILES['file']['error'] ?? 'No file';
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'File upload error code: ' . $errCode]);
    exit();
}

$file = $_FILES['file'];
$fileExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$isImage = in_array($fileExt, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif', 'pdf']);
$isVideo = in_array($fileExt, ['mp4', 'webm', 'mov', 'ogg', 'm4v', 'mkv']);

if (!$isImage && !$isVideo) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Unsupported file format. Please upload JPG, PNG, WEBP, PDF, or MP4.']);
    exit();
}

// 25MB limit for images, 150MB limit for videos
$maxImageSize = 25 * 1024 * 1024;
$maxVideoSize = 150 * 1024 * 1024;

if ($isImage && $file['size'] > $maxImageSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Image exceeds 25MB size limit.']);
    exit();
}

if ($isVideo && $file['size'] > $maxVideoSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Video exceeds 150MB size limit.']);
    exit();
}

// Generate sanitized filename
$sanitizedName = preg_replace('/[^a-zA-Z0-9_\.-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
if (strlen($sanitizedName) > 30) {
    $sanitizedName = substr($sanitizedName, 0, 30);
}
$filename = time() . '_' . $sanitizedName . '.' . $fileExt;
$targetPath = $uploadDir . '/' . $filename;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    @chmod($targetPath, 0644);
    echo json_encode([
        'success' => true,
        'url' => '/uploads/' . $filename,
        'fileUrl' => '/uploads/' . $filename,
        'fileName' => $file['name'],
        'filename' => $filename,
        'fileSize' => $file['size'],
        'fileType' => $isImage ? 'image' : 'video'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file to disk. Check folder write permissions.']);
}
