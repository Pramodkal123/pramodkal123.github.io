<?php
// Robust Cloud Sync API for Site Configuration (Hostinger / cPanel / Apache / Nginx)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
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

$file = $dataDir . '/site-config.json';

$defaultConfig = [
    'heroBannerImage' => '/hero-mining.jpg',
    'heroTagline' => 'CEYLON GEMSTONES · SRI LANKA',
    'heroTitle' => 'Blue Hues',
    'heroDescription1' => 'Sustainable gemstone mining and selling from the heart of Sri Lanka.',
    'heroDescription2' => 'Preserving heritage, protecting nature, and honouring artisanal craftsmanship.',
    'heroVideos' => [
        ['id' => 'vid-1', 'label' => '01', 'url' => '/videos/hero/gem1.mp4', 'title' => 'Ceylon Royal Blue Sapphire'],
        ['id' => 'vid-2', 'label' => '02', 'url' => '/videos/hero/gem2.mp4', 'title' => 'Natural Vivid Ruby'],
        ['id' => 'vid-3', 'label' => '03', 'url' => '/videos/hero/gem3.mp4', 'title' => 'Natural Padparadscha Sapphire'],
        ['id' => 'vid-4', 'label' => '04', 'url' => '/videos/hero/gem4.mp4', 'title' => 'Cornflower Blue Sapphire']
    ],
    'editorialIntroImage' => '/gems/blue_sapphire.jpg',
    'categoryBlueSapphireImage' => '/gems/blue_sapphire.jpg',
    'categoryRubiesImage' => '/gems/ruby.jpg',
    'categorySemiPreciousImage' => '/gems/semi_precious.jpg',
    'aboutBannerImage' => '/sustainability.jpg',
    'contactPhone' => '+94 72 355 3882',
    'contactEmail' => 'sales-us@ceybluehues.com',
    'whatsappNumber' => '94723553882'
];

if (!file_exists($file) || filesize($file) < 5) {
    @file_put_contents($file, json_encode($defaultConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (file_exists($file)) {
        $content = @file_get_contents($file);
        $parsed = json_decode($content, true);
        if (is_array($parsed)) {
            $merged = array_merge($defaultConfig, $parsed);
            echo json_encode($merged, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            exit();
        }
    }
    echo json_encode($defaultConfig, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit();
}

if ($method === 'POST' || $method === 'PUT') {
    bh_require_admin();
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (is_array($data)) {
        $configToSave = isset($data['siteConfig']) && is_array($data['siteConfig']) ? $data['siteConfig'] : $data;
        $merged = array_merge($defaultConfig, $configToSave);
        
        $written = @file_put_contents($file, json_encode($merged, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
        if ($written === false) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to write site configuration to disk.']);
            exit();
        }

        echo json_encode([
            'success' => true, 
            'timestamp' => time(), 
            'siteConfig' => $merged,
            'config' => $merged
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON payload received']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
