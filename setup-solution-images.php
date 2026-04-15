<?php
/**
 * Setup: Create missing challenge and "What we offer" images for all solution-detail scenarios.
 * Copies from shared source images so every section has its required image files.
 * Run from CLI: php admin/setup-solution-images.php
 * Or visit in browser when logged in as admin.
 */
declare(strict_types=1);

if (php_sapi_name() !== 'cli') {
    require_once __DIR__ . '/require_auth.php';
}

$baseDir = dirname(__DIR__);
$imgRoot = $baseDir . '/images/solution-detail';

// Load config
$slotsConfig = @include $baseDir . '/config/image-slots.php';
if (!is_array($slotsConfig)) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Config not found']);
    exit;
}

// Collect all solution-detail slot paths (challenge + offer) - only from solution-detail
$pathsToCreate = [];
foreach ($slotsConfig as $group) {
    foreach ($group['slots'] ?? [] as $slot) {
        $path = $slot['path'] ?? '';
        if ($path && strpos($path, 'images/solution-detail/') === 0 && preg_match('#\.(jpg|jpeg|png|gif|webp)$#i', $path)) {
            $fullPath = $baseDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $path);
            if (!file_exists($fullPath) || !is_file($fullPath)) {
                $pathsToCreate[] = ['path' => $path, 'full' => $fullPath];
            }
        }
    }
}

// Find a source image to copy from
$sourceCandidates = [
    'images/solution-detail/photo16.jpg',
    'images/solution-detail/photo8.jpg',
    'images/solution-detail/photo18.jpg',
    'images/solution-detail/photo3.jpg',
];
$sourceImage = null;
foreach ($sourceCandidates as $rel) {
    $full = $baseDir . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);
    if (is_file($full)) {
        $sourceImage = $full;
        break;
    }
}
if (!$sourceImage) {
    $files = glob($baseDir . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'solution-detail' . DIRECTORY_SEPARATOR . '*.jpg');
    $sourceImage = $files[0] ?? null;
}
// Minimal 1x1 gray JPEG as fallback (valid JPEG)
$minimalJpeg = "\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.' \x22\x22(2,#\x1c\x1c(7<7:29\x01\t\t\t\x0c\x0b\x0c\x18\r\r\x182!\x1c!22222222222222222222222222222222222222222222222222\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xff\xc4\x00\xb5\x10\x00\x02\x01\x03\x03\x02\x04\x03\x05\x05\x04\x04\x00\x00\x01}\x01\x02\x03\x00\x04\x11\x05\x12!1A\x06\x13Qa\x07\x22q\x142\x81\x91\xa1\x08#B\xb1\xc1\x15R\xd1\xf0$3br\x82\t\n\x16\x17\x18\x19\x1a%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz\x83\x84\x85\x86\x87\x88\x89\x8a\x92\x93\x94\x95\x96\x97\x98\x99\x9a\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xff\xda\x00\x08\x01\x01\x00\x00\x00?\x00\xfc\xbf\xff\xd9";

if (!$sourceImage || !is_file($sourceImage)) {
    $sourceImage = null;
}

$copied = 0;
$errors = [];

foreach ($pathsToCreate as $item) {
    $fullPath = $item['full'];
    $relPath = $item['path'];
    $dir = dirname($fullPath);
    if (!is_dir($dir)) {
        if (!@mkdir($dir, 0755, true)) {
            $errors[] = "Cannot create directory: " . basename($dir);
            continue;
        }
    }
    $ok = false;
    if ($sourceImage && is_file($sourceImage)) {
        $ok = @copy($sourceImage, $fullPath);
    }
    if (!$ok && $minimalJpeg && file_put_contents($fullPath, $minimalJpeg) !== false) {
        $ok = true;
    }
    if ($ok) {
        $copied++;
    } else {
        $errors[] = "Failed: $relPath";
    }
}

header('Content-Type: application/json');
echo json_encode([
    'success' => empty($errors),
    'copied' => $copied,
    'total_missing' => count($pathsToCreate),
    'errors' => array_slice($errors, 0, 30),
    'message' => "Created $copied of " . count($pathsToCreate) . " missing images. " . (count($errors) ? count($errors) . ' failed.' : '')
]);
