<?php
/**
 * Thumbnail API - serves resized images for faster loading.
 * Usage: api/thumb.php?path=images/solutions/Factories.png&w=400
 * Public access (no auth) - used by solutions grid and other public pages.
 */
declare(strict_types=1);

$baseDir = dirname(__DIR__);
$imagesRoot = realpath($baseDir . '/images');
if (!$imagesRoot) {
    http_response_code(500);
    exit('Images directory not found');
}

$path = isset($_GET['path']) ? trim($_GET['path']) : '';
$maxW = isset($_GET['w']) ? (int) $_GET['w'] : 400;
$quality = isset($_GET['q']) ? min(95, max(60, (int) $_GET['q'])) : 82;

if ($path === '' || strpos($path, '..') !== false || !preg_match('#^images/[a-zA-Z0-9/_.\- ]+\.(jpg|jpeg|png|gif|webp)$#i', $path)) {
    http_response_code(400);
    exit('Invalid path');
}

$fullPath = realpath($baseDir . '/' . str_replace('/', DIRECTORY_SEPARATOR, $path));
if (!$fullPath || !is_file($fullPath) || strpos($fullPath, $imagesRoot) !== 0) {
    http_response_code(404);
    exit('Image not found');
}

$ext = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
if (!in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'], true)) {
    http_response_code(400);
    exit('Unsupported format');
}

$cacheDir = $imagesRoot . DIRECTORY_SEPARATOR . '.thumbs';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}
$cacheKey = md5($path . $maxW . $quality . filemtime($fullPath));
$cacheExt = ($ext === 'jpeg') ? 'jpg' : $ext;
$cachePath = $cacheDir . DIRECTORY_SEPARATOR . $cacheKey . '.' . $cacheExt;

if (is_file($cachePath)) {
    header('Content-Type: ' . ($ext === 'svg' ? 'image/svg+xml' : 'image/' . ($ext === 'jpg' ? 'jpeg' : $ext)));
    header('Cache-Control: public, max-age=31536000, immutable');
    header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
    readfile($cachePath);
    exit;
}

if (!extension_loaded('gd')) {
    header('Location: ../' . $path, true, 302);
    exit;
}

$info = @getimagesize($fullPath);
if (!$info) {
    http_response_code(500);
    exit('Cannot read image');
}

$origW = (int) $info[0];
$origH = (int) $info[1];
if ($origW <= $maxW) {
    header('Location: ../' . $path, true, 302);
    exit;
}

$newW = $maxW;
$newH = (int) round($origH * ($maxW / $origW));

switch ($info[2]) {
    case IMAGETYPE_JPEG: $src = @imagecreatefromjpeg($fullPath); break;
    case IMAGETYPE_PNG:  $src = @imagecreatefrompng($fullPath); break;
    case IMAGETYPE_GIF:  $src = @imagecreatefromgif($fullPath); break;
    case IMAGETYPE_WEBP: $src = function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($fullPath) : null; break;
    default: $src = null;
}

if (!$src) {
    header('Location: ../' . $path, true, 302);
    exit;
}

$dst = imagecreatetruecolor($newW, $newH);
if (!$dst) {
    imagedestroy($src);
    header('Location: ../' . $path, true, 302);
    exit;
}

if ($info[2] === IMAGETYPE_PNG) {
    imagealphablending($dst, false);
    imagesavealpha($dst, true);
    $transparent = imagecolorallocatealpha($dst, 255, 255, 255, 127);
    imagefilledrectangle($dst, 0, 0, $newW, $newH, $transparent);
}

imagecopyresampled($dst, $src, 0, 0, 0, 0, $newW, $newH, $origW, $origH);
imagedestroy($src);

$saved = false;
if ($ext === 'png' || $ext === 'gif') {
    $saved = imagepng($dst, $cachePath, 9);
} elseif ($ext === 'webp') {
    $saved = imagewebp($dst, $cachePath, $quality);
} else {
    $saved = imagejpeg($dst, $cachePath, $quality);
}
imagedestroy($dst);

if (!$saved || !is_file($cachePath)) {
    http_response_code(500);
    exit('Cache write failed');
}

header('Content-Type: image/' . ($ext === 'jpg' || $ext === 'jpeg' ? 'jpeg' : $ext));
header('Cache-Control: public, max-age=31536000, immutable');
header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 31536000) . ' GMT');
readfile($cachePath);
