<?php
// Robust Cloud Sync API for Client Inquiries (Hostinger / cPanel / Apache / Nginx)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma, Expires');
header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0');
header('Pragma: no-cache');
header('Expires: 0');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/_guard.php';

$dataDir = __DIR__ . '/../data';
if (!file_exists($dataDir)) {
    @mkdir($dataDir, 0777, true);
}
if (!file_exists($dataDir)) {
    $dataDir = __DIR__ . '/data';
    if (!file_exists($dataDir)) {
        @mkdir($dataDir, 0777, true);
    }
}

$file = $dataDir . '/inquiries.json';
if (!file_exists($file) || filesize($file) < 2) {
    @file_put_contents($file, json_encode([], JSON_PRETTY_PRINT), LOCK_EX);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    bh_require_admin(); // client inquiries contain personal data
    $content = @file_get_contents($file);
    $parsed = json_decode($content, true);
    echo json_encode(is_array($parsed) ? $parsed : [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit();
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    // Admin panel sync: a full list replaces the stored inquiries (admin only)
    if (is_array($data) && ($data === [] || array_keys($data) === range(0, count($data) - 1))) {
        bh_require_admin();
        $clean = array_values(array_filter($data, function($i) { return is_array($i) && !empty($i['id']); }));
        @file_put_contents($file, json_encode($clean, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
        echo json_encode(['success' => true, 'inquiries' => $clean], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit();
    }

    if (is_array($data)) {
        $existing = json_decode(@file_get_contents($file), true) ?: [];
        $isAdminPost = bh_is_admin();
        
        // Format inquiry
        $inquiry = [
            'id' => $data['id'] ?? ('inq-' . round(microtime(true) * 1000)),
            'gemstoneName' => $data['gemstoneName'] ?? 'General Advisory',
            'clientName' => $data['clientName'] ?? 'Valued Client',
            'email' => $data['email'] ?? '',
            'phone' => $data['phone'] ?? '',
            'country' => $data['country'] ?? '',
            'contactMethod' => $data['contactMethod'] ?? 'Email',
            'message' => $data['message'] ?? '',
            'status' => $isAdminPost ? ($data['status'] ?? 'New') : 'New',
            'createdAt' => $data['createdAt'] ?? date('m/d/Y h:i:s A'),
            'adminNotes' => $isAdminPost ? ($data['adminNotes'] ?? '') : ''
        ];

        // Filter out duplicate ID if already exists
        $filtered = array_values(array_filter($existing, function($item) use ($inquiry) {
            return ($item['id'] ?? '') !== $inquiry['id'];
        }));

        array_unshift($filtered, $inquiry);

        $written = @file_put_contents($file, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
        if ($written === false) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to write inquiry to disk.']);
            exit();
        }

        echo json_encode([
            'success' => true, 
            'inquiry' => $inquiry, 
            'inquiries' => $filtered
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON payload received']);
    }
    exit();
}

if ($method === 'PATCH') {
    bh_require_admin();
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (is_array($data) && isset($data['id'])) {
        $existing = json_decode(@file_get_contents($file), true) ?: [];
        $found = false;

        foreach ($existing as &$inq) {
            if (($inq['id'] ?? '') === $data['id']) {
                $found = true;
                if (isset($data['status'])) $inq['status'] = $data['status'];
                if (isset($data['adminNotes'])) $inq['adminNotes'] = $data['adminNotes'];
            }
        }

        if ($found) {
            $written = @file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
            if ($written === false) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Failed to update inquiry file.']);
                exit();
            }
            echo json_encode(['success' => true, 'inquiries' => $existing], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Inquiry not found with given ID']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid ID or data provided']);
    }
    exit();
}

if ($method === 'DELETE') {
    bh_require_admin();
    $id = $_GET['id'] ?? null;
    $clearAll = $_GET['clearAll'] ?? null;
    if (!$id && !$clearAll) {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        $id = $data['id'] ?? null;
        $clearAll = $data['clearAll'] ?? null;
    }

    if ($clearAll === 'true' || $id === 'all') {
        @file_put_contents($file, json_encode([], JSON_PRETTY_PRINT), LOCK_EX);
        echo json_encode(['success' => true, 'count' => 0, 'inquiries' => []]);
        exit();
    }

    if ($id) {
        $existing = json_decode(@file_get_contents($file), true) ?: [];
        $filtered = array_values(array_filter($existing, function($inq) use ($id) {
            return ($inq['id'] ?? '') !== $id;
        }));

        $written = @file_put_contents($file, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
        if ($written === false) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to delete inquiry from storage.']);
            exit();
        }

        echo json_encode(['success' => true, 'inquiries' => $filtered]);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing ID parameter']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
