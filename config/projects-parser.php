<?php
/**
 * Parses clientdata.txt into structured projects array.
 * Used by api/projects.php and config/image-slots.php.
 */
function parse_projects_from_clientdata(string $baseDir): array {
    $file = $baseDir . '/clientdata.txt';
    if (!is_file($file)) {
        return [];
    }
    $raw = file_get_contents($file);
    $blocks = preg_split('/\s*---\s*/', trim($raw), -1, PREG_SPLIT_NO_EMPTY);
    $projects = [];
    foreach ($blocks as $block) {
        $block = trim($block);
        if (empty($block) || stripos($block, 'CLIENT REFERENCES DATA') !== false || stripos($block, 'Source:') === 0) {
            continue;
        }
        $client = '';
        $date = '';
        $status = '';
        $locations = [];
        $services = [];
        $inLocations = false;
        $inServices = false;
        $lines = explode("\n", $block);
        foreach ($lines as $line) {
            $line = trim($line);
            if (preg_match('/^CLIENT:\s*(.+)$/i', $line, $m)) {
                $client = trim($m[1]);
                $inLocations = false;
                $inServices = false;
                continue;
            }
            if (preg_match('/^Project Date:\s*(.+)$/i', $line, $m)) {
                $date = trim($m[1]);
                $inLocations = false;
                $inServices = false;
                continue;
            }
            if (preg_match('/^Project Status:\s*(.+)$/i', $line, $m)) {
                $status = trim($m[1]);
                $inLocations = false;
                $inServices = false;
                continue;
            }
            if (preg_match('/^Locations?:$/i', $line)) {
                $inLocations = true;
                $inServices = false;
                continue;
            }
            if (preg_match('/^Services Provided:$/i', $line)) {
                $inServices = true;
                $inLocations = false;
                continue;
            }
            if ($line === '') continue;
            if (preg_match('/^\*\s+(.+)$/', $line, $m)) {
                $item = trim($m[1]);
                if ($inLocations) $locations[] = $item;
                elseif ($inServices) $services[] = $item;
            } else {
                $inLocations = false;
                $inServices = false;
            }
        }
        if ($client !== '') {
            $projects[] = [
                'client' => $client,
                'date' => $date,
                'status' => $status,
                'locations' => $locations,
                'services' => $services,
            ];
        }
    }
    return $projects;
}
