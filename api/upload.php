<?php
/**
 * Secure image upload endpoint - admin only
 * Accepts: multipart/form-data with 'image' field
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/../lib/admin_context.php';
admin_api_guard('blogs');

$allowedTypes = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/gif'  => 'gif',
    'image/webp' => 'webp',
];

$maxSize = 5 * 1024 * 1024; // 5 MB
$uploadDir = dirname(__DIR__) . '/uploads/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $code = $_FILES['image']['error'] ?? -1;
    $errors = [
        UPLOAD_ERR_INI_SIZE   => 'File exceeds server limit',
        UPLOAD_ERR_FORM_SIZE  => 'File too large',
        UPLOAD_ERR_PARTIAL    => 'Upload incomplete',
        UPLOAD_ERR_NO_FILE    => 'No file uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Server temp folder missing',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file',
        UPLOAD_ERR_EXTENSION  => 'Upload blocked by extension',
    ];
    http_response_code(400);
    echo json_encode(['error' => $errors[$code] ?? 'Upload failed']);
    exit;
}

$file = $_FILES['image'];
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large (max 5MB)']);
    exit;
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);

if (!isset($allowedTypes[$mime])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP']);
    exit;
}

$ext = $allowedTypes[$mime];
$name = bin2hex(random_bytes(16)) . '.' . $ext;
$path = $uploadDir . $name;

if (!move_uploaded_file($file['tmp_name'], $path)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
    exit;
}

$baseUrl = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/');
$url = $baseUrl . '/uploads/' . $name;

echo json_encode([
    'success' => true,
    'url'     => $url,
    'name'    => $name,
]);
