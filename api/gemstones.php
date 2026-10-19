<?php
// Robust Cloud Sync API for Gemstones (Hostinger / cPanel / Apache / Nginx)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
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

// Locate data directory (supports both standard root structure and public_html structure)
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

$file = $dataDir . '/gemstones.json';

$defaultGems = [
  [
    'id' => 'bg-001',
    'name' => 'Natural Royal Blue Sapphire',
    'slug' => 'natural-royal-blue-sapphire-ceylon',
    'category' => 'blue-sapphire',
    'subcategory' => 'Royal Blue Sapphire',
    'mainImage' => '/gems/blue_sapphire.jpg',
    'galleryImages' => ['/gems/blue_sapphire.jpg', '/gems/hero_banner.jpg'],
    'videoUrl' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'videoThumbnail' => '/gems/blue_sapphire.jpg',
    'featuredMediaType' => 'image',
    'caratWeight' => 3.25,
    'color' => 'Royal Blue',
    'shape' => 'Oval Cut',
    'cut' => 'Mixed Brilliant Cut',
    'origin' => 'Ratnapura, Sri Lanka (Ceylon)',
    'treatment' => 'Unheated / Natural',
    'certification' => 'GIA Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'An exceptional unheated Ceylon Royal Blue Sapphire possessing intense saturated color and natural brilliance.',
    'fullDescription' => 'Mined from the alluvial gem deposits of Ratnapura, Ceylon, this 3.25 carat sapphire exhibits the classic deep velvety blue hue prized by connoisseurs worldwide. Complete clarity with zero thermal enhancement.',
    'featured' => true,
    'displayOrder' => 1
  ],
  [
    'id' => 'bg-002',
    'name' => 'Ceylon Vivid Red Ruby',
    'slug' => 'ceylon-vivid-red-ruby',
    'category' => 'rubies',
    'subcategory' => 'Faceted Ruby',
    'mainImage' => '/gems/ruby.jpg',
    'galleryImages' => ['/gems/ruby.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 2.10,
    'color' => 'Pigeon Blood Red',
    'shape' => 'Cushion Cut',
    'cut' => 'Faceted Cushion',
    'origin' => 'Pelmadulla, Sri Lanka (Ceylon)',
    'treatment' => 'Unheated',
    'certification' => 'GRS Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Rare Ceylon natural ruby with vivid saturation, fiery luster, and exceptional internal purity.',
    'fullDescription' => 'A magnificent 2.10 ct unheated ruby from the historical mines of Pelmadulla. Ceylon rubies of this purity and bright red tone are extraordinarily scarce.',
    'featured' => true,
    'displayOrder' => 2
  ],
  [
    'id' => 'bg-003',
    'name' => 'Natural Padparadscha Sapphire',
    'slug' => 'natural-ceylon-padparadscha-sapphire',
    'category' => 'other-gems',
    'subcategory' => 'Padparadscha',
    'mainImage' => '/gems/padparadscha.jpg',
    'galleryImages' => ['/gems/padparadscha.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 2.85,
    'color' => 'Sunset Lotus Pink-Orange',
    'shape' => 'Oval Cut',
    'cut' => 'Custom Portuguese Cut',
    'origin' => 'Elahera, Sri Lanka (Ceylon)',
    'treatment' => 'Unheated',
    'certification' => 'SSEF Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'The king of sapphires — an authentic Sri Lankan Padparadscha displaying a perfect balance of lotus pink and orange.',
    'fullDescription' => 'Named after the Singhalese word for lotus blossom ("Padma Raga"), this gem embodies the quintessential Ceylon Padparadscha glow without heat treatment.',
    'featured' => true,
    'displayOrder' => 3
  ],
  [
    'id' => 'bg-004',
    'name' => 'Cornflower Blue Sapphire',
    'slug' => 'cornflower-blue-sapphire-ceylon',
    'category' => 'blue-sapphire',
    'subcategory' => 'Cornflower Blue Sapphire',
    'mainImage' => '/gems/blue_sapphire.jpg',
    'galleryImages' => ['/gems/blue_sapphire.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 4.15,
    'color' => 'Cornflower Blue',
    'shape' => 'Cushion Cut',
    'cut' => 'Step Cut Cushion',
    'origin' => 'Balangoda, Sri Lanka (Ceylon)',
    'treatment' => 'Unheated',
    'certification' => 'GUBELIN Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Soft, silky cornflower blue sapphire with mesmerizing light dispersion.',
    'fullDescription' => 'A classic 4.15 ct Ceylon cornflower sapphire showing vivid open blue tone without dark extinction zones.',
    'featured' => true,
    'displayOrder' => 4
  ],
  [
    'id' => 'bg-005',
    'name' => 'Unheated Yellow Sapphire',
    'slug' => 'unheated-yellow-sapphire-ceylon',
    'category' => 'other-gems',
    'subcategory' => 'Yellow Sapphire',
    'mainImage' => '/gems/yellow_sapphire.jpg',
    'galleryImages' => ['/gems/yellow_sapphire.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 5.50,
    'color' => 'Golden Canary Yellow',
    'shape' => 'Emerald Cut',
    'cut' => 'Step Cut',
    'origin' => 'Ratnapura, Sri Lanka (Ceylon)',
    'treatment' => 'Unheated',
    'certification' => 'GIA Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Vibrant golden canary yellow sapphire, known in Sri Lankan heritage as Pushparaga.',
    'fullDescription' => 'High clarity 5.50 ct yellow sapphire displaying rich golden hue, prized for both aesthetic beauty and astrological resonance.',
    'featured' => true,
    'displayOrder' => 5
  ],
  [
    'id' => 'bg-006',
    'name' => 'Alexandrite Specimen',
    'slug' => 'natural-alexandrite-cats-eye-ceylon',
    'category' => 'other-gems',
    'subcategory' => 'Alexandrite',
    'mainImage' => '/gems/alexandrite.jpg',
    'galleryImages' => ['/gems/alexandrite.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 1.95,
    'color' => 'Teal Green to Purple Red',
    'shape' => 'Cabochon',
    'cut' => 'High Dome Cabochon',
    'origin' => 'Kuruwita, Sri Lanka (Ceylon)',
    'treatment' => 'Unheated',
    'certification' => 'GRS Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Extremely rare Ceylon Alexandrite displaying prominent color change.',
    'fullDescription' => 'Combines nature\'s rarest optical phenomena in a single gem: color change from daylight teal green to incandescent purple red.',
    'featured' => true,
    'displayOrder' => 6
  ],
  [
    'id' => 'bg-007',
    'name' => 'Vivid Pink Sapphire',
    'slug' => 'vivid-pink-ceylon-sapphire',
    'category' => 'other-gems',
    'subcategory' => 'Pink Sapphire',
    'mainImage' => '/gems/pink_sapphire.jpg',
    'galleryImages' => ['/gems/pink_sapphire.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 2.40,
    'color' => 'Vivid Hot Pink',
    'shape' => 'Pear Cut',
    'cut' => 'Brilliant Pear Cut',
    'origin' => 'Ratnapura, Sri Lanka (Ceylon)',
    'treatment' => 'Unheated',
    'certification' => 'C.DUNAIGRE Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Extremely vivid unheated pink sapphire with intense sparkle.',
    'fullDescription' => 'Ceylon pink sapphires are revered for open bright tones. This 2.40 ct pear-cut specimen possesses remarkable scintillation.',
    'featured' => true,
    'displayOrder' => 7
  ],
  [
    'id' => 'bg-008',
    'name' => 'Cobalt Blue Spinel',
    'slug' => 'natural-cobalt-blue-spinel-ceylon',
    'category' => 'other-gems',
    'subcategory' => 'Spinel',
    'mainImage' => '/gems/cobalt_spinel.jpg',
    'galleryImages' => ['/gems/cobalt_spinel.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 1.80,
    'color' => 'Electric Cobalt Blue',
    'shape' => 'Cushion Cut',
    'cut' => 'Brilliant Cushion',
    'origin' => 'Ratnapura, Ceylon',
    'treatment' => 'Untreated',
    'certification' => 'GRS Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Rare electric cobalt blue spinel with natural vivid saturation.',
    'fullDescription' => 'Cobalt spinel is one of the world\'s most coveted collector gems due to its natural electric neon blue glow.',
    'featured' => true,
    'displayOrder' => 8
  ],
  [
    'id' => 'bg-009',
    'name' => 'Ceylon Star Sapphire',
    'slug' => 'ceylon-star-sapphire-specimen',
    'category' => 'blue-sapphire',
    'subcategory' => 'Star Sapphire',
    'mainImage' => '/gems/blue_sapphire.jpg',
    'galleryImages' => ['/gems/blue_sapphire.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 6.20,
    'color' => 'Silky Royal Blue',
    'shape' => 'Cabochon',
    'cut' => 'Oval Cabochon',
    'origin' => 'Ratnapura, Ceylon',
    'treatment' => 'Unheated',
    'certification' => 'GIA Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Unheated blue star sapphire specimen with sharp 6-ray star asterism.',
    'fullDescription' => 'Authentic 6.20 ct Ceylon star sapphire showing complete centered star legs under direct point light.',
    'featured' => true,
    'displayOrder' => 9
  ],
  [
    'id' => 'bg-010',
    'name' => 'Chrysoberyl Cat\'s Eye',
    'slug' => 'chrysoberyl-cats-eye-ceylon',
    'category' => 'other-gems',
    'subcategory' => 'Cat\'s Eye',
    'mainImage' => '/gems/padparadscha.jpg',
    'galleryImages' => ['/gems/padparadscha.jpg'],
    'featuredMediaType' => 'image',
    'caratWeight' => 3.50,
    'color' => 'Honey Green (Milk & Honey)',
    'shape' => 'High Cabochon',
    'cut' => 'Oval Cabochon',
    'origin' => 'Pelmadulla, Ceylon',
    'treatment' => 'Unheated',
    'certification' => 'GRS Certified',
    'price' => 'Price on Request',
    'availability' => 'Available',
    'shortDescription' => 'Classic Ceylon honey green Chrysoberyl Cat\'s Eye with razor-sharp eye opening effect.',
    'fullDescription' => 'Famous milk and honey effect where one half appears honey brown while the other shows milky white tone as light rotates.',
    'featured' => true,
    'displayOrder' => 10
  ]
];

// Ensure database file exists
if (!file_exists($file) || filesize($file) < 5) {
    @file_put_contents($file, json_encode($defaultGems, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

$method = $_SERVER['REQUEST_METHOD'];

// GET: Fetch all gemstones
if ($method === 'GET') {
    $content = @file_get_contents($file);
    if ($content && strlen(trim($content)) > 1) {
        $parsed = json_decode($content, true);
        if (is_array($parsed)) {
            echo json_encode($parsed, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            exit();
        }
    }
    echo json_encode($defaultGems, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit();
}

// POST or PUT: Save/Update gemstones
if ($method === 'POST' || $method === 'PUT') {
    bh_require_admin();
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON payload received']);
        exit();
    }

    $gemsToSave = (is_array($data) && isset($data['gemstones'])) ? $data['gemstones'] : $data;

    $jsonEncoded = json_encode($gemsToSave, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    $written = @file_put_contents($file, $jsonEncoded, LOCK_EX);

    if ($written === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to write gemstones to storage file. Check folder write permissions.']);
        exit();
    }

    echo json_encode([
        'success' => true, 
        'count' => count($gemsToSave), 
        'timestamp' => time(), 
        'gemstones' => $gemsToSave
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit();
}

// DELETE: Remove a gemstone by ID
if ($method === 'DELETE') {
    bh_require_admin();
    $id = $_GET['id'] ?? null;
    if (!$id) {
        $raw = file_get_contents('php://input');
        $body = json_decode($raw, true);
        $id = $body['id'] ?? null;
    }

    if ($id && file_exists($file)) {
        $existing = json_decode(@file_get_contents($file), true) ?: [];
        $filtered = array_values(array_filter($existing, function($gem) use ($id) {
            return ($gem['id'] ?? '') !== $id;
        }));

        $written = @file_put_contents($file, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
        if ($written === false) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Failed to delete gemstone from storage.']);
            exit();
        }

        echo json_encode(['success' => true, 'count' => count($filtered), 'gemstones' => $filtered]);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing ID or file not found']);
    }
    exit();
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
