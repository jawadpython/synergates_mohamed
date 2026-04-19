<?php
$blogsFile = __DIR__ . '/data/blogs.json';
$blogs = [];
if (file_exists($blogsFile)) {
    $all = json_decode(file_get_contents($blogsFile), true);
    if (is_array($all)) {
        $blogs = array_values(array_filter($all, function($b) { return ($b['status'] ?? '') === 'published'; }));
        usort($blogs, function($a, $b) { return strtotime($b['created_at'] ?? 0) - strtotime($a['created_at'] ?? 0); });
    }
}
$blogsJson = json_encode($blogs, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="SYNERGATES Blog - Articles et actualités sur la sécurité électronique et les solutions technologiques">
    <title>Blog - SYNERGATES</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/tailwind-built.css?v=1.0.56">
    <link rel="stylesheet" href="css/styles.css?v=1.0.56">
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>
    <style>
        .blog-card { transition: box-shadow 0.2s ease; }
        .blog-card:hover { box-shadow: 0 8px 20px -6px rgba(0,0,0,0.12); }
        .featured-card { transition: box-shadow 0.2s ease; }
        .featured-card:hover { box-shadow: 0 12px 30px -8px rgba(0,0,0,0.15); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .category-badge { letter-spacing: 0.05em; }
    </style>
    <script>window.__SITE_BASE__=window.location.origin+((window.location.pathname.substring(0,window.location.pathname.lastIndexOf('/')+1))||'/');if(window.__SITE_BASE__.length&&window.__SITE_BASE__.slice(-1)!=='/')window.__SITE_BASE__+='/';</script>
    <script>window.__BLOGS_PRELOAD__=<?php echo $blogsJson; ?>;</script>
</head>
<body class="bg-gray-50">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <!-- Navigation -->
    <nav class="site-nav nav-over-hero fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center flex-shrink-0">
                    <a href="index.html" class="flex items-center space-x-3">
                        <img src="images/websitelogo.png" alt="SYNERGATES" class="nav-logo h-10 w-auto">
                    </a>
                </div>
                <div class="nav-desktop hidden md:flex items-center space-x-5 flex-nowrap">
                    <a href="index.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.home">Accueil</a>
                    <a href="solutions.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.solutions">Solutions</a>
                    <a href="projects.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.projects">Projets</a>
                    <a href="about.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.about">À propos</a>
                    <a href="blog.php" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.blog">Blog</a>
                    <a href="contact.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.contact">Contact</a>
                    <a href="faq.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.faq">FAQ</a>
                    <div class="flex items-center gap-2 ml-1 flex-shrink-0" role="group" aria-label="Language">
                        <button type="button" data-lang-btn="en" class="lang-btn px-2 py-1 text-sm rounded hover:bg-gray-100">EN</button>
                        <span class="text-gray-400">|</span>
                        <button type="button" data-lang-btn="fr" class="lang-btn px-2 py-1 text-sm rounded hover:bg-gray-100">FR</button>
                    </div>
                    <a href="tel:+212522096855" class="nav-link ml-2 text-gray-700 hover:text-gray-900 font-medium flex-shrink-0 whitespace-nowrap"><i class="fas fa-phone mr-1"></i><span class="nav-phone">+212 522 09 68 55</span></a>
                </div>
                <button id="mobile-menu-btn" class="nav-mobile-btn md:hidden focus:outline-none p-2" aria-label="Toggle menu">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200">
            <div class="px-4 pt-2 pb-4 space-y-1">
                <a href="index.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.home">Accueil</a>
                <a href="solutions.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.solutions">Solutions</a>
                <a href="projects.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.projects">Projets</a>
                <a href="about.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.about">À propos</a>
                <a href="blog.php" class="block px-4 py-2.5 text-blue-700 font-medium text-sm" data-i18n="common.blog">Blog</a>
                <a href="contact.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.contact">Contact</a>
                <a href="faq.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.faq">FAQ</a>
                <div class="flex justify-center gap-2 py-2">
                    <button type="button" data-lang-btn="en" class="lang-btn px-3 py-1 text-sm rounded">EN</button>
                    <button type="button" data-lang-btn="fr" class="lang-btn px-3 py-1 text-sm rounded">FR</button>
                </div>
                <a href="tel:+212522096855" class="block px-4 py-2.5 text-center font-medium text-sm">+212 522 09 68 55</a>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <section id="main-content" class="reveal-up pt-24 pb-16 bg-white border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl">
                <p class="text-sm text-gray-400 uppercase tracking-wider mb-4" data-i18n="blog.metaLabel">Actualités & Insights</p>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-i18n="blog.title">Blog</h1>
                <p class="text-lg text-gray-500 leading-relaxed" data-i18n="blog.subtitle">Découvrez nos articles sur la sécurité électronique, les technologies d'infrastructure et les tendances du secteur.</p>
            </div>
        </div>
    </section>

    <!-- Featured Article -->
    <section id="featured-section" class="py-12 bg-white hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="featured-article"></div>
        </div>
    </section>

    <!-- Blog Grid -->
    <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-xl font-semibold text-gray-900" data-i18n="blog.allArticles">Tous les articles</h2>
            </div>
            <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="col-span-full text-center py-16">
                    <div class="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                        <i class="fas fa-spinner fa-spin text-gray-400"></i>
                    </div>
                    <p class="text-gray-500" data-i18n="blog.loading">Chargement des articles...</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="reveal-up cta-strip-premium py-20 md:py-24 bg-blue-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="cta-strip-title text-3xl md:text-4xl font-bold text-white mb-5" data-i18n="blog.ctaTitle">Une question sur nos solutions ?</h2>
            <p class="text-blue-100 mb-10 max-w-2xl mx-auto" data-i18n="blog.ctaSubtitle">Notre équipe est à votre disposition pour discuter de vos projets et répondre à vos questions.</p>
            <a href="contact.html" class="cta-strip-btn inline-flex items-center justify-center bg-white text-blue-700 px-8 py-3.5 rounded font-semibold hover:bg-gray-50 transition-all text-base" data-i18n="blog.contactUs">
                Contactez-nous
                <i class="fas fa-arrow-right ml-2"></i>
            </a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="home-footer-dark border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                <div>
                    <div class="flex items-center space-x-3 mb-4">
                        <img src="images/websitelogo.png" alt="SYNERGATES" class="h-8 w-auto">
                    </div>
                    <p class="text-gray-500 mb-5 text-sm leading-relaxed" data-i18n="common.footerDesc">Intégrateur de solutions technologiques au Maroc et en Afrique.</p>
                    <div class="flex space-x-3">
                        <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    </div>
                </div>
                <div>
                    <h3 class="text-gray-900 font-semibold text-sm mb-4">Liens rapides</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="solutions.html" class="text-gray-500 hover:text-gray-700 transition-colors">Solutions</a></li>
                        <li><a href="projects.html" class="text-gray-500 hover:text-gray-700 transition-colors">Projets</a></li>
                        <li><a href="about.html" class="text-gray-500 hover:text-gray-700 transition-colors" data-i18n="common.about">À propos</a></li>
                        <li><a href="blog.php" class="text-gray-500 hover:text-gray-700 transition-colors" data-i18n="common.blog">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-gray-900 font-semibold text-sm mb-4">Solutions</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="solutions.html" class="text-gray-500 hover:text-gray-700 transition-colors" data-i18n="about.expertise1">Vidéosurveillance</a></li>
                        <li><a href="solutions.html" class="text-gray-500 hover:text-gray-700 transition-colors" data-i18n="about.expertise2">Contrôle d'accès</a></li>
                        <li><a href="solutions.html" class="text-gray-500 hover:text-gray-700 transition-colors" data-i18n="about.expertise4">Infrastructure réseau</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-gray-900 font-semibold text-sm mb-4">Contact</h3>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-start">
                            <i class="fas fa-map-marker-alt mr-2 mt-1 text-gray-400 text-xs"></i>
                            <span class="text-gray-500" data-i18n="common.address">144 Rue M Smiha, Casablanca</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-phone mr-2 text-gray-400 text-xs"></i>
                            <a href="tel:+212522096855" class="text-gray-500 hover:text-gray-700">+212 522 09 68 55</a>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-envelope mr-2 text-gray-400 text-xs"></i>
                            <a href="mailto:info@synergates.ma" class="text-gray-500 hover:text-gray-700">info@synergates.ma</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-200 pt-6">
                <div class="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p data-i18n="footer.copyright">© 2025 SYNERGATES. Tous droits réservés.</p>
                </div>
            </div>
        </div>
    </footer>

    <script>
        const STORAGE_KEY = 'synergates-lang';
        function getLang() { return localStorage.getItem(STORAGE_KEY) || document.documentElement.lang || 'fr'; }
        function getByLang(blog, key) {
            const isFr = getLang() === 'fr';
            const frVal = blog[key + '_fr'];
            const enVal = blog[key + '_en'];
            const leg = blog[key];
            return isFr ? (frVal || enVal || leg) : (enVal || frVal || leg);
        }
        function getReadingTime(content) {
            if (!content) return 0;
            const text = (typeof content === 'string' ? content : '').replace(/<[^>]*>/g, '');
            return Math.max(1, Math.ceil((text.split(/\s+/).length || 1) / 200));
        }
        function escapeHtml(text) { const d = document.createElement('div'); d.textContent = text || ''; return d.innerHTML; }
        function stripHtml(html) { const t = document.createElement('div'); t.innerHTML = html || ''; return t.textContent || t.innerText || ''; }

        function loadBlogs() {
            const grid = document.getElementById('blog-grid');
            if (!grid) return;
            const blogs = Array.isArray(window.__BLOGS_PRELOAD__) ? window.__BLOGS_PRELOAD__ : [];
            const t = (window.i18n && window.i18n.t) ? window.i18n.t.bind(window.i18n) : (k) => k;
            const minReadKey = 'blog.minRead', readArticleKey = 'blog.readArticle', readKey = 'blog.read';

            if (blogs.length > 0) {
                const featured = blogs[0];
                const featTitle = getByLang(featured, 'title');
                const featExcerpt = getByLang(featured, 'excerpt');
                const featContent = getByLang(featured, 'content');
                const featDate = new Date(featured.created_at).toLocaleDateString(getLang() === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                const featuredExcerpt = featExcerpt || stripHtml(featContent).substring(0, 200) + '...';
                const featuredImage = featured.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 400%22%3E%3Crect fill=%22%231e293b%22 width=%22800%22 height=%22400%22/%3E%3C/svg%3E';
                document.getElementById('featured-article').innerHTML = '<a href="blog-detail.php?slug=' + featured.slug + '" class="featured-card block bg-gray-900 rounded-xl overflow-hidden transition-all duration-300"><div class="grid md:grid-cols-2 gap-0"><div class="relative aspect-[4/3] md:aspect-auto overflow-hidden"><img src="' + escapeHtml(featuredImage) + '" alt="' + escapeHtml(featTitle) + '" class="absolute inset-0 w-full h-full object-cover" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 400%22%3E%3Crect fill=%22%231e293b%22 width=%22800%22 height=%22400%22/%3E%3C/svg%3E\'"><div class="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent md:hidden"></div></div><div class="p-8 md:p-12 flex flex-col justify-center"><div class="flex items-center gap-3 mb-4"><span class="category-badge inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded uppercase">' + escapeHtml(featured.category) + '</span><span class="text-gray-400 text-sm">' + getReadingTime(featContent) + ' ' + t(minReadKey) + '</span></div><h2 class="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">' + escapeHtml(featTitle) + '</h2><p class="text-gray-400 mb-6 line-clamp-3">' + escapeHtml(featuredExcerpt) + '</p><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center"><i class="fas fa-user text-gray-400 text-sm"></i></div><div><p class="text-white text-sm font-medium">' + escapeHtml(featured.author) + '</p><p class="text-gray-500 text-xs">' + featDate + '</p></div></div><span class="text-white font-medium text-sm flex items-center gap-2">' + t(readArticleKey) + ' <i class="fas fa-arrow-right"></i></span></div></div></div></a>';
                document.getElementById('featured-section').classList.remove('hidden');
            }

            const gridBlogs = blogs.length > 1 ? blogs.slice(1) : blogs;
            if (gridBlogs.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-20"><div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6"><i class="fas fa-newspaper text-2xl text-gray-400"></i></div><h3 class="text-xl font-semibold text-gray-900 mb-2">' + t('blog.noArticles') + '</h3><p class="text-gray-500">' + t('blog.noArticlesSub') + '</p></div>';
                return;
            }

            const locale = getLang() === 'fr' ? 'fr-FR' : 'en-US';
            grid.innerHTML = gridBlogs.map(blog => {
                const title = getByLang(blog, 'title');
                const excerpt = getByLang(blog, 'excerpt') || stripHtml(getByLang(blog, 'content')).substring(0, 120) + '...';
                const date = new Date(blog.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
                const image = blog.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22%3E%3Crect fill=%22%23f1f5f9%22 width=%22400%22 height=%22225%22/%3E%3C/svg%3E';
                const readTime = getReadingTime(getByLang(blog, 'content'));
                return '<article class="blog-card bg-white rounded-xl overflow-hidden shadow-sm"><a href="blog-detail.php?slug=' + blog.slug + '" class="block"><div class="relative aspect-[16/10] overflow-hidden bg-gray-100"><img src="' + escapeHtml(image) + '" alt="' + escapeHtml(title) + '" class="w-full h-full object-cover" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22%3E%3Crect fill=%22%23f1f5f9%22 width=%22400%22 height=%22225%22/%3E%3C/svg%3E\'"><div class="absolute top-4 left-4"><span class="category-badge inline-block px-2.5 py-1 bg-white/95 backdrop-blur text-gray-700 text-xs font-semibold rounded uppercase shadow-sm">' + escapeHtml(blog.category) + '</span></div></div></a><div class="p-6"><div class="flex items-center gap-2 text-xs text-gray-400 mb-3"><span>' + date + '</span><span>•</span><span>' + readTime + ' ' + t(minReadKey) + '</span></div><a href="blog-detail.php?slug=' + blog.slug + '" class="block group"><h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">' + escapeHtml(title) + '</h3></a><p class="text-sm text-gray-500 mb-4 line-clamp-2">' + escapeHtml(excerpt) + '</p><div class="flex items-center justify-between pt-4 border-t border-gray-100"><div class="flex items-center gap-2"><div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"><i class="fas fa-user text-gray-400 text-xs"></i></div><span class="text-sm text-gray-600 font-medium">' + escapeHtml(blog.author) + '</span></div><a href="blog-detail.php?slug=' + blog.slug + '" class="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">' + t(readKey) + ' <i class="fas fa-arrow-right text-xs"></i></a></div></div></article>';
            }).join('');
        }

        loadBlogs();
        document.addEventListener('languageChanged', function() { loadBlogs(); });
    </script>
    <script src="js/i18n.js?v=1.0.2"></script>
    <script src="js/main.js?v=1.0.9"></script>
</body>
</html>
