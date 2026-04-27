<?php
declare(strict_types=1);

require_once __DIR__ . '/require_auth.php';
require_once __DIR__ . '/../lib/admin_context.php';
admin_require_super();

require_once __DIR__ . '/../api/db.php';

$labels = admin_permission_labels();
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$errors = [];
$row = [
    'username' => '',
    'display_name' => '',
    'is_super_admin' => 0,
    'is_active' => 1,
    'permissions' => '{}',
];

if ($id > 0) {
    $stmt = $pdo->prepare('SELECT id, username, display_name, is_super_admin, is_active, permissions FROM admins WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $fetched = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$fetched) {
        header('Location: users.php');
        exit;
    }
    $row = array_merge($row, $fetched);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim((string) ($_POST['username'] ?? ''));
    $displayName = trim((string) ($_POST['display_name'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    $password2 = (string) ($_POST['password_confirm'] ?? '');
    $isSuper = !empty($_POST['is_super_admin']) ? 1 : 0;
    $isActive = !empty($_POST['is_active']) ? 1 : 0;
    $postId = isset($_POST['id']) ? (int) $_POST['id'] : 0;

    if ($postId !== $id) {
        $errors[] = 'Invalid form state.';
    }
    if ($username === '' || strlen($username) > 64 || !preg_match('/^[a-zA-Z0-9._-]+$/', $username)) {
        $errors[] = 'Username must be 1–64 characters (letters, numbers, dot, underscore, hyphen).';
    }
    if ($displayName !== '' && strlen($displayName) > 128) {
        $errors[] = 'Display name is too long.';
    }

    if ($id === 0 && strlen($password) < 8) {
        $errors[] = 'Password must be at least 8 characters for a new user.';
    }
    if ($id > 0 && $password !== '' && strlen($password) < 8) {
        $errors[] = 'Password must be at least 8 characters.';
    }
    if ($password !== $password2) {
        $errors[] = 'Password confirmation does not match.';
    }

    $permObj = [];
    if (!$isSuper) {
        foreach (array_keys($labels) as $key) {
            if (!empty($_POST['perm'][$key])) {
                $permObj[$key] = true;
            }
        }
        if (empty($permObj)) {
            $errors[] = 'Choose at least one permission, or mark the user as super administrator.';
        }
    }

    if ($id === (int) $_SESSION['admin_id'] && !$isSuper) {
        $errors[] = 'You cannot remove your own super administrator role.';
    }
    if ($id === (int) $_SESSION['admin_id'] && !$isActive) {
        $errors[] = 'You cannot disable your own account.';
    }

    if (!empty($row['is_super_admin']) && !$isSuper) {
        $cnt = (int) $pdo->query('SELECT COUNT(*) FROM admins WHERE is_super_admin = 1 AND is_active = 1')->fetchColumn();
        if ($cnt <= 1) {
            $errors[] = 'Cannot remove the last super administrator.';
        }
    }

    if (empty($errors)) {
        $stmt = $pdo->prepare('SELECT id FROM admins WHERE username = ? AND id != ? LIMIT 1');
        $stmt->execute([$username, $id]);
        if ($stmt->fetch()) {
            $errors[] = 'That username is already taken.';
        }
    }

    if (empty($errors)) {
        $permJson = $isSuper ? null : json_encode($permObj);
        try {
            if ($id === 0) {
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare(
                    'INSERT INTO admins (username, display_name, password_hash, is_super_admin, is_active, permissions) VALUES (?,?,?,?,?,?)'
                );
                $stmt->execute([$username, $displayName ?: null, $hash, $isSuper, $isActive, $permJson]);
            } else {
                if ($password !== '') {
                    $hash = password_hash($password, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare(
                        'UPDATE admins SET username = ?, display_name = ?, password_hash = ?, is_super_admin = ?, is_active = ?, permissions = ? WHERE id = ?'
                    );
                    $stmt->execute([$username, $displayName ?: null, $hash, $isSuper, $isActive, $permJson, $id]);
                } else {
                    $stmt = $pdo->prepare(
                        'UPDATE admins SET username = ?, display_name = ?, is_super_admin = ?, is_active = ?, permissions = ? WHERE id = ?'
                    );
                    $stmt->execute([$username, $displayName ?: null, $isSuper, $isActive, $permJson, $id]);
                }
            }
            header('Location: users.php?saved=1');
            exit;
        } catch (PDOException $e) {
            $errors[] = 'Could not save (check that the database migration has been applied).';
        }
    }

    $row['username'] = $username;
    $row['display_name'] = $displayName;
    $row['is_super_admin'] = $isSuper;
    $row['is_active'] = $isActive;
    if (!$isSuper) {
        $row['permissions'] = json_encode($permObj);
    }
}

$permDecoded = [];
if (!empty($row['permissions']) && is_string($row['permissions'])) {
    $permDecoded = json_decode($row['permissions'], true) ?: [];
} elseif (is_array($row['permissions'] ?? null)) {
    $permDecoded = $row['permissions'];
}

$adminNavActive = 'users';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $id ? 'Edit' : 'New' ?> user - Admin</title>
    <link rel="stylesheet" href="../css/tailwind-built.css?v=1.0.63">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <?php require __DIR__ . '/_nav.php'; ?>

    <div class="admin-page" style="max-width:42rem">
        <div class="admin-page-header">
            <div>
                <h1 class="admin-page-title"><?= $id ? 'Edit user' : 'New user' ?></h1>
                <p class="admin-page-subtitle"><a href="users.php" class="text-blue-600 hover:underline">← Back to list</a></p>
            </div>
        </div>

        <?php if (!empty($errors)): ?>
            <div class="admin-alert admin-alert-error mb-4">
                <?php foreach ($errors as $e): ?>
                    <div><?= htmlspecialchars($e, ENT_QUOTES, 'UTF-8') ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <form method="post" class="admin-card admin-card-body space-y-5">
            <input type="hidden" name="id" value="<?= (int) $id ?>">

            <div>
                <label class="admin-label">Username *</label>
                <input type="text" name="username" required class="admin-input" value="<?= htmlspecialchars($row['username'], ENT_QUOTES, 'UTF-8') ?>" autocomplete="username">
            </div>
            <div>
                <label class="admin-label">Display name</label>
                <input type="text" name="display_name" class="admin-input" value="<?= htmlspecialchars((string) ($row['display_name'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            </div>
            <div>
                <label class="admin-label"><?= $id ? 'New password (leave blank to keep)' : 'Password *' ?></label>
                <input type="password" name="password" class="admin-input" autocomplete="new-password" <?= $id ? '' : 'required' ?>>
            </div>
            <div>
                <label class="admin-label">Confirm password <?= $id ? '' : '*' ?></label>
                <input type="password" name="password_confirm" class="admin-input" autocomplete="new-password" <?= $id ? '' : 'required' ?>>
            </div>

            <div class="flex flex-wrap gap-6">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_super_admin" value="1" class="rounded border-slate-300" <?= !empty($row['is_super_admin']) ? 'checked' : '' ?>>
                    <span>Super administrator (full access + user management)</span>
                </label>
                <label class="inline-flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_active" value="1" class="rounded border-slate-300" <?= !empty($row['is_active']) ? 'checked' : '' ?>>
                    <span>Account active</span>
                </label>
            </div>

            <fieldset class="border border-slate-200 rounded-lg p-4 space-y-2" id="perm-fieldset">
                <legend class="text-sm font-semibold text-slate-700 px-1">Permissions</legend>
                <p class="text-xs text-slate-500 mb-2">Ignored for super administrators.</p>
                <?php foreach ($labels as $key => $label): ?>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="perm[<?= htmlspecialchars($key, ENT_QUOTES, 'UTF-8') ?>]" value="1" class="perm-cb rounded border-slate-300" <?= !empty($permDecoded[$key]) ? 'checked' : '' ?>>
                        <span><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></span>
                    </label>
                <?php endforeach; ?>
            </fieldset>

            <div class="flex gap-3">
                <button type="submit" class="admin-btn admin-btn-primary">Save</button>
                <a href="users.php" class="admin-btn admin-btn-secondary">Cancel</a>
            </div>
        </form>
    </div>

    <script>
    (function() {
        var superCb = document.querySelector('input[name="is_super_admin"]');
        var fs = document.getElementById('perm-fieldset');
        function sync() {
            var on = superCb && superCb.checked;
            fs.style.opacity = on ? '0.5' : '1';
            fs.querySelectorAll('.perm-cb').forEach(function(cb) {
                cb.disabled = on;
            });
        }
        if (superCb) {
            superCb.addEventListener('change', sync);
            sync();
        }
    })();
    </script>
</body>
</html>
