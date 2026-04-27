<?php
/**
 * Images API - list, upload to folder, rename, delete (admin only)
 * GET ?folder=images/solution-detail/apartments - list images
 * POST folder, image - upload to folder
 * PATCH path, newName - rename
 * DELETE path - delete
 */
declare(strict_types=1);

// PHP 7 polyfill for str_starts_with (PHP 8.0+)
if (!function_exists('str_starts_with')) {
    function str_starts_with(string $haystack, string $needle): bool {
        return $needle === '' || strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../lib/admin_context.php';
admin_api_guard('images');

$baseDir = dirname(__DIR__);
$imagesRoot = $baseDir . '/images';

function resolvePath(string $base, string $path): ?string {
    $path = str_replace(['\\', '..'], ['/', ''], $path);
    $path = trim($path, '/');
    if ($path === '' || strpos($path, '..') !== false) return null;
    $full = rtrim($base, '/\\') . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $path);
    $realBase = realpath($base);
    if (!$realBase) return null;
    $canonical = realpath($full);
    if ($canonical) {
        return str_starts_with($canonical, $realBase) ? $canonical : null;
    }
    $parent = dirname($full);
    $realParent = realpath($parent);
    return ($realParent && str_starts_with($realParent, $realBase)) ? $full : null;
}

function listImages(string $dir): array {
    $files = [];
    if (!is_dir($dir)) return $files;
    foreach (scandir($dir) as $f) {
        if ($f === '.' || $f === '..') continue;
        $path = $dir . '/' . $f;
        if (is_file($path)) {
            $ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'], true)) {
                $files[] = ['name' => $f, 'size' => filesize($path), 'mtime' => filemtime($path)];
            }
        }
    }
    usort($files, fn($a, $b) => strcasecmp($a['name'], $b['name']));
    return $files;
}

function listFolders(string $dir, string $prefix = ''): array {
    $folders = [];
    if (!is_dir($dir)) return $folders;
    foreach (scandir($dir) as $f) {
        if ($f === '.' || $f === '..') continue;
        $path = $dir . '/' . $f;
        if (is_dir($path)) {
            $rel = ($prefix ? $prefix . '/' : '') . $f;
            $folders[] = $rel;
            $folders = array_merge($folders, listFolders($path, $rel));
        }
    }
    sort($folders);
    return $folders;
}

// GET - list images in folder, list folders, or list image slots (place-based management)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? 'list';

    if ($action === 'slots') {
        $slotsConfig = @include $baseDir . '/config/image-slots.php';
        if (!is_array($slotsConfig)) {
            echo json_encode(['groups' => []]);
            exit;
        }
        $groups = [];
        foreach ($slotsConfig as $group) {
            $groupSlots = [];
            foreach ($group['slots'] ?? [] as $slot) {
                $slotPath = $baseDir . '/' . ($slot['path'] ?? '');
                $exists = is_file($slotPath);
                $groupSlots[] = [
                    'id' => $slot['id'] ?? '',
                    'label' => $slot['label'] ?? '',
                    'location' => $slot['location'] ?? '',
                    'path' => $slot['path'] ?? '',
                    'page' => $slot['page'] ?? '',
                    'exists' => $exists,
                    'mtime' => $exists ? filemtime($slotPath) : null,
                ];
            }
            $groups[] = ['group' => $group['group'] ?? '', 'slots' => $groupSlots];
        }
        echo json_encode(['groups' => $groups]);
        exit;
    }

    if ($action === 'slot' && !empty($_GET['id'])) {
        $slotId = trim($_GET['id']);
        $slotsConfig = @include $baseDir . '/config/image-slots.php';
        if (!is_array($slotsConfig)) {
            http_response_code(404);
            echo json_encode(['error' => 'Slot not found']);
            exit;
        }
        foreach ($slotsConfig as $group) {
            foreach ($group['slots'] ?? [] as $slot) {
                if (($slot['id'] ?? '') === $slotId) {
                    $slotPath = $baseDir . '/' . ($slot['path'] ?? '');
                    $exists = is_file($slotPath);
                    echo json_encode([
                        'id' => $slot['id'],
                        'label' => $slot['label'] ?? '',
                        'path' => $slot['path'] ?? '',
                        'page' => $slot['page'] ?? '',
                        'exists' => $exists,
                        'mtime' => $exists ? filemtime($slotPath) : null,
                    ]);
                    exit;
                }
            }
        }
        http_response_code(404);
        echo json_encode(['error' => 'Slot not found']);
        exit;
    }

    if ($action === 'usage' && !empty($_GET['path'])) {
        $imgPath = trim($_GET['path']);
        if (!str_starts_with($imgPath, 'images/')) {
            echo json_encode(['usedIn' => []]);
            exit;
        }
        $usedIn = [];
        $htmlFiles = glob($baseDir . '/*.html');
        $jsFiles = glob($baseDir . '/js/*.js');
        foreach (array_merge($htmlFiles ?: [], $jsFiles ?: []) as $f) {
            $content = @file_get_contents($f);
            if ($content && (strpos($content, $imgPath) !== false || strpos($content, str_replace('/', '%20', $imgPath)) !== false)) {
                $usedIn[] = basename($f);
            }
        }
        echo json_encode(['path' => $imgPath, 'usedIn' => array_unique($usedIn)]);
        exit;
    }
    if ($action === 'folders') {
        $folders = ['images'];
        foreach (listFolders($imagesRoot) as $f) {
            $folders[] = 'images/' . $f;
        }
        echo json_encode(['folders' => $folders]);
        exit;
    }

    $folder = trim($_GET['folder'] ?? 'images');
    $folder = preg_replace('#^/+#', '', $folder);
    if (!str_starts_with($folder, 'images')) $folder = 'images/' . ltrim($folder, '/');
    $targetDir = resolvePath($baseDir, $folder);
    $realImages = realpath($imagesRoot);
    if (!$targetDir || !$realImages) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid folder']);
        exit;
    }
    $realTarget = realpath($targetDir);
    if ($realTarget && !str_starts_with(str_replace('\\', '/', $realTarget), str_replace('\\', '/', $realImages))) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid folder']);
        exit;
    }
    if (!$realTarget && !is_dir($targetDir)) {
        $normTarget = str_replace('\\', '/', $targetDir);
        $normImages = str_replace('\\', '/', $realImages);
        if (strpos($normTarget, $normImages) !== 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid folder']);
            exit;
        }
        echo json_encode(['folder' => $folder, 'images' => []]);
        exit;
    }

    $images = listImages($targetDir);
    $relFolder = str_replace('\\', '/', substr(realpath($targetDir) ?: $targetDir, strlen($baseDir) + 1));
    if (!str_starts_with($relFolder, 'images')) $relFolder = $folder;
    echo json_encode(['folder' => $relFolder, 'images' => $images]);
    exit;
}

