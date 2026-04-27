<?php
/**
 * Contact Form Handler
 * Sends submissions to info@synergates.ma
 * Works on cPanel/standard hosting where mail() is configured
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$company = trim($input['company'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Nom, email et message sont requis']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Adresse email invalide']);
    exit;
}

$subjectLabels = [
    'consultation' => 'Consultation gratuite',
    'enterprise' => 'Solutions entreprise',
    'surveillance' => 'Vidéosurveillance',
    'access' => 'Contrôle d\'accès',
    'smart-building' => 'Smart Building',
    'alarm' => 'Alarme intrusion',
    'network' => 'Infrastructure réseau',
    'parking' => 'Gestion parking',
    'support' => 'Support technique',
    'other' => 'Autre'
];
$subjectLabel = $subjectLabels[$subject] ?? ($subject ?: 'Contact');

// Recipient email
$to = 'info@synergates.ma';

// Email subject
$emailSubject = "=?UTF-8?B?" . base64_encode("Nouveau message: $subjectLabel - $name") . "?=";

// Build email body
$body = "Nouveau message depuis le site SYNERGATES\n";
$body .= "==========================================\n\n";
$body .= "Nom: $name\n";
$body .= "Email: $email\n";
$body .= "Téléphone: " . ($phone ?: 'Non fourni') . "\n";
$body .= "Entreprise: " . ($company ?: 'Non fourni') . "\n";
$body .= "Sujet: $subjectLabel\n\n";
$body .= "Message:\n";
$body .= "----------------------------------------\n";
$body .= "$message\n";
$body .= "----------------------------------------\n\n";
$body .= "Date: " . date('d/m/Y H:i:s') . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Inconnu') . "\n";

// Email headers for cPanel
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: SYNERGATES <noreply@synergates.ma>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "X-Priority: 1";

$headerString = implode("\r\n", $headers);

// Send email
$sent = mail($to, $emailSubject, $body, $headerString);

// Also save locally as backup
$dataDir = dirname(__DIR__) . '/data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$submissionsFile = $dataDir . '/contact-submissions.json';
$submissions = [];
if (file_exists($submissionsFile)) {
    $submissions = json_decode(file_get_contents($submissionsFile), true) ?: [];
}

$newSubmission = [
    'id' => uniqid('msg_'),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'company' => $company,
    'subject' => $subject,
    'subjectLabel' => $subjectLabel,
    'message' => $message,
    'date' => date('Y-m-d H:i:s'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'read' => false,
    'emailSent' => $sent
];

array_unshift($submissions, $newSubmission);
@file_put_contents($submissionsFile, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Response
if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Message envoyé avec succès. Nous vous contacterons rapidement.'
    ]);
} else {
    // Still save succeeded, just email failed
    echo json_encode([
        'success' => true,
        'message' => 'Message reçu. Nous vous contacterons rapidement.'
    ]);
}
