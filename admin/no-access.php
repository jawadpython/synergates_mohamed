<?php
/**
 * Fallback when the account has no module with a UI (e.g. only “pages” / API rights).
 */
declare(strict_types=1);

require_once __DIR__ . '/require_auth.php';
require_once __DIR__ . '/../lib/admin_context.php';

if (admin_is_super()) {
    header('Location: dashboard.php');
    exit;
}

if (admin_can('images')) {
    header('Location: dashboard.php');
    exit;
}
if (admin_can('blogs')) {
    header('Location: blogs.php');
    exit;
}
if (admin_can('faqs')) {
    header('Location: faqs.php');
    exit;
}
if (admin_can('messages')) {
    header('Location: messages.php');
    exit;
}

$adminNavActive = '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Limited access - Admin</title>
    <link rel="stylesheet" href="../css/tailwind-built.css?v=1.0.63">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <?php require __DIR__ . '/_nav.php'; ?>
    <main class="admin-page" style="max-width:40rem">
        <div class="admin-card admin-card-body">
            <h1 class="admin-page-title">Limited access</h1>
            <p class="text-slate-600 mt-2">
                <?php if (admin_can('pages')): ?>
                    You can use the editable-pages API, but there is no screen for it in this panel yet.
                <?php else: ?>
                    This account has no admin sections enabled. Ask a super administrator to assign permissions.
                <?php endif; ?>
            </p>
            <p class="mt-4"><a href="logout.php" class="admin-btn admin-btn-secondary">Sign out</a></p>
        </div>
    </main>
</body>
</html>
