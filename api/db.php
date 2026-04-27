<?php
/**
 * PDO database connection singleton
 * Use: require_once __DIR__ . '/api/db.php';
 */
declare(strict_types=1);

if (!defined('DB_LOADED')) {
    define('DB_LOADED', true);
}

$dbConfig = require dirname(__DIR__) . '/config/database.php';

$dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=%s',
    $dbConfig['host'],
    $dbConfig['dbname'],
    $dbConfig['charset']
);

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], $options);
} catch (PDOException $e) {
    if (php_sapi_name() === 'cli') {
        throw $e;
    }
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
