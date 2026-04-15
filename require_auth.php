<?php
/**
 * Admin route protection - require authenticated session
 * Include at top of every admin page.
 */
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_secure'   => isset($_SERVER['HTTPS']),
        'cookie_samesite' => 'Lax',
    ]);
}

if (empty($_SESSION['admin_id']) || empty($_SESSION['admin_username'])) {
    header('Location: login.php?redirect=' . urlencode($_SERVER['REQUEST_URI'] ?? ''));
    exit;
}
