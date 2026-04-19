<?php
require_once __DIR__ . '/require_auth.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit FAQ - Admin</title>
    <link rel="stylesheet" href="css/tailwind-built.css?v=1.0.56">
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
                <a href="faqs.php" class="admin-nav-link"><i class="fas fa-arrow-left mr-1"></i> Back to FAQ</a>
                <a href="dashboard.php" class="admin-nav-link">Dashboard</a>
                <a href="blogs.php" class="admin-nav-link">Blogs</a>
                <a href="logout.php" class="admin-nav-link exit">Logout</a>
            </div>
        </div>
    </nav>

    <div class="admin-page" style="max-width:48rem">
        <div class="admin-page-header" style="margin-bottom:1.5rem">
            <h1 id="page-title" class="admin-page-title">Add FAQ</h1>
        </div>

        <form id="faq-form" class="space-y-6">
            <div class="admin-card admin-card-body space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="admin-label">Question (French) *</label>
                        <input type="text" id="question_fr" name="question_fr"
                            class="admin-input"
                            placeholder="Question en français">
                    </div>
                    <div>
                        <label class="admin-label">Question (English)</label>
                        <input type="text" id="question_en" name="question_en"
                            class="admin-input"
                            placeholder="Question in English">
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="admin-label">Answer (French)</label>
                        <textarea id="answer_fr" name="answer_fr" rows="4"
                            class="admin-textarea resize-y"
                            placeholder="Réponse en français"></textarea>
                    </div>
                    <div>
                        <label class="admin-label">Answer (English)</label>
                        <textarea id="answer_en" name="answer_en" rows="4"
                            class="admin-textarea resize-y"
                            placeholder="Answer in English"></textarea>
                    </div>
                </div>
                <div>
                    <label class="admin-label">Sort order</label>
                    <input type="number" id="sort_order" name="sort_order" value="1" min="1"
                        class="admin-input" style="width:6rem">
                </div>
            </div>

            <div class="flex justify-between items-center">
                <a href="faqs.php" class="admin-btn admin-btn-secondary">Cancel</a>
                <button type="submit" class="admin-btn admin-btn-primary">Save FAQ</button>
            </div>
        </form>
    </div>

    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const faqId = urlParams.get('id');
        let isEditing = false;

        if (faqId) {
            isEditing = true;
            document.getElementById('page-title').textContent = 'Edit FAQ';
            loadFaq(faqId);
        }

        async function loadFaq(id) {
            try {
                const response = await fetch(`../api/faq.php?id=${id}`);
                const data = await response.json();

                if (data.success && data.faq) {
                    const faq = data.faq;
                    document.getElementById('question_fr').value = faq.question_fr || '';
                    document.getElementById('question_en').value = faq.question_en || '';
                    document.getElementById('answer_fr').value = faq.answer_fr || '';
                    document.getElementById('answer_en').value = faq.answer_en || '';
                    document.getElementById('sort_order').value = faq.sort_order ?? 1;
                }
            } catch (error) {
                alert('Error loading FAQ');
            }
        }

        document.getElementById('faq-form').addEventListener('submit', async function(e) {
            e.preventDefault();

            const questionFr = document.getElementById('question_fr').value.trim();
            const questionEn = document.getElementById('question_en').value.trim();

            if (!questionFr && !questionEn) {
                alert('Please enter at least one question (French or English)');
                return;
            }

            const payload = {
                question_fr: questionFr,
                question_en: questionEn,
                answer_fr: document.getElementById('answer_fr').value.trim(),
                answer_en: document.getElementById('answer_en').value.trim(),
                sort_order: parseInt(document.getElementById('sort_order').value, 10) || 1
            };

            if (isEditing) {
                payload.id = faqId;
            }

            try {
                const response = await fetch('../api/faq.php', {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (data.success) {
                    window.location.href = 'faqs.php';
                } else {
                    alert('Error: ' + (data.message || 'Unknown error'));
                }
            } catch (error) {
                alert('Error saving FAQ');
            }
        });
    </script>
</body>
</html>
