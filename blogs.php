<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Management - Admin</title>
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
                <a href="dashboard.php" class="admin-nav-link">Dashboard</a>
                <a href="messages.php" class="admin-nav-link">Messages</a>
                <a href="blogs.php" class="admin-nav-link active">Blogs</a>
                <a href="faqs.php" class="admin-nav-link">FAQ</a>
                <a href="../index.html" target="_blank" class="admin-nav-link"><i class="fas fa-external-link-alt mr-1"></i>View Site</a>
                <a href="logout.php" class="admin-nav-link exit">Logout</a>
            </div>
        </div>
    </nav>

    <div class="admin-page">
        <div class="admin-page-header">
            <div>
                <h1 class="admin-page-title">Blog Posts</h1>
                <p class="admin-page-subtitle">Manage your blog articles</p>
            </div>
            <a href="blog-edit.php" class="admin-btn admin-btn-primary">
                <i class="fas fa-plus"></i> New Post
            </a>
        </div>

        <div id="blogs-list" class="admin-card">
            <div class="admin-empty">
                <i class="fas fa-spinner fa-spin admin-empty-icon"></i>
                <p class="admin-empty-text">Loading blogs...</p>
            </div>
        </div>
    </div>

    <script>
        async function loadBlogs() {
            try {
                const response = await fetch('../api/blogs.php');
                const data = await response.json();
                
                if (data.success && data.blogs.length > 0) {
                    renderBlogs(data.blogs);
                } else {
                    document.getElementById('blogs-list').innerHTML = `
                        <div class="admin-empty">
                            <i class="fas fa-newspaper admin-empty-icon"></i>
                            <p class="admin-empty-text">No blog posts yet</p>
                            <a href="blog-edit.php" class="admin-btn admin-btn-primary">Create your first post</a>
                        </div>
                    `;
                }
            } catch (error) {
                document.getElementById('blogs-list').innerHTML = `
                    <div class="admin-empty admin-alert admin-alert-error">
                        <i class="fas fa-exclamation-circle admin-empty-icon"></i>
                        <p class="admin-empty-text">Error loading blogs</p>
                    </div>
                `;
            }
        }

        function renderBlogs(blogs) {
            const html = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th style="text-align:right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${blogs.map(blog => `
                            <tr>
                                <td>
                                    <div class="font-medium text-gray-900 text-sm">${escapeHtml(blog.title_fr || blog.title_en || blog.title)}</div>
                                    <div class="text-xs text-gray-500">by ${escapeHtml(blog.author)}</div>
                                </td>
                                <td><span class="text-sm text-gray-600">${escapeHtml(blog.category)}</span></td>
                                <td><span class="admin-badge ${blog.status === 'published' ? 'admin-badge-success' : 'admin-badge-warning'}">${blog.status === 'published' ? 'Published' : 'Draft'}</span></td>
                                <td class="text-sm text-gray-500">${new Date(blog.created_at).toLocaleDateString('fr-FR')}</td>
                                <td style="text-align:right">
                                    <a href="blog-edit.php?id=${blog.id}" class="admin-action" title="Edit"><i class="fas fa-edit"></i></a>
                                    ${blog.status === 'published' ? `<a href="../blog-detail.php?slug=${blog.slug}" target="_blank" class="admin-action" title="View"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                    <button onclick="deleteBlog('${blog.id}')" class="admin-action danger" title="Delete"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            document.getElementById('blogs-list').innerHTML = html;
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        async function deleteBlog(id) {
            if (!confirm('Are you sure you want to delete this blog post?')) return;
            
            try {
                const response = await fetch('../api/blogs.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                
                const data = await response.json();
                if (data.success) {
                    loadBlogs();
                } else {
                    alert('Error deleting blog: ' + data.message);
                }
            } catch (error) {
                alert('Error deleting blog');
            }
        }

        loadBlogs();
    </script>
</body>
</html>
