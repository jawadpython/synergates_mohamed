<?php
/**
 * Admin: View Contact Form Submissions
 */
require_once __DIR__ . '/require_auth.php';

$dataFile = dirname(__DIR__) . '/data/contact-submissions.json';
$submissions = [];
if (file_exists($dataFile)) {
    $submissions = json_decode(file_get_contents($dataFile), true) ?: [];
}

// Handle mark as read
if (isset($_POST['mark_read']) && isset($_POST['id'])) {
    foreach ($submissions as &$sub) {
        if ($sub['id'] === $_POST['id']) {
            $sub['read'] = true;
            break;
        }
    }
    file_put_contents($dataFile, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header('Location: messages.php');
    exit;
}

// Handle delete
if (isset($_POST['delete']) && isset($_POST['id'])) {
    $submissions = array_filter($submissions, fn($s) => $s['id'] !== $_POST['id']);
    $submissions = array_values($submissions);
    file_put_contents($dataFile, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    header('Location: messages.php');
    exit;
}

$unreadCount = count(array_filter($submissions, fn($s) => !($s['read'] ?? false)));
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Messages - Admin SYNERGATES</title>
    <link rel="stylesheet" href="../css/tailwind-built.css?v=1.0.63">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <nav class="admin-nav">
        <div class="admin-nav-inner">
            <a href="dashboard.php" class="admin-brand">
                <span class="admin-brand-icon"><i class="fas fa-cog"></i></span>
                SYNERGATES Admin
            </a>
            <div class="admin-nav-links">
                <a href="dashboard.php" class="admin-nav-link">Dashboard</a>
                <a href="messages.php" class="admin-nav-link active">Messages</a>
                <a href="blogs.php" class="admin-nav-link">Blogs</a>
                <a href="faqs.php" class="admin-nav-link">FAQ</a>
                <a href="../index.html" target="_blank" class="admin-nav-link"><i class="fas fa-external-link-alt mr-1"></i>View Site</a>
                <a href="logout.php" class="admin-nav-link exit">Logout</a>
            </div>
        </div>
    </nav>

    <main class="admin-page">
        <div class="admin-page-header">
            <div>
                <h1 class="admin-page-title">Messages du formulaire de contact</h1>
                <p class="admin-page-subtitle">
                    <?= count($submissions) ?> message(s) total
                    <?php if ($unreadCount > 0): ?>
                        <span class="admin-badge admin-badge-warning"><?= $unreadCount ?> non lu(s)</span>
                    <?php endif; ?>
                </p>
            </div>
        </div>

        <?php if (empty($submissions)): ?>
            <div class="admin-card admin-empty">
                <i class="fas fa-inbox admin-empty-icon"></i>
                <p class="admin-empty-text">Aucun message pour le moment</p>
                <p class="text-gray-400 text-sm">Les messages du formulaire de contact apparaîtront ici</p>
            </div>
        <?php else: ?>
            <div class="flex flex-col gap-4">
                <?php foreach ($submissions as $msg): ?>
                    <div class="admin-card <?= empty($msg['read']) ? 'border-l-4 border-l-[var(--admin-primary)]' : '' ?>">
                        <div class="admin-card-body">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <div class="flex items-center gap-3">
                                        <h3 class="text-lg font-semibold text-gray-900"><?= htmlspecialchars($msg['name']) ?></h3>
                                        <?php if (empty($msg['read'])): ?>
                                            <span class="admin-badge admin-badge-success">Nouveau</span>
                                        <?php endif; ?>
                                        <?php if (!empty($msg['emailSent'])): ?>
                                            <span class="admin-badge admin-badge-success" title="Email envoyé">
                                                <i class="fas fa-check"></i> Email
                                            </span>
                                        <?php else: ?>
                                            <span class="admin-badge admin-badge-warning" title="Email non envoyé">
                                                <i class="fas fa-exclamation-triangle"></i> Email non envoyé
                                            </span>
                                        <?php endif; ?>
                                    </div>
                                    <p class="text-gray-600 text-sm mt-1">
                                        <a href="mailto:<?= htmlspecialchars($msg['email']) ?>" class="text-blue-600 hover:underline"><?= htmlspecialchars($msg['email']) ?></a>
                                        <?php if (!empty($msg['phone'])): ?>
                                            <span class="mx-2">•</span>
                                            <a href="tel:<?= htmlspecialchars($msg['phone']) ?>" class="hover:underline"><?= htmlspecialchars($msg['phone']) ?></a>
                                        <?php endif; ?>
                                    </p>
                                    <?php if (!empty($msg['company'])): ?>
                                        <p class="text-gray-500 text-sm"><i class="fas fa-building mr-1"></i><?= htmlspecialchars($msg['company']) ?></p>
                                    <?php endif; ?>
                                </div>
                                <div class="text-right text-sm text-gray-500">
                                    <p><?= date('d/m/Y H:i', strtotime($msg['date'])) ?></p>
                                    <p class="text-xs mt-1 bg-gray-100 px-2 py-1 rounded"><?= htmlspecialchars($msg['subjectLabel'] ?? $msg['subject']) ?></p>
                                </div>
                            </div>
                            
                            <div class="bg-gray-50 rounded p-4 mb-4">
                                <p class="text-gray-700 whitespace-pre-wrap"><?= htmlspecialchars($msg['message']) ?></p>
                            </div>
                            
                            <div class="flex gap-2" style="flex-wrap:wrap;gap:0.5rem;">
                                <a href="mailto:<?= htmlspecialchars($msg['email']) ?>?subject=Re: <?= urlencode($msg['subjectLabel'] ?? 'Votre demande') ?>" 
                                   class="admin-btn admin-btn-primary">
                                    <i class="fas fa-reply"></i> Répondre
                                </a>
                                <?php if (empty($msg['read'])): ?>
                                    <form method="POST" style="display:inline;">
                                        <input type="hidden" name="id" value="<?= htmlspecialchars($msg['id']) ?>">
                                        <button type="submit" name="mark_read" class="admin-btn admin-btn-secondary">
                                            <i class="fas fa-check"></i> Marquer comme lu
                                        </button>
                                    </form>
                                <?php endif; ?>
                                <form method="POST" style="display:inline;" onsubmit="return confirm('Supprimer ce message ?');">
                                    <input type="hidden" name="id" value="<?= htmlspecialchars($msg['id']) ?>">
                                    <button type="submit" name="delete" class="admin-btn admin-btn-danger">
                                        <i class="fas fa-trash"></i> Supprimer
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </main>
</body>
</html>
