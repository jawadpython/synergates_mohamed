<?php
/**
 * Legacy entry point — use admin/login.php
 */
declare(strict_types=1);

$q = !empty($_SERVER['QUERY_STRING']) ? '?' . $_SERVER['QUERY_STRING'] : '';
header('Location: admin/login.php' . $q);
exit;
