<?php
// Shared admin-session helpers for all /api/*.php endpoints.

function bh_session_start() {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_name('bh_admin');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => $https,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    @session_start();
}

// True when the request carries a valid admin login session (8 hour lifetime).
function bh_is_admin() {
    bh_session_start();
    $ok = !empty($_SESSION['bh_admin']) && (time() - (int)($_SESSION['bh_login_at'] ?? 0)) < 28800;
    if (session_status() === PHP_SESSION_ACTIVE) session_write_close();
    return $ok;
}

function bh_require_admin() {
    if (!bh_is_admin()) {
        http_response_code(401);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'authenticated' => false, 'error' => 'Unauthorized. Please sign in to the admin panel.']);
        exit();
    }
}

// Credentials live in a PHP file (never served as plain text). Password is stored hashed.
function bh_cred_file() { return __DIR__ . '/admin-credentials.php'; }

// First-run defaults, used only until the owner saves new credentials in the admin panel.
const BH_DEFAULT_USER = 'admin';
const BH_DEFAULT_PASS = 'Bluehues@2026';

function bh_load_creds() {
    $f = bh_cred_file();
    if (is_file($f)) {
        $c = @include $f;
        if (is_array($c) && !empty($c['username']) && !empty($c['hash'])) {
            return ['username' => $c['username'], 'hash' => $c['hash'], 'isDefault' => false];
        }
    }
    return ['username' => BH_DEFAULT_USER, 'hash' => null, 'isDefault' => true];
}

function bh_check_password($creds, $password) {
    if ($creds['isDefault']) return hash_equals(BH_DEFAULT_PASS, (string)$password);
    return password_verify((string)$password, $creds['hash']);
}

function bh_save_creds($username, $password) {
    $php = "<?php\n// Admin login credentials (password is hashed). Managed from Admin > Account & Security.\nreturn " .
        var_export(['username' => $username, 'hash' => password_hash($password, PASSWORD_DEFAULT)], true) . ";\n";
    $ok = @file_put_contents(bh_cred_file(), $php, LOCK_EX);
    if ($ok !== false) @chmod(bh_cred_file(), 0600);
    return $ok !== false;
}
