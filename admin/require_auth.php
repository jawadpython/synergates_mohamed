<?php
/**
 * Admin route protection - require authenticated session
 * Include at top of every admin page.
 */
declare(strict_types=1);

require_once dirname(__DIR__) . '/lib/admin_context.php';
require_once dirname(__DIR__) . '/api/db.php';

admin_start_session();

if (empty($_SESSION['admin_id'])) {
    header('Location: login.php?redirect=' . urlencode($_SERVER['REQUEST_URI'] ?? ''));
    exit;
}

admin_load_context($pdo);

if (empty($_SESSION['admin_id'])) {
    header('Location: login.php?redirect=' . urlencode($_SERVER['REQUEST_URI'] ?? ''));
    exit;
}
