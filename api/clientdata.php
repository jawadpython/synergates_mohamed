<?php
/**
 * Serves clientdata.txt content for client modal.
 * Use this when direct .txt fetch fails (CORS, path).
 */
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store, no-cache');
$file = dirname(__DIR__) . '/clientdata.txt';
if (is_file($file)) {
    readfile($file);
} else {
    http_response_code(404);
    echo 'File not found';
}
