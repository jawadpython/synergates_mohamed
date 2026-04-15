<?php
require_once __DIR__ . '/require_auth.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAQ Management - Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
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
                <a href="messages.php" class="admin-nav-link">Messages</a>
                <a href="blogs.php" class="admin-nav-link">Blogs</a>
                <a href="faqs.php" class="admin-nav-link active">FAQ</a>
                <a href="../faq.html" target="_blank" class="admin-nav-link"><i class="fas fa-external-link-alt mr-1"></i>View FAQ</a>
                <a href="logout.php" class="admin-nav-link exit">Logout</a>
            </div>
        </div>
    </nav>

    <div class="admin-page">
        <div class="admin-page-header">
            <div>
                <h1 class="admin-page-title">FAQ Management</h1>
                <p class="admin-page-subtitle">Manage frequently asked questions (FR & EN)</p>
            </div>
            <a href="faq-edit.php" class="admin-btn admin-btn-primary">
                <i class="fas fa-plus"></i> Add FAQ
            </a>
        </div>

        <div id="faq-list" class="admin-card">
            <div class="admin-empty">
                <i class="fas fa-spinner fa-spin admin-empty-icon"></i>
                <p class="admin-empty-text">Loading FAQ...</p>
            </div>
        </div>
    </div>

    <script>
        function escapeHtml(text) {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        async function loadFaqs() {
            try {
                const response = await fetch('../api/faq.php');
                const data = await response.json();

                if (data.success && data.faqs && data.faqs.length > 0) {
                    renderFaqs(data.faqs);
                } else {
                    document.getElementById('faq-list').innerHTML = `
                        <div class="admin-empty">
                            <i class="fas fa-question-circle admin-empty-icon"></i>
                            <p class="admin-empty-text">No FAQ items yet</p>
                            <a href="faq-edit.php" class="admin-btn admin-btn-primary">Add your first FAQ</a>
                        </div>
                    `;
                }
            } catch (error) {
                document.getElementById('faq-list').innerHTML = `
                    <div class="admin-empty admin-alert admin-alert-error">
                        <i class="fas fa-exclamation-circle admin-empty-icon"></i>
                        <p class="admin-empty-text">Error loading FAQ</p>
                    </div>
                `;
            }
        }

        function renderFaqs(faqs) {
            const html = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th style="width:3rem">#</th>
                            <th>Question (FR)</th>
                            <th>Question (EN)</th>
                            <th style="text-align:right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${faqs.map((faq, idx) => `
                            <tr>
                                <td class="text-sm text-gray-500">${idx + 1}</td>
                                <td><div class="font-medium text-gray-900 text-sm max-w-xs truncate" title="${escapeHtml(faq.question_fr)}">${escapeHtml(faq.question_fr) || '—'}</div></td>
                                <td><div class="text-sm text-gray-600 max-w-xs truncate" title="${escapeHtml(faq.question_en)}">${escapeHtml(faq.question_en) || '—'}</div></td>
                                <td style="text-align:right">
                                    <a href="faq-edit.php?id=${faq.id}" class="admin-action" title="Edit"><i class="fas fa-edit"></i></a>
                                    <button onclick="deleteFaq('${faq.id}')" class="admin-action danger" title="Delete"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            document.getElementById('faq-list').innerHTML = html;
        }

        async function deleteFaq(id) {
            if (!confirm('Delete this FAQ item?')) return;
            try {
                const response = await fetch('../api/faq.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                });
                const data = await response.json();
                if (data.success) {
                    loadFaqs();
                } else {
                    alert('Error: ' + (data.message || 'Unknown error'));
                }
            } catch (error) {
                alert('Error deleting FAQ');
            }
        }

        loadFaqs();
    </script>
</body>
</html>
