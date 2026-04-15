<?php
/**
 * Projects API – parses clientdata.txt and returns structured project data as JSON.
 * Each project has: client, date, status, locations, services, imagePath (admin-editable).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache');

$baseDir = dirname(__DIR__);
require_once $baseDir . '/config/projects-parser.php';

$projects = parse_projects_from_clientdata($baseDir);
foreach ($projects as $i => &$p) {
    $p['imagePath'] = 'images/projects/' . $i . '.jpg';
    $p['imageSlotId'] = 'project-' . $i;
}
unset($p);

echo json_encode(['projects' => $projects]);
