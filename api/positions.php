<?php
/**
 * API for saving and loading scenario button positions on the server.
 * GET: returns all saved positions (JSON object: scenario => array of {left, top}).
 * POST: body { "scenario": "hotels", "positions": [ { "left": 5, "top": 8 }, ... ] } — saves for that scenario.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataDir = dirname(__DIR__) . '/data';
$file = $dataDir . '/positions.json';

function sendJson($data) {
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

function readPositions($file) {
    if (!is_file($file)) {
        return [];
    }
    $raw = file_get_contents($file);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function writePositions($file, $dataDir, $data) {
    if (!is_dir($dataDir)) {
        if (!@mkdir($dataDir, 0755, true)) {
            return false;
        }
    }
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return @file_put_contents($file, $json) !== false;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $positions = readPositions($file);
    sendJson($positions);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $body = json_decode($input, true);

    if (!is_array($body) || empty($body['scenario']) || !isset($body['positions']) || !is_array($body['positions'])) {
        http_response_code(400);
        sendJson(['ok' => false, 'error' => 'Invalid body: need { "scenario": "...", "positions": [ ... ] }']);
        exit;
    }

    $scenario = preg_replace('/[^a-z0-9\-]/', '', strtolower((string) $body['scenario']));
    if ($scenario === '') {
        http_response_code(400);
        sendJson(['ok' => false, 'error' => 'Invalid scenario name']);
        exit;
    }

    $positions = [];
    foreach ($body['positions'] as $p) {
        $left = isset($p['left']) ? (float) $p['left'] : 0;
        $top = isset($p['top']) ? (float) $p['top'] : 0;
        $positions[] = ['left' => $left, 'top' => $top];
    }

    $all = readPositions($file);
    $all[$scenario] = $positions;

    if (!writePositions($file, $dataDir, $all)) {
        http_response_code(500);
        sendJson(['ok' => false, 'error' => 'Could not write positions file. Ensure the data/ directory is writable.']);
        exit;
    }

    sendJson(['ok' => true]);
    exit;
}

http_response_code(405);
sendJson(['ok' => false, 'error' => 'Method not allowed']);
