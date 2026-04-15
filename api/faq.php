<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataDir = __DIR__ . '/../data';
$faqFile = $dataDir . '/faq.json';

if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

if (!file_exists($faqFile)) {
    $defaultFaq = [
        [
            'id' => 'faq_1',
            'question_fr' => 'Quels services propose Synergates ?',
            'question_en' => 'What services does Synergates offer?',
            'answer_fr' => 'Nous proposons des solutions technologiques complètes : CFA, vidéosurveillance, contrôle d\'accès, alarme intrusion, détection incendie, sonorisation, réseaux cuivre & fibre, téléphonie IP, télédistribution, affichage dynamique, domotique et support informatique.',
            'answer_en' => 'We offer complete technology solutions: CCTV, video surveillance, access control, intrusion alarm, fire detection, sound system, copper & fiber networks, IP telephony, cable distribution, digital signage, home automation and IT support.',
            'sort_order' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ],
        [
            'id' => 'faq_2',
            'question_fr' => 'Intervenez-vous uniquement au Maroc ?',
            'question_en' => 'Do you only operate in Morocco?',
            'answer_fr' => 'Nos projets sont basés au Maroc, mais nous intervenons également dans plusieurs pays d\'Afrique.',
            'answer_en' => 'Our projects are based in Morocco, but we also operate in several African countries.',
            'sort_order' => 2,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ],
        [
            'id' => 'faq_3',
            'question_fr' => 'Quelles normes respectez-vous ?',
            'question_en' => 'What standards do you comply with?',
            'answer_fr' => 'Nos solutions sont conformes aux normes internationales telles que ATEX, EN54, selon les secteurs et les projets.',
            'answer_en' => 'Our solutions comply with international standards such as ATEX, EN54, depending on sectors and projects.',
            'sort_order' => 3,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]
    ];
    file_put_contents($faqFile, json_encode($defaultFaq, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function getFaq() {
    global $faqFile;
    $content = file_get_contents($faqFile);
    $items = json_decode($content, true);
    return is_array($items) ? $items : [];
}

function saveFaq($items) {
    global $faqFile;
    usort($items, function($a, $b) {
        return ($a['sort_order'] ?? 999) - ($b['sort_order'] ?? 999);
    });
    file_put_contents($faqFile, json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method === 'GET') {
    $items = getFaq();

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $item = null;
        foreach ($items as $f) {
            if ($f['id'] === $id) {
                $item = $f;
                break;
            }
        }
        if ($item) {
            echo json_encode(['success' => true, 'faq' => $item]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'FAQ not found']);
        }
        exit;
    }

    echo json_encode(['success' => true, 'faqs' => $items]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        $input = $_POST;
    }

    if (empty($input['question_fr']) && empty($input['question_en'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'At least one question (FR or EN) is required']);
        exit;
    }

    $items = getFaq();
    $maxOrder = 0;
    foreach ($items as $i) {
        $o = $i['sort_order'] ?? 0;
        if ($o > $maxOrder) $maxOrder = $o;
    }

    $id = 'faq_' . uniqid();
    $item = [
        'id' => $id,
        'question_fr' => trim($input['question_fr'] ?? ''),
        'question_en' => trim($input['question_en'] ?? ''),
        'answer_fr' => trim($input['answer_fr'] ?? ''),
        'answer_en' => trim($input['answer_en'] ?? ''),
        'sort_order' => (int)($input['sort_order'] ?? $maxOrder + 1),
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ];

    $items[] = $item;
    saveFaq($items);

    echo json_encode(['success' => true, 'faq' => $item, 'message' => 'FAQ created successfully']);
    exit;
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'FAQ ID is required']);
        exit;
    }

    $items = getFaq();
    $found = false;

    foreach ($items as &$faq) {
        if ($faq['id'] === $input['id']) {
            if (isset($input['question_fr'])) $faq['question_fr'] = trim($input['question_fr']);
            if (isset($input['question_en'])) $faq['question_en'] = trim($input['question_en']);
            if (isset($input['answer_fr'])) $faq['answer_fr'] = trim($input['answer_fr']);
            if (isset($input['answer_en'])) $faq['answer_en'] = trim($input['answer_en']);
            if (isset($input['sort_order'])) $faq['sort_order'] = (int)$input['sort_order'];
            $faq['updated_at'] = date('Y-m-d H:i:s');
            $found = true;
            break;
        }
    }

    if (!$found) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'FAQ not found']);
        exit;
    }

    saveFaq($items);
    echo json_encode(['success' => true, 'message' => 'FAQ updated successfully']);
    exit;
}

if ($method === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'FAQ ID is required']);
        exit;
    }

    $items = getFaq();
    $initialCount = count($items);

    $items = array_filter($items, function($f) use ($input) {
        return $f['id'] !== $input['id'];
    });

    if (count($items) === $initialCount) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'FAQ not found']);
        exit;
    }

    $items = array_values($items);
    saveFaq($items);

    echo json_encode(['success' => true, 'message' => 'FAQ deleted successfully']);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
