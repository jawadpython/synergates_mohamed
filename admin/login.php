<?php
/**
 * Admin login - password_hash + sessions
 */
declare(strict_types=1);

require_once __DIR__ . '/../lib/admin_context.php';

admin_start_session();

if (!empty($_SESSION['admin_id'])) {
    require_once __DIR__ . '/../api/db.php';
    admin_load_context($pdo);
    header('Location: ' . (admin_first_allowed_path() ?? 'no-access.php'));
    exit;
}

$error = '';
$redirect = $_GET['redirect'] ?? 'dashboard.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $redirect = $_POST['redirect'] ?? $redirect;
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Please enter username and password.';
    } else {
        require_once __DIR__ . '/../api/db.php';

        $admin = null;
        try {
            $stmt = $pdo->prepare(
                'SELECT id, username, password_hash, is_super_admin, is_active, permissions FROM admins WHERE username = ? LIMIT 1'
            );
            $stmt->execute([$username]);
            $admin = $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1');
            $stmt->execute([$username]);
            $admin = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($admin) {
                $admin['is_super_admin'] = 1;
                $admin['is_active'] = 1;
                $admin['permissions'] = null;
            }
        }

        if ($admin && password_verify($password, $admin['password_hash'])) {
            if (empty($admin['is_active'])) {
                $error = 'This account is disabled.';
            } else {
                session_regenerate_id(true);
                $_SESSION['admin_id'] = (int) $admin['id'];
                $_SESSION['admin_username'] = (string) $admin['username'];
                $_SESSION['admin_super'] = !empty($admin['is_super_admin']);
                $p = $admin['permissions'] ?? null;
                if (is_string($p) && $p !== '') {
                    $dec = json_decode($p, true);
                    $_SESSION['admin_perms'] = is_array($dec) ? $dec : [];
                } else {
                    $_SESSION['admin_perms'] = [];
                }
                $safeRedirect = is_string($redirect) ? $redirect : 'dashboard.php';
                if ($safeRedirect === '' || strpos($safeRedirect, "\n") !== false || strpos($safeRedirect, '//') !== false
                    || !preg_match('/^[a-z0-9_-]+\\.php([?][a-z0-9_&=%.+\\/-]*)?$/i', $safeRedirect)) {
                    $safeRedirect = admin_first_allowed_path() ?? 'no-access.php';
                }
                header('Location: ' . $safeRedirect);
                exit;
            }
        } else {
            $error = 'Invalid username or password.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="../css/tailwind-built.css?v=1.0.63">
    <link rel="stylesheet" href="css/admin.css">
</head>
<body class="admin-login-wrap">
    <div class="admin-login-card">
        <h1 class="admin-login-title">Admin Login</h1>

        <?php if ($error): ?>
            <div class="admin-alert admin-alert-error">
                <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
            </div>
        <?php endif; ?>

        <form method="post" action="login.php">
            <input type="hidden" name="redirect" value="<?= htmlspecialchars($redirect, ENT_QUOTES, 'UTF-8') ?>">
            <div class="mb-4">
                <label for="username" class="admin-label">Username</label>
                <input type="text" id="username" name="username" required autofocus
                    class="admin-input"
                    value="<?= htmlspecialchars($_POST['username'] ?? '', ENT_QUOTES, 'UTF-8') ?>">
            </div>
            <div class="mb-6">
                <label for="password" class="admin-label">Password</label>
                <input type="password" id="password" name="password" required class="admin-input">
            </div>
            <button type="submit" class="admin-login-btn">Sign In</button>
        </form>
    </div>
</body>
</html>