// POST - upload (supports replace=path, or slot=id for place-based upload)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $replacePath = trim($_POST['replace'] ?? '');
    $slotId = trim($_POST['slot'] ?? '');
    if ($slotId && !$replacePath) {
        $slotsConfig = @include $baseDir . '/config/image-slots.php';
        if (is_array($slotsConfig)) {
            foreach ($slotsConfig as $group) {
                foreach ($group['slots'] ?? [] as $slot) {
                    if (($slot['id'] ?? '') === $slotId) {
                        $replacePath = $slot['path'] ?? '';
                        break 2;
                    }
                }
            }
        }
    }
    $folder = trim($_POST['folder'] ?? ($replacePath ? preg_replace('#/[^/]+$#', '', $replacePath) : 'images'));
    $folder = preg_replace('#^/+#', '', $folder);
    if (!str_starts_with($folder, 'images')) $folder = 'images/' . ltrim($folder, '/');

    $targetDir = resolvePath($baseDir, $folder);
    $realImages = realpath($imagesRoot);
    if (!$realImages) {
        http_response_code(500);
        echo json_encode(['error' => 'Images folder not found']);
        exit;
    }
    if (!$targetDir) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid folder']);
        exit;
    }
    $realTarget = realpath($targetDir);
    if (!$realTarget && !is_dir($targetDir)) {
        $parent = dirname($targetDir);
        if (!realpath($parent) || !str_starts_with(str_replace('\\', '/', realpath($parent)), str_replace('\\', '/', $realImages))) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid folder']);
            exit;
        }
    } elseif ($realTarget && !str_starts_with(str_replace('\\', '/', $realTarget), str_replace('\\', '/', $realImages))) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid folder']);
        exit;
    }

    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    $allowedTypes = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp', 'image/svg+xml' => 'svg'];
    $maxSize = 10 * 1024 * 1024; // 10 MB

    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        $code = $_FILES['image']['error'] ?? -1;
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'File exceeds server limit',
            UPLOAD_ERR_FORM_SIZE => 'File too large',
            UPLOAD_ERR_PARTIAL => 'Upload incomplete',
            UPLOAD_ERR_NO_FILE => 'No file selected',
            UPLOAD_ERR_NO_TMP_DIR => 'Server temp folder missing',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file',
            UPLOAD_ERR_EXTENSION => 'Upload blocked by extension',
        ];
        http_response_code(400);
        echo json_encode(['error' => $errors[$code] ?? 'Upload failed']);
        exit;
    }

    $file = $_FILES['image'];
    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large (max 10MB)']);
        exit;
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    if (!isset($allowedTypes[$mime])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG']);
        exit;
    }

    $ext = $allowedTypes[$mime];
    if ($replacePath && preg_match('#^images/[a-zA-Z0-9/_.-]+\.(jpg|jpeg|png|gif|webp|svg)$#i', $replacePath)) {
        $targetFile = resolvePath($baseDir, $replacePath);
        if ($targetFile) {
            $canon = realpath($targetFile) ?: $targetFile;
            $normImages = str_replace('\\', '/', $realImages);
            if (str_starts_with(str_replace('\\', '/', $canon), $normImages) ||
                str_starts_with(str_replace('\\', '/', $targetFile), $normImages)) {
                $path = $targetFile;
                $name = basename($replacePath);
            } else {
                $path = $targetDir . '/' . basename($replacePath);
                $name = basename($replacePath);
            }
        } else {
            $path = $targetDir . '/' . basename($replacePath);
            $name = basename($replacePath);
        }
    } else {
        $name = preg_replace('/[^a-zA-Z0-9._-]/', '', pathinfo($file['name'], PATHINFO_FILENAME)) ?: 'image';
        $name = $name . '.' . $ext;
        $path = $targetDir . '/' . $name;
        $i = 1;
        while (file_exists($path)) {
            $name = pathinfo($file['name'], PATHINFO_FILENAME) . '-' . $i . '.' . $ext;
            $path = $targetDir . '/' . $name;
            $i++;
        }
    }

    if (!move_uploaded_file($file['tmp_name'], $path)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save file']);
        exit;
    }

    // Bump image version for cache busting when replacing (so visitors see new image immediately)
    if (!empty($replacePath)) {
        $versionFile = $baseDir . '/js/image-version.js';
        $ts = (string) time();
        if (file_put_contents($versionFile, "window.IMAGE_VERSION = \"" . $ts . "\";\n") === false) {
            // Non-fatal: version bump failed but upload succeeded
        }
    }

    $relPath = str_replace('\\', '/', substr(realpath($path) ?: $path, strlen($baseDir) + 1));
    echo json_encode(['success' => true, 'path' => $relPath, 'name' => $name, 'replaced' => !empty($replacePath)]);
    exit;
}

