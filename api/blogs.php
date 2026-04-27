<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$dataDir = __DIR__ . '/../data';
$blogsFile = $dataDir . '/blogs.json';

if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

if (!file_exists($blogsFile)) {
    file_put_contents($blogsFile, json_encode([]));
}

function getBlogs() {
    global $blogsFile;
    $content = file_get_contents($blogsFile);
    return json_decode($content, true) ?: [];
}

function saveBlogs($blogs) {
    global $blogsFile;
    file_put_contents($blogsFile, json_encode($blogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function generateSlug($title) {
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method === 'GET') {
    $blogs = getBlogs();
    
    if (isset($_GET['slug'])) {
        $slug = $_GET['slug'];
        $blog = null;
        foreach ($blogs as $b) {
            if ($b['slug'] === $slug && $b['status'] === 'published') {
                $blog = $b;
                break;
            }
        }
        if ($blog) {
            echo json_encode(['success' => true, 'blog' => $blog]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Blog not found']);
        }
        exit;
    }
    
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $blog = null;
        foreach ($blogs as $b) {
            if ($b['id'] === $id) {
                $blog = $b;
                break;
            }
        }
        if ($blog) {
            echo json_encode(['success' => true, 'blog' => $blog]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Blog not found']);
        }
        exit;
    }
    
    $publicOnly = isset($_GET['public']) && $_GET['public'] === 'true';
    if ($publicOnly) {
        $blogs = array_filter($blogs, function($b) {
            return $b['status'] === 'published';
        });
        $blogs = array_values($blogs);
    }
    
    usort($blogs, function($a, $b) {
        return strtotime($b['created_at']) - strtotime($a['created_at']);
    });
    
    echo json_encode(['success' => true, 'blogs' => $blogs]);
    exit;
}

if (in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
    require_once __DIR__ . '/../lib/admin_context.php';
    admin_api_guard('blogs');
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        $input = $_POST;
    }

    $titleFr = trim($input['title_fr'] ?? '');
    $titleEn = trim($input['title_en'] ?? '');
    $contentFr = $input['content_fr'] ?? '';
    $contentEn = $input['content_en'] ?? '';
    $titleLegacy = trim($input['title'] ?? '');
    $contentLegacy = $input['content'] ?? '';

    $hasTitle = $titleFr || $titleEn || $titleLegacy;
    $hasContent = ($contentFr && trim(strip_tags($contentFr))) || ($contentEn && trim(strip_tags($contentEn))) || ($contentLegacy && trim(strip_tags($contentLegacy)));

    if (!$hasTitle || !$hasContent) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'At least one title and one content (FR or EN) are required']);
        exit;
    }

    $blogs = getBlogs();
    $slugSource = $titleFr ?: $titleEn ?: $titleLegacy;
    $slug = generateSlug($slugSource);

    $existingSlugs = array_column($blogs, 'slug');
    $originalSlug = $slug;
    $counter = 1;
    while (in_array($slug, $existingSlugs)) {
        $slug = $originalSlug . '-' . $counter;
        $counter++;
    }

    $blog = [
        'id' => 'blog_' . uniqid(),
        'slug' => $slug,
        'title_fr' => $titleFr,
        'title_en' => $titleEn,
        'excerpt_fr' => trim($input['excerpt_fr'] ?? ''),
        'excerpt_en' => trim($input['excerpt_en'] ?? ''),
        'content_fr' => $contentFr,
        'content_en' => $contentEn,
        'title' => $titleFr ?: $titleEn ?: $titleLegacy,
        'excerpt' => trim($input['excerpt_fr'] ?? $input['excerpt_en'] ?? $input['excerpt'] ?? ''),
        'content' => $contentFr ?: $contentEn ?: $contentLegacy,
        'author' => trim($input['author'] ?? 'Admin'),
        'category' => trim($input['category'] ?? 'General'),
        'image' => trim($input['image'] ?? ''),
        'status' => $input['status'] ?? 'draft',
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ];

    array_unshift($blogs, $blog);
    saveBlogs($blogs);

    echo json_encode(['success' => true, 'blog' => $blog, 'message' => 'Blog created successfully']);
    exit;
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (empty($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Blog ID is required']);
        exit;
    }

    $blogs = getBlogs();
    $found = false;

    foreach ($blogs as &$blog) {
        if ($blog['id'] === $input['id']) {
            if (isset($input['title_fr'])) $blog['title_fr'] = trim($input['title_fr']);
            if (isset($input['title_en'])) $blog['title_en'] = trim($input['title_en']);
            if (isset($input['excerpt_fr'])) $blog['excerpt_fr'] = trim($input['excerpt_fr']);
            if (isset($input['excerpt_en'])) $blog['excerpt_en'] = trim($input['excerpt_en']);
            if (isset($input['content_fr'])) $blog['content_fr'] = $input['content_fr'];
            if (isset($input['content_en'])) $blog['content_en'] = $input['content_en'];
            if (!empty($input['title']) && !isset($input['title_fr'])) $blog['title'] = trim($input['title']);
            if (isset($input['excerpt']) && !isset($input['excerpt_fr'])) $blog['excerpt'] = trim($input['excerpt']);
            if (!empty($input['content']) && !isset($input['content_fr'])) $blog['content'] = $input['content'];
            if (!empty($input['author'])) $blog['author'] = trim($input['author']);
            if (!empty($input['category'])) $blog['category'] = trim($input['category']);
            if (isset($input['image'])) $blog['image'] = trim($input['image']);
            if (!empty($input['status'])) $blog['status'] = $input['status'];
            $blog['title'] = ($blog['title_fr'] ?? '') ?: ($blog['title_en'] ?? '') ?: ($blog['title'] ?? '');
            $blog['excerpt'] = ($blog['excerpt_fr'] ?? '') ?: ($blog['excerpt_en'] ?? '') ?: ($blog['excerpt'] ?? '');
            $blog['content'] = ($blog['content_fr'] ?? '') ?: ($blog['content_en'] ?? '') ?: ($blog['content'] ?? '');
            $blog['updated_at'] = date('Y-m-d H:i:s');
            $found = true;
            break;
        }
    }

    if (!$found) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Blog not found']);
        exit;
    }

    saveBlogs($blogs);
    echo json_encode(['success' => true, 'message' => 'Blog updated successfully']);
    exit;
}

if ($method === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Blog ID is required']);
        exit;
    }
    
    $blogs = getBlogs();
    $initialCount = count($blogs);
    
    $blogs = array_filter($blogs, function($b) use ($input) {
        return $b['id'] !== $input['id'];
    });
    
    if (count($blogs) === $initialCount) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Blog not found']);
        exit;
    }
    
    $blogs = array_values($blogs);
    saveBlogs($blogs);
    
    echo json_encode(['success' => true, 'message' => 'Blog deleted successfully']);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
