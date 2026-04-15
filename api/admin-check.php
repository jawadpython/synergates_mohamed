<?php
/**
 * Returns whether current user is admin (for solution-detail edit mode)
 */
header('Content-Type: application/json');
session_start();
echo json_encode(['admin' => !empty($_SESSION['admin_id'])]);
