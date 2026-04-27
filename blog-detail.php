<?php
declare(strict_types=1);
/* Canonical public article view is blog-detail.html + data/blogs.json (works when PHP is not executed). */
$slug = isset($_GET['slug']) ? (string) $_GET['slug'] : '';
$query = $slug !== '' ? ('?slug=' . rawurlencode($slug)) : '';
header('Location: blog-detail.html' . $query, true, 302);
exit;
