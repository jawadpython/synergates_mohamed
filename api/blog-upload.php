<?php
/**
 * Blog image upload (featured + content) — admin session required.
 * Returns JSON { success, url } with url relative to site root (e.g. uploads/xxx.jpg)
 * so admin/blog-edit.php can prefix with ../ correctly.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_httponly' => true,
        'cookie_secure'   => isset($_SERVER['HTTPS']),
        'cookie_samesite' => 'Lax',
    ]);
}

if (empty($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized. Please log in to the admin panel again.']);
    exit;
}

$allowedTypes = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/gif'  => 'gif',
    'image/webp' => 'webp',
];

$maxSize = 10 * 1024 * 1024; // 10 MB (matches admin UI copy)
$uploadDir = dirname(__DIR__) . '/uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $code = $_FILES['image']['error'] ?? -1;
    $errors = [
        UPLOAD_ERR_INI_SIZE   => 'File exceeds server limit (check PHP upload_max_filesize)',
        UPLOAD_ERR_FORM_SIZE  => 'File too large',
        UPLOAD_ERR_PARTIAL    => 'Upload incomplete',
        UPLOAD_ERR_NO_FILE    => 'No file uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Server temp folder missing',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file',
        UPLOAD_ERR_EXTENSION  => 'Upload blocked by extension',
    ];
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $errors[$code] ?? 'Upload failed']);
    exit;
}

$file = $_FILES['image'];
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File too large (max 10MB)']);
    exit;
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);

if (!isset($allowedTypes[$mime])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP']);
    exit;
}

$ext = $allowedTypes[$mime];
$name = bin2hex(random_bytes(16)) . '.' . $ext;
$path = $uploadDir . $name;

if (!move_uploaded_file($file['tmp_name'], $path)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save file']);
    exit;
}

// Relative URL from site root — works with ../ from admin/ and direct from public pages
$url = 'uploads/' . $name;

echo json_encode([
    'success' => true,
    'url'     => $url,
    'name'    => $name,
]);
