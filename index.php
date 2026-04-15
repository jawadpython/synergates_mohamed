<?php
/**
 * Public homepage: serve index.html so "/" is not redirected to the admin dashboard.
 */
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');
readfile(__DIR__ . '/index.html');
