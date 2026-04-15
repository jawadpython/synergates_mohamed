<?php
/**
 * Returns current IMAGE_VERSION for cache busting. No auth required.
 * Browsers must not cache this - ensures fresh version after admin replaces images.
 */
declare(strict_types=1);

header('Content-Type: application/javascript; charset=utf-8');
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

echo 'window.IMAGE_VERSION = "' . addslashes($version) . '";';
