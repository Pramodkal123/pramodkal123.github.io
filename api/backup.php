<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/_guard.php';
bh_require_admin();

$dataDir = __DIR__ . '/../data';
$gemsFile = $dataDir . '/gemstones.json';
$inqFile = $dataDir . '/inquiries.json';
$configFile = $dataDir . '/site-config.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $gems = file_exists($gemsFile) ? json_decode(file_get_contents($gemsFile), true) : [];
    $inqs = file_exists($inqFile) ? json_decode(file_get_contents($inqFile), true) : [];
    $config = file_exists($configFile) ? json_decode(file_get_contents($configFile), true) : [];

    echo json_encode([
        'backupDate' => date('Y-m-d H:i:s'),
        'version' => '5.0',
        'gemstones' => $gems,
        'inquiries' => $inqs,
        'siteConfig' => $config
    ], JSON_PRETTY_PRINT);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid backup JSON']);
        exit;
    }

    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    if (isset($input['gemstones']) && is_array($input['gemstones'])) {
        file_put_contents($gemsFile, json_encode($input['gemstones'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
    }
    if (isset($input['inquiries']) && is_array($input['inquiries'])) {
        file_put_contents($inqFile, json_encode($input['inquiries'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
    }
    if (isset($input['siteConfig']) && is_array($input['siteConfig'])) {
        file_put_contents($configFile, json_encode($input['siteConfig'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Backup restored successfully'
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
?>
