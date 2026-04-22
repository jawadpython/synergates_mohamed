<?php
/**
 * Admin – Image Editor
 * Manage website images by place. Select where the image appears, then upload or replace.
 */
declare(strict_types=1);

require_once __DIR__ . '/require_auth.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Editor – Admin</title>
    <link rel="stylesheet" href="../css/tailwind-built.css?v=1.0.63">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .slot-card { transition: all 0.15s; cursor: pointer; }
        .slot-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .slot-card.selected { box-shadow: 0 0 0 2px var(--admin-primary); }
        .preview-placeholder { background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); }
        .slot-thumb { aspect-ratio: 16/10; object-fit: cover; }
    </style>
</head>
<body>
    <nav class="admin-nav">
        <div class="admin-nav-inner">
            <a href="dashboard.php" class="admin-brand">
                <span class="admin-brand-icon"><i class="fas fa-images"></i></span>
                Image Editor
            </a>
            <div class="admin-nav-links">
                <a href="dashboard.php" class="admin-nav-link active">Images</a>
                <a href="blogs.php" class="admin-nav-link">Blogs</a>
                <a href="messages.php" class="admin-nav-link">Messages</a>
                <a href="faqs.php" class="admin-nav-link">FAQ</a>
                <a href="../index.html" target="_blank" class="admin-nav-link"><i class="fas fa-external-link-alt mr-1"></i>View Site</a>
                <a href="logout.php" class="admin-nav-link exit">Logout</a>
            </div>
        </div>
    </nav>

    <main class="admin-page" style="max-width:80rem">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left: Grouped slot cards -->
            <div class="lg:col-span-1 space-y-4">
                <input type="text" id="slot-search" placeholder="Search by name or location (e.g. left, section 1, diagram)…" class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <div id="slot-browser" class="space-y-6 max-h-[calc(100vh-14rem)] overflow-y-auto pr-2"></div>
            </div>

            <!-- Right: Editor panel -->
            <div class="lg:col-span-2">
        <div id="editor-panel" class="hidden">
            <div class="admin-card overflow-hidden">
                <div class="admin-card-body" style="padding:1.5rem 2rem">
                    <div class="flex items-center gap-2 mb-1">
                        <h2 id="slot-title" class="text-lg font-semibold text-slate-900"></h2>
                        <span id="slot-badge" class="hidden"></span>
                    </div>
                    <p id="slot-location" class="text-sm text-slate-500 mb-6"></p>

                    <div class="flex flex-col sm:flex-row gap-8">
                        <div class="flex-shrink-0">
                            <div id="preview-box" class="w-full sm:w-64 aspect-video rounded-xl overflow-hidden border border-slate-200 preview-placeholder flex items-center justify-center">
                                <span id="preview-text" class="text-slate-400 text-sm">No image</span>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-wrap gap-3">
                                <input type="file" id="file-input" accept="image/*" class="hidden">
                                <button type="button" id="btn-upload" class="admin-btn admin-btn-primary">
                                    <i class="fas fa-upload"></i>
                                    <span id="btn-upload-label">Upload</span>
                                </button>
                                <button type="button" id="btn-delete" class="admin-btn admin-btn-secondary">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                                <a id="btn-view" href="#" target="_blank" class="admin-btn admin-btn-secondary">
                                    <i class="fas fa-external-link-alt"></i> View on site
                                </a>
                            </div>
                            <p class="text-xs text-slate-500 mt-3">JPEG, PNG, GIF or WebP — max 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="empty-hint" class="admin-card admin-empty">
            <i class="fas fa-hand-pointer text-2xl text-slate-300 mb-3 block"></i>
            Click an image on the left to edit it
        </div>
            </div>
        </div>
    </main>

    <script>
    (function() {
        const API = '../api';
        let slotsData = { groups: [] };
        let selectedSlotId = null;

        function filterSlots() {
            const q = (document.getElementById('slot-search').value || '').toLowerCase().trim();
            document.querySelectorAll('.slot-group').forEach(grp => {
                let anyVisible = false;
                grp.querySelectorAll('.slot-card').forEach(card => {
                    const slot = JSON.parse(card.dataset.slot || '{}');
                    const searchText = ((slot.label || '') + ' ' + (slot.location || '') + ' ' + (slot.id || '')).toLowerCase();
                    const match = !q || searchText.indexOf(q) >= 0;
                    card.style.display = match ? '' : 'none';
                    if (match) anyVisible = true;
                });
                grp.style.display = anyVisible ? '' : 'none';
            });
        }

        function escapeHtml(s) {
            const d = document.createElement('div');
            d.textContent = s || '';
            return d.innerHTML;
        }

        function loadSlots(keepSelection) {
            const prevId = keepSelection ? selectedSlotId : null;
            fetch(API + '/images.php?action=slots', { credentials: 'same-origin' })
                .then(r => r.json())
                .then(data => {
                    slotsData = data;
                    const browser = document.getElementById('slot-browser');
                    browser.innerHTML = '';
                    (data.groups || []).forEach(grp => {
                        const section = document.createElement('div');
                        section.className = 'slot-group space-y-2';
                        const h3 = document.createElement('h3');
                        h3.className = 'text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 mb-2';
                        h3.textContent = grp.group || 'Other';
                        section.appendChild(h3);
                        const grid = document.createElement('div');
                        grid.className = 'grid grid-cols-2 gap-2';
                        (grp.slots || []).forEach(s => {
                            const card = document.createElement('div');
                            card.className = 'slot-card bg-white rounded-xl border overflow-hidden ' + (s.id === prevId ? 'selected border-blue-500 border-2' : 'border-slate-200');
                            card.dataset.slot = JSON.stringify(s);
                            card.dataset.slotId = s.id;
                            const thumb = s.exists
                                ? '<img src="../' + escapeHtml(s.path) + '?t=' + (s.mtime || Date.now()) + '" alt="" class="slot-thumb w-full">'
                                : '<div class="slot-thumb w-full preview-placeholder flex items-center justify-center"><i class="fas fa-image text-slate-300 text-lg"></i></div>';
                            const label = (s.label || s.id).length > 35 ? (s.label || s.id).substring(0, 32) + '…' : (s.label || s.id);
                            const loc = (s.location || '').trim();
                            let badge = '';
                            if (/(^| )left( |$)/i.test(loc)) badge = '<span class="inline-flex items-center justify-center w-5 h-5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold" title="Left image">L</span>';
                            else if (/(^| )right( |$)/i.test(loc)) badge = '<span class="inline-flex items-center justify-center w-5 h-5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold" title="Right image">R</span>';
                            const locHtml = loc ? '<p class="text-[10px] text-slate-500 mt-0.5 truncate" title="' + escapeHtml(loc) + '">' + escapeHtml(loc) + '</p>' : '';
                            card.innerHTML = thumb + '<div class="p-2"><div class="flex items-start justify-between gap-1"><p class="text-xs font-medium text-slate-700 truncate flex-1 min-w-0" title="' + escapeHtml(s.label) + '">' + escapeHtml(label) + '</p>' + badge + '</div>' + locHtml + (!s.exists ? '<span class="text-[10px] text-amber-600">No image</span>' : '') + '</div>';
                            card.addEventListener('click', function() {
                                document.querySelectorAll('.slot-card').forEach(c => { c.classList.remove('selected', 'border-blue-500', 'border-2'); c.classList.add('border-slate-200'); });
                                this.classList.remove('border-slate-200'); this.classList.add('selected', 'border-blue-500', 'border-2');
                                selectedSlotId = this.dataset.slotId;
                                showSlot(JSON.parse(this.dataset.slot || '{}'));
                            });
                            grid.appendChild(card);
                        });
                        section.appendChild(grid);
                        browser.appendChild(section);
                    });
                    filterSlots();
                    if (!prevId) {
                        document.getElementById('editor-panel').classList.add('hidden');
                        document.getElementById('empty-hint').classList.remove('hidden');
                    } else {
                        const card = browser.querySelector('[data-slot-id="' + prevId + '"]');
                        if (card) card.click();
                    }
                })
                .catch(() => {});
        }

        document.getElementById('slot-search').addEventListener('input', filterSlots);

        function showSlot(slot) {
            selectedSlotId = slot.id;
            document.getElementById('empty-hint').classList.add('hidden');
            const panel = document.getElementById('editor-panel');
            panel.classList.remove('hidden');
            document.getElementById('slot-title').textContent = slot.label;
            const page = slot.page || '';
            const loc = (slot.location || '').trim();
            document.getElementById('slot-location').innerHTML = (loc ? '<span class="text-blue-600 font-medium">' + escapeHtml(loc) + '</span>' : '') + (loc && page ? ' · ' : '') + (page ? 'Page: ' + escapeHtml(page) : '');
            const badgeEl = document.getElementById('slot-badge');
            if (/(^| )left( |$)/i.test(loc)) {
                badgeEl.innerHTML = '<span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold" title="Left image">L</span>';
                badgeEl.classList.remove('hidden');
            } else if (/(^| )right( |$)/i.test(loc)) {
                badgeEl.innerHTML = '<span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold" title="Right image">R</span>';
                badgeEl.classList.remove('hidden');
            } else {
                badgeEl.classList.add('hidden');
            }

            const preview = document.getElementById('preview-box');
            if (slot.exists) {
                preview.innerHTML = '<img src="../' + slot.path + '?t=' + (slot.mtime || Date.now()) + '" alt="" class="w-full h-full object-contain">';
                document.getElementById('btn-upload-label').textContent = 'Replace';
                document.getElementById('btn-delete').classList.remove('opacity-50', 'pointer-events-none');
            } else {
                preview.innerHTML = '<span id="preview-text" class="text-slate-400 text-sm">No image yet</span>';
                document.getElementById('btn-upload-label').textContent = 'Upload';
                document.getElementById('btn-delete').classList.add('opacity-50', 'pointer-events-none');
            }

            const viewBtn = document.getElementById('btn-view');
            viewBtn.href = page ? '../' + page.split('?')[0] + (page.includes('?') ? page.substring(page.indexOf('?')) : '') : '#';
            viewBtn.style.display = page ? 'inline-flex' : 'none';
            panel.dataset.slotId = slot.id;
        }

        document.getElementById('btn-upload').addEventListener('click', () => document.getElementById('file-input').click());

        document.getElementById('file-input').addEventListener('change', function() {
            const file = this.files[0];
            const slotId = document.getElementById('editor-panel').dataset.slotId;
            if (!file || !slotId) { this.value = ''; return; }
            const fd = new FormData();
            fd.append('slot', slotId);
            fd.append('image', file);
            const btn = document.getElementById('btn-upload');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading…';
            fetch(API + '/images.php', { method: 'POST', credentials: 'same-origin', body: fd })
                .then(r => r.json())
                .then(data => {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-upload"></i> <span id="btn-upload-label">Replace</span>';
                    if (data.success) {
                        loadSlots(true);
                        alert('Image saved.');
                    } else alert(data.error || 'Upload failed');
                })
                .catch(() => {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-upload"></i> <span id="btn-upload-label">Replace</span>';
                    alert('Upload failed');
                });
            this.value = '';
        });

        document.getElementById('btn-delete').addEventListener('click', function() {
            const slotId = document.getElementById('editor-panel').dataset.slotId;
            if (!slotId || this.classList.contains('pointer-events-none')) return;
            if (!confirm('Delete this image?')) return;
            fetch(API + '/images.php', {
                method: 'DELETE',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slot: slotId })
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    loadSlots(true);
                } else alert(data.error || 'Delete failed');
            })
            .catch(() => alert('Delete failed'));
        });

        loadSlots();
    })();
    </script>
</body>
</html>
