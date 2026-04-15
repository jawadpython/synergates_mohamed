/**
 * Enterprise i18n - JSON-based multilingual system
 * Loads translations dynamically, supports data-i18n keys
 */
(function () {
    'use strict';

    const STORAGE_KEY = 'synergates-lang';
    const DEFAULT_LANG = 'fr';
    const SUPPORTED_LANGS = ['en', 'fr'];

    let translations = {};
    let currentLang = DEFAULT_LANG;

    /**
     * Get nested value from object by dot path
     */
    function getNested(obj, path) {
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
            if (result == null) return undefined;
            result = result[key];
        }
        return result;
    }

    /**
     * Load translation file. Uses window.__SITE_BASE__ (set in each HTML) for cPanel/subfolders,
     * else falls back to pathname-based directory. Logs URL and errors so console shows something.
     */
    async function loadTranslations(lang) {
        const fileName = 'lang-' + lang + '.json';
        let base = window.__SITE_BASE__;
        if (typeof base !== 'string' || !base.length) {
            const path = window.location.pathname || '/';
            const dir = path.substring(0, path.lastIndexOf('/') + 1) || '/';
            base = window.location.origin + dir;
        }
        if (base.charAt(base.length - 1) !== '/') base += '/';
        const url = base + 'lang/' + fileName;
        if (typeof console !== 'undefined' && console.log) console.log('i18n: loading', url);
        try {
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) {
                if (typeof console !== 'undefined' && console.warn) console.warn('i18n: HTTP ' + response.status, url);
                if (lang !== 'en') return loadTranslations('en');
                return {};
            }
            const data = await response.json();
            return data && typeof data === 'object' ? data : {};
        } catch (err) {
            if (typeof console !== 'undefined' && console.warn) console.warn('i18n: Failed to load', url, err.message || err);
            if (window.location.protocol === 'file:') {
                if (typeof console !== 'undefined' && console.warn) console.warn('i18n: Run a local server for translations to work.');
            }
            if (lang !== 'en') return loadTranslations('en');
            return {};
        }
    }

    /**
     * Translate a key (supports nested: "common.home")
     */
    function t(key) {
        const value = getNested(translations, key);
        return value != null ? String(value) : key;
    }

    /**
     * Apply translations to DOM
     */
    function applyTranslations() {
        document.documentElement.lang = currentLang;

        // data-i18n: text content (use textContent to avoid wiping child nodes e.g. nav icons)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = t(key);
            if (value !== key) {
                if (typeof value === 'string' && value.indexOf('<') !== -1) {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            }
        });

        // data-i18n-placeholder: input placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = t(key);
            if (value !== key) el.placeholder = value;
        });

        // data-i18n-alt: img alt
        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            const value = t(key);
            if (value !== key) el.alt = value;
        });

        // data-i18n-attr: "attr:key" for title, aria-label, etc.
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const spec = el.getAttribute('data-i18n-attr');
            const [attr, key] = spec.split(':');
            if (attr && key) {
                const value = t(key.trim());
                if (value !== key) el.setAttribute(attr.trim(), value);
            }
        });

        // data-i18n-options: select options (JSON array of {value, key})
        document.querySelectorAll('[data-i18n-options]').forEach(el => {
            if (el.tagName !== 'SELECT') return;
            const options = JSON.parse(el.getAttribute('data-i18n-options') || '[]');
            options.forEach(opt => {
                const option = el.querySelector(`option[value="${opt.value}"]`);
                if (option && opt.key) {
                    const text = t(opt.key);
                    if (text !== opt.key) option.textContent = text;
                }
            });
        });

        // Update meta description and title if present
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && metaDesc.getAttribute('data-i18n')) {
            const v = t(metaDesc.getAttribute('data-i18n'));
            if (v) metaDesc.setAttribute('content', v);
        }
        const titleEl = document.querySelector('title[data-i18n]');
        if (titleEl) {
            const v = t(titleEl.getAttribute('data-i18n'));
            if (v) document.title = v;
        }

        // Update language toggle buttons
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            const lang = btn.getAttribute('data-lang-btn');
            btn.classList.toggle('font-semibold', lang === currentLang);
            btn.classList.toggle('text-blue-600', lang === currentLang);
            btn.classList.toggle('opacity-70', lang !== currentLang);
        });
    }

    /**
     * Switch language and re-apply
     */
    async function setLanguage(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
        currentLang = lang;
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {}
        translations = await loadTranslations(lang);
        document.documentElement.classList.add('lang-switching');
        applyTranslations();
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                document.documentElement.classList.remove('lang-switching');
            });
        });
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    /**
     * Initialize i18n
     */
    async function init() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            currentLang = SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG;
        } catch (e) {}
        translations = await loadTranslations(currentLang);
        document.documentElement.classList.add('lang-switching');
        applyTranslations();
        document.documentElement.classList.add('i18n-ready');
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                document.documentElement.classList.remove('lang-switching');
            });
        });
    }

    // Public API
    window.i18n = {
        init,
        setLanguage,
        t,
        applyTranslations,
        get currentLang() { return currentLang; },
        get supportedLangs() { return [...SUPPORTED_LANGS]; }
    };
})();
