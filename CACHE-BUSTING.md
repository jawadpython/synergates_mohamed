# Cache-Busting Guide

This project uses query-string versioning to ensure browsers load fresh CSS/JS after deployments.

## How It Works

- **CSS/JS URLs** include `?v=1.0.0` (e.g. `css/styles.css?v=1.0.0`)
- When you change assets, **bump the version** in all HTML files
- Browsers treat `styles.css?v=1.0.1` as a new URL and fetch fresh content
- **CDN assets** (Tailwind, Font Awesome) are already versioned in their URLs

## Deploying Updates

1. Edit CSS or JS files as needed
2. Update the version in **all HTML files**: change `?v=1.0.0` → `?v=1.0.1` (or `1.1.0`, etc.)
3. Update `config/asset-version.txt` to match (for your records)
4. Upload to cPanel

**Quick find-replace:** Search for `?v=1.0.0` and replace with `?v=1.0.1` across all `.html` files.

## Development Mode (Disable Caching)

To force the browser to always fetch the latest assets during development:

1. Create an empty file named `dev.flag` in your document root (same folder as index.html)
2. The `.htaccess` will set `Cache-Control: no-cache` for all requests
3. **Remove `dev.flag` before deploying to production** (or add it to .gitignore)

## HTTP Cache Headers (Production)

| Resource      | Cache-Control                          | Why |
|---------------|----------------------------------------|-----|
| HTML          | no-cache, must-revalidate              | Users always get latest page (with new asset URLs) |
| CSS/JS (?v=)  | max-age=31536000, immutable            | Version in URL = safe to cache 1 year |
| Images        | no-cache, must-revalidate              | Admin-replaced images show immediately |
| image-version.js | no-cache, must-revalidate           | Bumped when admin replaces images; URL cache busting |

## Service Worker

This site does **not** use a service worker. If you add one later, ensure it does not cache HTML or versioned assets aggressively, or implement a version check in the SW.
