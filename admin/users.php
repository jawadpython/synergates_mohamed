<?php
declare(strict_types=1);

require_once __DIR__ . '/require_auth.php';
require_once __DIR__ . '/../lib/admin_context.php';
admin_require_super();

require_once __DIR__ . '/../api/db.php';

$flash = '';
$flashError = '';
if (!empty($_GET['deleted'])) {
    $flash = 'User removed.';
}
if (!empty($_GET['saved'])) {
    $flash = 'User saved.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_id'])) {
    $delId = (int) $_POST['delete_id'];
    $err = '';
    if ($delId <= 0) {
        $err = 'Invalid user.';
    } elseif ($delId === (int) $_SESSION['admin_id']) {
        $err = 'You cannot delete your own account.';
    } else {
        try {
            $stmt = $pdo->prepare('SELECT is_super_admin FROM admins WHERE id = ?');
            $stmt->execute([$delId]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row && !empty($row['is_super_admin'])) {
                $cnt = (int) $pdo->query('SELECT COUNT(*) FROM admins WHERE is_super_admin = 1 AND is_active = 1')->fetchColumn();
                if ($cnt <= 1) {
                    $err = 'Cannot delete the last super administrator.';
                }
            }
            if ($err === '') {
                $pdo->prepare('DELETE FROM admins WHERE id = ?')->execute([$delId]);
                header('Location: users.php?deleted=1');
                exit;
            }
        } catch (PDOException $e) {
            $err = 'Database error.';
        }
    }
    if ($err !== '') {
        header('Location: users.php?err=' . rawurlencode($err));
        exit;
    }
}

if (!empty($_GET['err'])) {
    $flashError = (string) $_GET['err'];
}

try {
    $stmt = $pdo->query('SELECT id, username, display_name, is_super_admin, is_active, created_at FROM admins ORDER BY id ASC');
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $users = [];
    $flash = $flash ?: 'Run the database migration: api/migrations/002_admin_users_permissions.sql';
}

$adminNavActive = 'users';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users - Admin</title>
    <link rel="stylesheet" href="../css/tailwind-built.css?v=1.0.63">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <?php require __DIR__ . '/_nav.php'; ?>

    <div class="admin-page">
        <div class="admin-page-header">
            <div>
                <h1 class="admin-page-title">Admin users</h1>
                <p class="admin-page-subtitle">Create accounts and control what each user can access</p>
            </div>
            <a href="user-edit.php" class="admin-btn admin-btn-primary"><i class="fas fa-plus"></i> New user</a>
        </div>

        <?php if ($flash !== ''): ?>
            <div class="admin-alert admin-alert-success mb-4"><?= htmlspecialchars($flash, ENT_QUOTES, 'UTF-8') ?></div>
        <?php endif; ?>
        <?php if ($flashError !== ''): ?>
            <div class="admin-alert admin-alert-error mb-4"><?= htmlspecialchars($flashError, ENT_QUOTES, 'UTF-8') ?></div>
        <?php endif; ?>

        <div class="admin-card">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Display name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $u): ?>
                        <tr>
                            <td><strong><?= htmlspecialchars($u['username'], ENT_QUOTES, 'UTF-8') ?></strong></td>
                            <td><?= htmlspecialchars((string) ($u['display_name'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
                            <td><?= !empty($u['is_super_admin']) ? 'Super admin' : 'Restricted' ?></td>
                            <td><?= !empty($u['is_active']) ? 'Active' : 'Disabled' ?></td>
                            <td><?= htmlspecialchars((string) ($u['created_at'] ?? ''), ENT_QUOTES, 'UTF-8') ?></td>
                            <td class="text-right whitespace-nowrap">
                                <a href="user-edit.php?id=<?= (int) $u['id'] ?>" class="admin-action" title="Edit"><i class="fas fa-edit"></i></a>
                                <?php if ((int) $u['id'] !== (int) $_SESSION['admin_id']): ?>
                                    <form method="post" class="inline" onsubmit="return confirm('Delete this user permanently?');">
                                        <input type="hidden" name="delete_id" value="<?= (int) $u['id'] ?>">
                                        <button type="submit" class="admin-action danger" title="Delete"><i class="fas fa-trash"></i></button>
                                    </form>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    <?php if (empty($users)): ?>
                        <tr><td colspan="6" class="text-center text-slate-500 py-8">No users found.</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
