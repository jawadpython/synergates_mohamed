<?php
header('Content-Type: application/javascript; charset=utf-8');
$file = dirname(__DIR__) . '/clientdata.txt';
$raw = is_file($file) ? file_get_contents($file) : '';
echo 'window.__CLIENT_DATA_RAW__=' . json_encode($raw) . ';';
