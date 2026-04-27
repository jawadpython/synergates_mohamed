<?php
/**
 * Content API - GET/POST page content
 * GET: ?slug=about&lang=en
 * POST: slug, title, content, lang (requires admin auth)
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/db.php';
require_once dirname(__DIR__) . '/lib/security.php';

$slug = sanitize_slug($_GET['slug'] ?? $_POST['slug'] ?? '');
$lang = preg_match('/^[a-z]{2}$/', $_GET['lang'] ?? $_POST['lang'] ?? 'en') ? ($_GET['lang'] ?? $_POST['lang'] ?? 'en') : 'en';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['list'])) {
    require_once __DIR__ . '/../lib/admin_context.php';
    admin_api_guard('pages');
    $stmt = $pdo->query('SELECT slug, title, lang, updated_at FROM pages ORDER BY slug, lang');
    $pages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['pages' => $pages]);
    exit;
}

if (empty($slug)) {
    http_response_code(400);
    echo json_encode(['error' => 'Slug is required']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare('SELECT slug, title, content, lang, updated_at FROM pages WHERE slug = ? AND lang = ? LIMIT 1');
    $stmt->execute([$slug, $lang]);
    $page = $stmt->fetch();

    if (!$page) {
        http_response_code(404);
        echo json_encode(['error' => 'Page not found']);
        exit;
    }

    echo json_encode([
        'slug'      => $page['slug'],
        'title'     => $page['title'],
        'content'   => $page['content'],
        'lang'      => $page['lang'],
        'updated_at'=> $page['updated_at'],
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once __DIR__ . '/../lib/admin_context.php';
    admin_api_guard('pages');

    $title = trim($_POST['title'] ?? '');
    $content = $_POST['content'] ?? '';

    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['error' => 'Title is required']);
        exit;
    }

    $content = sanitize_html($content);
    $stmt = $pdo->prepare('INSERT INTO pages (slug, title, content, lang) VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content), updated_at = NOW()');
    $stmt->execute([$slug, $title, $content, $lang]);

    echo json_encode(['success' => true, 'slug' => $slug, 'lang' => $lang]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
