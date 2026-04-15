<?php
require_once __DIR__ . '/require_auth.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Blog - Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .editor-toolbar button { padding: 8px 12px; border: 1px solid var(--admin-border); background: white; cursor: pointer; border-radius: var(--admin-radius-sm); }
        .editor-toolbar button:hover { background: #f3f4f6; }
        .editor-toolbar button.active { background: #e5e7eb; }
        #content-editor { min-height: 400px; outline: none; }
        #content-editor:focus { border-color: var(--admin-primary); }
        #content-editor img { max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px; }
        .image-preview { max-width: 200px; max-height: 150px; object-fit: cover; border-radius: 4px; }
        .upload-progress { height: 4px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
        .upload-progress-bar { height: 100%; background: var(--admin-primary); transition: width 0.3s; }
    </style>
</head>
<body>
    <nav class="admin-nav">
        <div class="admin-nav-inner">
            <a href="dashboard.php" class="admin-brand">
                <span class="admin-brand-icon"><i class="fas fa-cog"></i></span>
                SYNERGATES Admin
            </a>
            <div class="admin-nav-links">
                <a href="blogs.php" class="admin-nav-link"><i class="fas fa-arrow-left mr-1"></i> Back to Blogs</a>
                <a href="dashboard.php" class="admin-nav-link">Dashboard</a>
                <a href="faqs.php" class="admin-nav-link">FAQ</a>
                <a href="logout.php" class="admin-nav-link exit">Logout</a>
            </div>
        </div>
    </nav>

    <div class="admin-page" style="max-width:48rem">
        <div class="admin-page-header" style="margin-bottom:1.5rem">
            <h1 id="page-title" class="admin-page-title">New Blog Post</h1>
        </div>

        <form id="blog-form" class="space-y-6">
            <div class="admin-card admin-card-body space-y-5">
                <!-- Bilingual content tabs -->
                <div class="border-b border-[var(--admin-border)] mb-6">
                    <div class="flex gap-4">
                        <button type="button" id="tab-fr" class="tab-btn px-4 py-2 text-sm font-medium border-b-2 border-[var(--admin-primary)] text-[var(--admin-primary)] -mb-px">Français</button>
                        <button type="button" id="tab-en" class="tab-btn px-4 py-2 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 -mb-px">English</button>
                    </div>
                </div>

                <!-- French -->
                <div id="panel-fr" class="lang-panel space-y-5">
                    <div>
                        <label class="admin-label">Title (French) *</label>
                        <input type="text" id="title_fr" name="title_fr"
                            class="admin-input"
                            placeholder="Titre en français">
                    </div>
                    <div>
                        <label class="admin-label">Excerpt (French)</label>
                        <textarea id="excerpt_fr" name="excerpt_fr" rows="2"
                            class="admin-textarea resize-none"
                            placeholder="Résumé en français"></textarea>
                    </div>
                    <div>
                        <label class="admin-label" style="margin-bottom:0.5rem">Content (French) *</label>
                        <div class="border border-[var(--admin-border)] rounded-[var(--admin-radius-sm)] overflow-hidden">
                            <div class="editor-toolbar flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
                                <button type="button" onclick="formatText('content-editor-fr', 'bold')" title="Bold"><i class="fas fa-bold"></i></button>
                                <button type="button" onclick="formatText('content-editor-fr', 'italic')" title="Italic"><i class="fas fa-italic"></i></button>
                                <button type="button" onclick="formatText('content-editor-fr', 'underline')" title="Underline"><i class="fas fa-underline"></i></button>
                                <span class="border-r border-gray-300 mx-1"></span>
                                <button type="button" onclick="formatBlock('content-editor-fr', 'h2')" title="Heading 2">H2</button>
                                <button type="button" onclick="formatBlock('content-editor-fr', 'h3')" title="Heading 3">H3</button>
                                <button type="button" onclick="formatBlock('content-editor-fr', 'p')" title="Paragraph">P</button>
                                <span class="border-r border-gray-300 mx-1"></span>
                                <button type="button" onclick="formatText('content-editor-fr', 'insertUnorderedList')" title="Bullet List"><i class="fas fa-list-ul"></i></button>
                                <button type="button" onclick="formatText('content-editor-fr', 'insertOrderedList')" title="Numbered List"><i class="fas fa-list-ol"></i></button>
                                <span class="border-r border-gray-300 mx-1"></span>
                                <button type="button" onclick="insertLink('content-editor-fr')" title="Insert Link"><i class="fas fa-link"></i></button>
                                <button type="button" onclick="document.getElementById('content-image-input-fr').click()" title="Insert Image" class="text-green-600"><i class="fas fa-image"></i></button>
                                <input type="file" id="content-image-input-fr" accept="image/*" class="hidden" onchange="insertContentImage(this, 'content-editor-fr')">
                            </div>
                            <div id="content-editor-fr" contenteditable="true" class="p-4 min-h-[300px] focus:outline-none prose prose-sm max-w-none" data-lang="fr"></div>
                        </div>
                    </div>
                </div>

                <!-- English -->
                <div id="panel-en" class="lang-panel hidden space-y-5">
                    <div>
                        <label class="admin-label">Title (English)</label>
                        <input type="text" id="title_en" name="title_en"
                            class="admin-input"
                            placeholder="Title in English">
                    </div>
                    <div>
                        <label class="admin-label">Excerpt (English)</label>
                        <textarea id="excerpt_en" name="excerpt_en" rows="2"
                            class="admin-textarea resize-none"
                            placeholder="Excerpt in English"></textarea>
                    </div>
                    <div>
                        <label class="admin-label" style="margin-bottom:0.5rem">Content (English)</label>
                        <div class="border border-[var(--admin-border)] rounded-[var(--admin-radius-sm)] overflow-hidden">
                            <div class="editor-toolbar flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
                                <button type="button" onclick="formatText('content-editor-en', 'bold')" title="Bold"><i class="fas fa-bold"></i></button>
                                <button type="button" onclick="formatText('content-editor-en', 'italic')" title="Italic"><i class="fas fa-italic"></i></button>
                                <button type="button" onclick="formatText('content-editor-en', 'underline')" title="Underline"><i class="fas fa-underline"></i></button>
                                <span class="border-r border-gray-300 mx-1"></span>
                                <button type="button" onclick="formatBlock('content-editor-en', 'h2')" title="Heading 2">H2</button>
                                <button type="button" onclick="formatBlock('content-editor-en', 'h3')" title="Heading 3">H3</button>
                                <button type="button" onclick="formatBlock('content-editor-en', 'p')" title="Paragraph">P</button>
                                <span class="border-r border-gray-300 mx-1"></span>
                                <button type="button" onclick="formatText('content-editor-en', 'insertUnorderedList')" title="Bullet List"><i class="fas fa-list-ul"></i></button>
                                <button type="button" onclick="formatText('content-editor-en', 'insertOrderedList')" title="Numbered List"><i class="fas fa-list-ol"></i></button>
                                <span class="border-r border-gray-300 mx-1"></span>
                                <button type="button" onclick="insertLink('content-editor-en')" title="Insert Link"><i class="fas fa-link"></i></button>
                                <button type="button" onclick="document.getElementById('content-image-input-en').click()" title="Insert Image" class="text-green-600"><i class="fas fa-image"></i></button>
                                <input type="file" id="content-image-input-en" accept="image/*" class="hidden" onchange="insertContentImage(this, 'content-editor-en')">
                            </div>
                            <div id="content-editor-en" contenteditable="true" class="p-4 min-h-[300px] focus:outline-none prose prose-sm max-w-none" data-lang="en"></div>
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-200">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="admin-label">Category</label>
                            <select id="category" name="category" class="admin-select">
                                <option value="General">General</option>
                                <option value="Technology">Technology</option>
                                <option value="Security">Security</option>
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="News">News</option>
                                <option value="Case Study">Case Study</option>
                            </select>
                        </div>
                        <div>
                            <label class="admin-label">Author</label>
                            <input type="text" id="author" name="author" value="Admin" class="admin-input">
                        </div>
                    </div>
                </div>

                <!-- Featured Image Upload -->
                <div>
                    <label class="admin-label" style="margin-bottom:0.5rem">Featured Image</label>
                    <div class="flex items-start gap-4">
                        <div id="featured-image-preview" class="hidden">
                            <img id="featured-image-img" src="" alt="Preview" class="image-preview border border-gray-200">
                            <button type="button" onclick="removeFeaturedImage()" class="mt-2 text-xs text-red-500 hover:text-red-700">
                                <i class="fas fa-trash mr-1"></i>Remove
                            </button>
                        </div>
                        <div id="featured-image-upload" class="flex-1">
                            <div class="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-gray-400 transition cursor-pointer" onclick="document.getElementById('featured-image-input').click()">
                                <i class="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-2"></i>
                                <p class="text-sm text-gray-600">Click to upload image</p>
                                <p class="text-xs text-gray-400 mt-1">JPEG, PNG, GIF or WebP — max 10MB</p>
                            </div>
                            <input type="file" id="featured-image-input" accept="image/*" class="hidden" onchange="uploadFeaturedImage(this)">
                            <div id="featured-upload-progress" class="upload-progress mt-2 hidden">
                                <div class="upload-progress-bar" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="image" name="image">
                </div>

                <div>
                    <label class="admin-label">Status</label>
                    <div class="flex gap-4">
                        <label class="flex items-center">
                            <input type="radio" name="status" value="draft" checked class="mr-2">
                            <span class="text-sm">Draft</span>
                        </label>
                        <label class="flex items-center">
                            <input type="radio" name="status" value="published" class="mr-2">
                            <span class="text-sm">Published</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center">
                <a href="blogs.php" class="admin-btn admin-btn-secondary">Cancel</a>
                <div class="flex gap-3">
                    <button type="button" onclick="saveBlog('draft')" class="admin-btn admin-btn-secondary">Save Draft</button>
                    <button type="button" onclick="saveBlog('published')" class="admin-btn admin-btn-primary">Publish</button>
                </div>
            </div>
        </form>
    </div>

    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        let isEditing = false;

        document.getElementById('tab-fr').addEventListener('click', function() {
            document.getElementById('panel-fr').classList.remove('hidden');
            document.getElementById('panel-en').classList.add('hidden');
            document.getElementById('tab-fr').classList.add('border-blue-600', 'text-blue-600');
            document.getElementById('tab-fr').classList.remove('border-transparent');
            document.getElementById('tab-en').classList.remove('border-blue-600', 'text-blue-600');
            document.getElementById('tab-en').classList.add('border-transparent', 'text-gray-500');
        });
        document.getElementById('tab-en').addEventListener('click', function() {
            document.getElementById('panel-en').classList.remove('hidden');
            document.getElementById('panel-fr').classList.add('hidden');
            document.getElementById('tab-en').classList.add('border-blue-600', 'text-blue-600');
            document.getElementById('tab-en').classList.remove('border-transparent');
            document.getElementById('tab-fr').classList.remove('border-blue-600', 'text-blue-600');
            document.getElementById('tab-fr').classList.add('border-transparent', 'text-gray-500');
        });

        if (blogId) {
            isEditing = true;
            document.getElementById('page-title').textContent = 'Edit Blog Post';
            loadBlog(blogId);
        }

        function pathToAdmin(s) {
            return (s || '')
                .replace(/src="images\//g, 'src="../images/')
                .replace(/src="uploads\//g, 'src="../uploads/');
        }

        async function loadBlog(id) {
            try {
                const response = await fetch(`../api/blogs.php?id=${id}`);
                const data = await response.json();

                if (data.success && data.blog) {
                    const blog = data.blog;
                    document.getElementById('title_fr').value = blog.title_fr || blog.title || '';
                    document.getElementById('title_en').value = blog.title_en || '';
                    document.getElementById('excerpt_fr').value = blog.excerpt_fr || blog.excerpt || '';
                    document.getElementById('excerpt_en').value = blog.excerpt_en || '';
                    document.getElementById('category').value = blog.category;
                    document.getElementById('author').value = blog.author || 'Admin';

                    document.getElementById('content-editor-fr').innerHTML = pathToAdmin(blog.content_fr || blog.content || '');
                    document.getElementById('content-editor-en').innerHTML = pathToAdmin(blog.content_en || '');

                    document.querySelector(`input[name="status"][value="${blog.status}"]`).checked = true;

                    if (blog.image) {
                        document.getElementById('image').value = blog.image;
                        showFeaturedImagePreview(blog.image);
                    }
                }
            } catch (error) {
                alert('Error loading blog');
            }
        }

        function showFeaturedImagePreview(url) {
            const fullUrl = url.startsWith('http') ? url : '../' + url;
            document.getElementById('featured-image-img').src = fullUrl;
            document.getElementById('featured-image-preview').classList.remove('hidden');
            document.getElementById('featured-image-upload').classList.add('hidden');
        }

        function removeFeaturedImage() {
            document.getElementById('image').value = '';
            document.getElementById('featured-image-img').src = '';
            document.getElementById('featured-image-preview').classList.add('hidden');
            document.getElementById('featured-image-upload').classList.remove('hidden');
            document.getElementById('featured-image-input').value = '';
        }

        async function uploadFeaturedImage(input) {
            if (!input.files || !input.files[0]) return;
            
            const file = input.files[0];
            const progressBar = document.getElementById('featured-upload-progress');
            const progressFill = progressBar.querySelector('.upload-progress-bar');
            
            progressBar.classList.remove('hidden');
            progressFill.style.width = '30%';

            const formData = new FormData();
            formData.append('image', file);

            try {
                progressFill.style.width = '60%';
                const response = await fetch('../api/blog-upload.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin'
                });

                progressFill.style.width = '90%';
                const raw = await response.text();
                let data;
                try {
                    data = JSON.parse(raw);
                } catch (e) {
                    progressBar.classList.add('hidden');
                    alert('Upload failed: invalid response from server.');
                    return;
                }

                if (data.success) {
                    progressFill.style.width = '100%';
                    setTimeout(() => {
                        progressBar.classList.add('hidden');
                        progressFill.style.width = '0%';
                    }, 500);
                    
                    document.getElementById('image').value = data.url;
                    showFeaturedImagePreview(data.url);
                } else {
                    progressBar.classList.add('hidden');
                    alert('Upload failed: ' + (data.message || data.error || 'Unknown error'));
                }
            } catch (error) {
                progressBar.classList.add('hidden');
                alert('Error uploading image');
            }
        }

        async function insertContentImage(input, editorId) {
            if (!input.files || !input.files[0]) return;

            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            const editor = document.getElementById(editorId);
            if (!editor) return;
            const placeholder = document.createElement('span');
            placeholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
            placeholder.style.color = '#9ca3af';

            editor.focus();
            document.execCommand('insertHTML', false, placeholder.outerHTML);

            try {
                const response = await fetch('../api/blog-upload.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin'
                });
                const raw = await response.text();
                let data;
                try {
                    data = JSON.parse(raw);
                } catch (e) {
                    alert('Upload failed: invalid response from server.');
                    const spinners = editor.querySelectorAll('.fa-spinner');
                    if (spinners.length > 0) spinners[spinners.length - 1].parentElement.remove();
                    return;
                }

                if (data.success) {
                    const img = document.createElement('img');
                    img.src = '../' + data.url;
                    img.alt = 'Blog image';
                    img.style.maxWidth = '100%';
                    const spinners = editor.querySelectorAll('.fa-spinner');
                    if (spinners.length > 0) spinners[spinners.length - 1].parentElement.replaceWith(img);
                } else {
                    alert('Upload failed: ' + (data.message || data.error || 'Unknown error'));
                    const spinners = editor.querySelectorAll('.fa-spinner');
                    if (spinners.length > 0) spinners[spinners.length - 1].parentElement.remove();
                }
            } catch (error) {
                alert('Error uploading image');
                const spinners = editor.querySelectorAll('.fa-spinner');
                if (spinners.length > 0) spinners[spinners.length - 1].parentElement.remove();
            }
            input.value = '';
        }

        function formatText(editorId, command) {
            const editor = document.getElementById(editorId);
            if (editor) {
                editor.focus();
                document.execCommand(command, false, null);
            }
        }

        function formatBlock(editorId, tag) {
            const editor = document.getElementById(editorId);
            if (editor) {
                editor.focus();
                document.execCommand('formatBlock', false, tag);
            }
        }

        function insertLink(editorId) {
            const url = prompt('Enter URL:');
            if (url) {
                const editor = document.getElementById(editorId);
                if (editor) {
                    editor.focus();
                    document.execCommand('createLink', false, url);
                }
            }
        }

        async function saveBlog(status) {
            const titleFr = document.getElementById('title_fr').value.trim();
            const titleEn = document.getElementById('title_en').value.trim();
            let contentFr = document.getElementById('content-editor-fr').innerHTML.trim();
            let contentEn = document.getElementById('content-editor-en').innerHTML.trim();

            if (!titleFr && !titleEn) {
                alert('Please enter at least one title (French or English)');
                return;
            }

            const strip = (html) => (html || '').replace(/<[^>]*>/g, '').trim();
            if (!strip(contentFr) && !strip(contentEn)) {
                alert('Please enter content in at least one language');
                return;
            }

            contentFr = contentFr.replace(/src="\.\.\/images\//g, 'src="images/')
                .replace(/src="\.\.\/uploads\//g, 'src="uploads/');
            contentEn = contentEn.replace(/src="\.\.\/images\//g, 'src="images/')
                .replace(/src="\.\.\/uploads\//g, 'src="uploads/');

            const blogData = {
                title_fr: titleFr,
                title_en: titleEn,
                excerpt_fr: document.getElementById('excerpt_fr').value.trim(),
                excerpt_en: document.getElementById('excerpt_en').value.trim(),
                content_fr: contentFr,
                content_en: contentEn,
                title: titleFr || titleEn,
                excerpt: document.getElementById('excerpt_fr').value.trim() || document.getElementById('excerpt_en').value.trim(),
                content: contentFr || contentEn,
                category: document.getElementById('category').value,
                author: document.getElementById('author').value.trim() || 'Admin',
                image: document.getElementById('image').value.trim(),
                status: status
            };

            if (isEditing) blogData.id = blogId;

            try {
                const response = await fetch('../api/blogs.php', {
                    method: isEditing ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blogData)
                });
                const data = await response.json();
                if (data.success) {
                    window.location.href = 'blogs.php';
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                alert('Error saving blog');
            }
        }

        ['content-editor-fr', 'content-editor-en'].forEach(function(editorId) {
            const editor = document.getElementById(editorId);
            if (editor) {
                editor.addEventListener('focus', function() {
                    if (this.innerHTML === '' || this.innerHTML === '<br>') this.innerHTML = '';
                });
                editor.addEventListener('blur', function() {
                    if (this.innerHTML === '' || this.innerHTML === '<br>') this.innerHTML = '';
                });
            }
        });
    </script>
</body>
</html>
