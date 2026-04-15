<?php
$src = dirname(__DIR__) . '/clientdata.txt';
$out = dirname(__DIR__) . '/js/clientdata.js';
$raw = is_file($src) ? file_get_contents($src) : '';
$js = 'window.__CLIENT_DATA_RAW__=' . json_encode($raw) . ';';
file_put_contents($out, $js);
echo "Generated js/clientdata.js\n";
