<?php
// Admin authentication: login / logout / change username & password.
require_once __DIR__ . '/_guard.php';

header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Content-Type: application/json; charset=UTF-8');

function out($code, $arr) { http_response_code($code); echo json_encode($arr); exit; }

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') out(200, ['ok' => true]);

$creds = bh_load_creds();

// ---- GET: session status ----
if ($method === 'GET') {
    $isAdmin = bh_is_admin();
    out(200, [
        'authenticated' => $isAdmin,
        'username'      => $isAdmin ? $creds['username'] : null,
        'usingDefaults' => $isAdmin ? $creds['isDefault'] : null,
    ]);
}

if ($method !== 'POST') out(405, ['success' => false, 'message' => 'Method Not Allowed']);

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) out(400, ['success' => false, 'message' => 'Invalid request']);
$action = $in['action'] ?? 'login';

// ---- login ----
if ($action === 'login') {
    $ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $tf   = sys_get_temp_dir() . '/bh_login_' . md5($ip) . '.json';
    $t    = is_file($tf) ? json_decode(@file_get_contents($tf), true) : null;
    if (!is_array($t) || (time() - ($t['first'] ?? 0)) > 900) $t = ['count' => 0, 'first' => time()];
    if ($t['count'] >= 5) {
        out(429, ['success' => false, 'authenticated' => false, 'message' => 'Too many failed attempts. Please try again in 15 minutes.']);
    }

    $u = trim((string)($in['username'] ?? ''));
    $p = (string)($in['password'] ?? '');
    $userOk = hash_equals((string)$creds['username'], $u);
    $passOk = bh_check_password($creds, $p);

    if ($userOk && $passOk) {
        @unlink($tf);
        bh_session_start();
        session_regenerate_id(true);
        $_SESSION['bh_admin'] = true;
        $_SESSION['bh_login_at'] = time();
        session_write_close();
        out(200, ['success' => true, 'authenticated' => true, 'username' => $creds['username'], 'usingDefaults' => $creds['isDefault']]);
    }

    $t['count']++;
    @file_put_contents($tf, json_encode($t), LOCK_EX);
    usleep(500000);
    out(401, ['success' => false, 'authenticated' => false, 'message' => 'Incorrect username or password.']);
}

// ---- logout ----
if ($action === 'logout') {
    bh_session_start();
    $_SESSION = [];
    if (session_status() === PHP_SESSION_ACTIVE) session_destroy();
    out(200, ['success' => true]);
}

// ---- change username / password (must be signed in + know the current password) ----
if ($action === 'change') {
    bh_require_admin();
    $cur = (string)($in['currentPassword'] ?? '');
    if (!bh_check_password($creds, $cur)) {
        usleep(500000);
        out(403, ['success' => false, 'message' => 'Current password is incorrect.']);
    }

    $newUser = trim((string)($in['newUsername'] ?? ''));
    $newPass = (string)($in['newPassword'] ?? '');
    if ($newUser === '') $newUser = $creds['username'];

    if (!preg_match('/^[A-Za-z0-9._@-]{3,40}$/', $newUser)) {
        out(400, ['success' => false, 'message' => 'Username must be 3-40 characters (letters, numbers, . _ @ -).']);
    }
    if ($newPass !== '' && strlen($newPass) < 8) {
        out(400, ['success' => false, 'message' => 'New password must be at least 8 characters.']);
    }
    if ($newPass === '' && $newUser === $creds['username'] && !$creds['isDefault']) {
        out(400, ['success' => false, 'message' => 'Nothing to change. Enter a new username and/or a new password.']);
    }
    if ($newPass === '') $newPass = $cur; // keep same password, just rename (re-hashes it)

    if (!bh_save_creds($newUser, $newPass)) {
        out(500, ['success' => false, 'message' => 'Could not save credentials. Make sure the /api folder is writable.']);
    }

    bh_session_start();
    session_regenerate_id(true);
    $_SESSION['bh_admin'] = true;
    $_SESSION['bh_login_at'] = time();
    session_write_close();
    out(200, ['success' => true, 'username' => $newUser, 'usingDefaults' => false, 'message' => 'Credentials updated.']);
}

out(400, ['success' => false, 'message' => 'Unknown action']);
