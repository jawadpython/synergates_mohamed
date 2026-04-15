# cPanel Deployment Checklist

If buttons appear in wrong places or some don't show on your live site, check the following:

## 1. Upload All Folders

Upload the **entire** project structure to `public_html` (or your web root):

```
public_html/
├── index.html
├── about.html
├── contact.html
├── projects.html
├── solutions.html
├── solution-detail.html
├── css/
│   └── styles.css
├── js/
│   ├── i18n.js
│   ├── main.js
│   └── scenario-content.js
├── images/
│   ├── solution-detail/
│   │   ├── apartments/     (buldingimage.webp + photo1–9.jpg)
│   │   ├── conference-rooms/
│   │   └── ... (all scenario folders)
│   └── solutions/          (Conference Rooms.png, Hotels.png, etc.)
├── lang/
│   ├── lang-en.json
│   └── lang-fr.json
└── config/
    └── positions.json
```

## 2. Case Sensitivity (Linux)

cPanel servers use **Linux**, which is case-sensitive. File names must match exactly:

- `buldingimage.webp` (not `Buldingimage.webp`)
- `Conference Rooms.png` (not `conference rooms.png`)
- Folder: `solution-detail` (not `Solution-Detail`)

## 3. Create `images/solutions/` If Missing

The scenario diagram images (e.g. Conference Rooms.png) go in `images/solutions/`. If this folder is empty or missing, the scenario images won't load. Copy the PNG files from your local `images/solutions/` folder.

## 4. Same Folder Structure

Keep HTML files and the `images`, `css`, `js`, `lang` folders in the **same directory**. If you use a subfolder (e.g. `public_html/mysite/`), all paths will still work as long as the structure is preserved.

## 5. Loading Screen and CSS on cPanel

- **Loading screen not disappearing:** The solution-detail loader now **always** disappears after at most **4 seconds**, even if the server is slow or the `load` event does not fire. If it still sticks, hard-refresh (Ctrl+F5) and check the browser Console (F12) for script errors.
- **Buttons/layout look different on cPanel:** This usually means **Tailwind or `css/styles.css` is not loading**. In the browser:
  1. Press F12 → **Network** tab → reload the page.
  2. Check that `styles.css` and `https://cdn.tailwindcss.com` return **200** (not 404 or blocked).
  3. If your host blocks external CDNs, you may need to self-host Tailwind or allow the CDN.
  4. Keep the **exact same folder structure** (e.g. `css/styles.css` next to your HTML). Do not move HTML files into a subfolder without the `css` folder beside them.

## 6. Language Switch (EN/FR) Not Working on cPanel

The site now builds the path to `lang/lang-en.json` and `lang/lang-fr.json` relative to the **current page URL**, so it works with subfolders and query strings (e.g. `?scenario=hotels`). Ensure:

- The **`lang`** folder is uploaded with **`lang-en.json`** and **`lang-fr.json`** inside it.
- Your server allows access to `.json` files (no block in .htaccess). If language still doesn’t switch, open F12 → Network tab, click EN or FR, and check whether `lang/lang-en.json` or `lang/lang-fr.json` returns **200** or **404**.

## 7. Clear Browser Cache

After uploading, hard-refresh (Ctrl+F5 or Cmd+Shift+R) to avoid cached old files.
