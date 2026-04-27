<?php
/**
 * Admin roles & permissions (session + DB sync).
 * Permission keys must match across UI and api guards.
 */
declare(strict_types=1);

/** @return array<string, string> */
function admin_permission_labels(): array
{
    return [
        'images'   => 'Image editor',
        'blogs'    => 'Blog posts',
        'faqs'     => 'FAQ',
        'messages' => 'Contact messages',
        'pages'    => 'Editable pages (CMS)',
    ];
}

function admin_start_session(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start([
            'cookie_httponly' => true,
            'cookie_secure'   => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
            'cookie_samesite' => 'Lax',
        ]);
    }
}

/**
 * Refresh $_SESSION admin flags from database (call after login and on each authenticated request).
 */
function admin_load_context(PDO $pdo): void
{
    admin_start_session();
    $id = (int) ($_SESSION['admin_id'] ?? 0);
    if ($id <= 0) {
        return;
    }

    try {
        $stmt = $pdo->prepare(
            'SELECT username, is_super_admin, is_active, permissions FROM admins WHERE id = ? LIMIT 1'
        );
        $stmt->execute([$id]);
    } catch (PDOException $e) {
        // Schema not migrated yet — treat as full access
        $_SESSION['admin_super'] = true;
        $_SESSION['admin_perms'] = [];
        return;
    }

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row || empty($row['is_active'])) {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], (bool) $params['secure'], (bool) $params['httponly']);
        }
        return;
    }

    $_SESSION['admin_username'] = (string) $row['username'];
    $_SESSION['admin_super'] = !empty($row['is_super_admin']);
    $p = $row['permissions'] ?? null;
    if (is_string($p) && $p !== '') {
        $dec = json_decode($p, true);
        $_SESSION['admin_perms'] = is_array($dec) ? $dec : [];
    } else {
        $_SESSION['admin_perms'] = [];
    }
}

function admin_is_super(): bool
{
    return !empty($_SESSION['admin_super']);
}

function admin_can(string $perm): bool
{
    if (admin_is_super()) {
        return true;
    }
    $perms = $_SESSION['admin_perms'] ?? [];
    return is_array($perms) && !empty($perms[$perm]);
}

/**
 * Stop with plain text (admin PHP pages).
 */
function admin_deny_page(string $message = 'Access denied'): void
{
    http_response_code(403);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Forbidden</title></head><body style="font-family:system-ui;padding:2rem">';
    echo '<h1>403 Forbidden</h1><p>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
    echo '<p><a href="dashboard.php">Back to admin</a></p></body></html>';
    exit;
}

function admin_require_can(string $perm): void
{
    if (!admin_can($perm)) {
        admin_deny_page('You do not have permission for this section.');
    }
}

function admin_require_super(): void
{
    if (!admin_is_super()) {
        admin_deny_page('Only super administrators can manage user accounts.');
    }
}

/**
 * JSON APIs: require login + permission. Sends JSON and exits.
 */
function admin_api_guard(string $perm): void
{
    require_once __DIR__ . '/../api/db.php';
    admin_start_session();
    header('Content-Type: application/json; charset=utf-8');

    if (empty($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    admin_load_context($pdo);

    if (empty($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    if (!admin_can($perm)) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden']);
        exit;
    }
}

/**
 * First admin section this user may open (for smart redirects).
 */
function admin_first_allowed_path(): ?string
{
    if (admin_is_super() || admin_can('images')) {
        return 'dashboard.php';
    }
    if (admin_can('blogs')) {
        return 'blogs.php';
    }
    if (admin_can('faqs')) {
        return 'faqs.php';
    }
    if (admin_can('messages')) {
        return 'messages.php';
    }
    if (admin_can('pages')) {
        return 'no-access.php';
    }
    return null;
}
