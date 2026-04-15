<?php
/**
 * Returns current IMAGE_VERSION as JSON. No auth required.
 * Used by image-cache-bust.js with fetch(cache:'no-store') to bypass all caches.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

$baseDir = dirname(__DIR__);
$versionFile = $baseDir . '/js/image-version.js';
$version = (string) time();

if (is_file($versionFile)) {
    $content = file_get_contents($versionFile);
    if (preg_match('/IMAGE_VERSION\s*=\s*"([^"]+)"/', $content, $m)) {
        $version = $m[1];
    }
}

echo json_encode(['v' => $version]);
