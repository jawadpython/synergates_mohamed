<?php
/**
 * Shared admin navigation. Expects require_auth + admin_context loaded.
 * @var string $adminNavActive one of: dashboard|blogs|messages|faqs|users
 */
declare(strict_types=1);

if (!function_exists('admin_can')) {
    return;
}

$active = $adminNavActive ?? '';
?>
<nav class="admin-nav">
    <div class="admin-nav-inner">
        <a href="dashboard.php" class="admin-brand">
            <span class="admin-brand-icon"><i class="fas fa-cog"></i></span>
            SYNERGATES Admin
        </a>
        <div class="admin-nav-links">
            <?php if (!empty($adminNavExtras) && is_array($adminNavExtras)): ?>
                <?php foreach ($adminNavExtras as $html) {
                    echo $html;
                } ?>
            <?php endif; ?>
            <?php if (admin_can('images')): ?>
                <a href="dashboard.php" class="admin-nav-link<?= $active === 'dashboard' ? ' active' : '' ?>">Images</a>
            <?php endif; ?>
            <?php if (admin_can('messages')): ?>
                <a href="messages.php" class="admin-nav-link<?= $active === 'messages' ? ' active' : '' ?>">Messages</a>
            <?php endif; ?>
            <?php if (admin_can('blogs')): ?>
                <a href="blogs.php" class="admin-nav-link<?= $active === 'blogs' ? ' active' : '' ?>">Blogs</a>
            <?php endif; ?>
            <?php if (admin_can('faqs')): ?>
                <a href="faqs.php" class="admin-nav-link<?= $active === 'faqs' ? ' active' : '' ?>">FAQ</a>
            <?php endif; ?>
            <?php if (admin_is_super()): ?>
                <a href="users.php" class="admin-nav-link<?= $active === 'users' ? ' active' : '' ?>"><i class="fas fa-users mr-1"></i>Users</a>
            <?php endif; ?>
            <a href="../index.html" target="_blank" class="admin-nav-link"><i class="fas fa-external-link-alt mr-1"></i>View Site</a>
            <a href="logout.php" class="admin-nav-link exit">Logout</a>
        </div>
    </div>
</nav>