// DELETE (supports path or slot=id)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
    $path = trim($input['path'] ?? '');
    $slotId = trim($input['slot'] ?? '');
    if ($slotId && !$path) {
        $slotsConfig = @include $baseDir . '/config/image-slots.php';
        if (is_array($slotsConfig)) {
            foreach ($slotsConfig as $group) {
                foreach ($group['slots'] ?? [] as $slot) {
                    if (($slot['id'] ?? '') === $slotId) {
                        $path = $slot['path'] ?? '';
                        break 2;
                    }
                }
            }
        }
    }
    $path = preg_replace('#^/+#', '', $path);
    if (!str_starts_with($path, 'images/')) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid path']);
        exit;
    }

    $target = resolvePath($baseDir, $path);
    if (!$target || !is_file($target) || !str_starts_with(realpath($target), realpath($imagesRoot))) {
        http_response_code(400);
        echo json_encode(['error' => 'File not found or invalid']);
        exit;
    }

    if (!unlink($target)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete']);
        exit;
    }
    echo json_encode(['success' => true]);
    exit;
}

// PATCH - rename
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $input = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
    $path = trim($input['path'] ?? '');
    $newName = trim($input['newName'] ?? '');
    $path = preg_replace('#^/+#', '', $path);
    if (!str_starts_with($path, 'images/')) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid path']);
        exit;
    }

    $newName = preg_replace('/[^a-zA-Z0-9._-]/', '', $newName);
    if ($newName === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid new name']);
        exit;
    }
    if (!preg_match('/\.(jpg|jpeg|png|gif|webp|svg)$/i', $newName)) {
        $ext = pathinfo($path, PATHINFO_EXTENSION);
        $newName = $newName . '.' . ($ext ?: 'jpg');
    }

    $target = resolvePath($baseDir, $path);
    if (!$target || !is_file($target) || !str_starts_with(realpath($target), realpath($imagesRoot))) {
        http_response_code(400);
        echo json_encode(['error' => 'File not found or invalid']);
        exit;
    }

    $dir = dirname($target);
    $newPath = $dir . '/' . $newName;
    if (file_exists($newPath)) {
        http_response_code(400);
        echo json_encode(['error' => 'A file with that name already exists']);
        exit;
    }

    if (!rename($target, $newPath)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to rename']);
        exit;
    }

    $relPath = str_replace('\\', '/', substr($newPath, strlen($baseDir) + 1));
    echo json_encode(['success' => true, 'path' => $relPath, 'name' => $newName]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
