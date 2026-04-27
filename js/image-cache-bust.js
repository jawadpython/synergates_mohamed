/**
 * Cache busting for admin-replaceable images.
 * Fetches version with cache:'no-store' to bypass browser cache, then appends ?v= to image URLs.
 */
(function() {
    function getV() {
        return (typeof window.IMAGE_VERSION !== 'undefined') ? String(window.IMAGE_VERSION) : String(Date.now());
    }

    function addVersion(url) {
        if (!url || typeof url !== 'string') return url;
        if (url.indexOf('images/') === -1) return url;
        if (url.indexOf('v=') !== -1) return url;
        return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'v=' + getV();
    }

    function processImg(img) {
        var src = img.getAttribute('src') || img.src;
        if (!src || src.indexOf('images/') === -1 || src.indexOf('v=') !== -1) return;
        if (src.indexOf('solutions_frontimage') !== -1) return;
        if (src.indexOf('images/logos') !== -1) return; /* skip – client logos */
        /* solutions_frontimage – avoids flicker from src rewrite */
        var newSrc = addVersion(src);
        img.setAttribute('src', newSrc);
    }

    function run() {
        [].forEach.call(document.querySelectorAll('img[src*="images/"]'), processImg);
    }

    function startObserver() {
        var obs = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                if (m.type === 'childList' && m.addedNodes.length) {
                    m.addedNodes.forEach(function(n) {
                        if (n.nodeType === 1) {
                            if (n.tagName === 'IMG') processImg(n);
                            [].forEach.call(n.querySelectorAll ? n.querySelectorAll('img[src*="images/"]') : [], processImg);
                        }
                    });
                }
                if (m.type === 'attributes' && m.attributeName === 'src' && m.target.tagName === 'IMG') {
                    processImg(m.target);
                }
            });
        });
        obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
    }

    function init() {
        fetch('api/image-version.json.php', { cache: 'no-store' })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                window.IMAGE_VERSION = (data && data.v) ? String(data.v) : String(Date.now());
                run();
                startObserver();
                window.imgUrl = addVersion;
            })
            .catch(function() {
                window.IMAGE_VERSION = String(Date.now());
                run();
                startObserver();
                window.imgUrl = addVersion;
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
