# Admin Panel Setup Guide (cPanel)

Production-ready admin panel for your HTML/CSS/JS website. PHP 8+, MySQL, no frameworks.

## Folder Structure

```
your-site/                    (document root, e.g. public_html)
├── index.html
├── about.html
├── contact.html
├── solutions.html
├── projects.html
├── faq.html
├── css/
├── js/
│   ├── main.js
│   ├── i18n.js
│   └── content-loader.js    ← loads dynamic content from API
├── images/
├── lang/
├── api/                      ← API endpoints
│   ├── db.php               ← PDO connection
│   ├── content.php          ← GET/POST page content
│   ├── upload.php           ← Secure image upload (admin only)
│   ├── schema.sql           ← MySQL schema
│   └── .htaccess
├── admin/                    ← Admin panel (protected)
│   ├── login.php
│   ├── logout.php
│   ├── dashboard.php
│   ├── require_auth.php     ← Session check (included by dashboard)
│   └── .htaccess
├── config/                   ← Database config (keep private)
│   ├── database.php
│   └── .htaccess            ← Deny direct access
├── uploads/                  ← Uploaded images (created automatically)
│   └── .htaccess
└── lib/
    └── security.php         ← XSS sanitization, validation
```

## Installation Steps

### 1. Create MySQL Database (cPanel)

1. Go to **MySQL Databases**
2. Create database: `site_db`
3. Create user: `site_user` with a strong password
4. Add user to database with **ALL PRIVILEGES**
5. Run the schema: open **phpMyAdmin** → select `site_db` → **Import** → choose `api/schema.sql`

### 2. Configure Database

Edit `config/database.php`:

```php
return [
    'host'     => 'localhost',
    'dbname'   => 'site_db',
    'username' => 'site_user',
    'password' => 'YOUR_MYSQL_PASSWORD',
    'charset'  => 'utf8mb4',
];
```

### 3. Default Admin Credentials

- **Username:** `admin`
- **Password:** `ChangeMe123!`

**Change this immediately** after first login. Use phpMyAdmin to update:

```sql
UPDATE admins SET password_hash = 'NEW_HASH' WHERE username = 'admin';
```

Generate new hash:
```bash
php -r "echo password_hash('YourNewPassword', PASSWORD_DEFAULT);"
```

### 4. File Permissions

- `uploads/` – writable by web server (755 or 775)
- `config/` – readable by PHP, not web-accessible (`.htaccess` denies direct access)

### 5. Add Dynamic Content to Pages

Add `data-page-slug` and `data-content-target` to elements that should load from the API:

```html
<div data-page-slug="about" data-content-target>
    <!-- Fallback static content here -->
</div>
```

Create pages in the admin dashboard (slug: `about`, `index`, `contact`, etc.).

## Security Features

- **Password hashing:** `password_hash()` / `password_verify()` (bcrypt)
- **Sessions:** HttpOnly, Secure (when HTTPS), SameSite=Lax
- **Prepared statements:** All DB queries use PDO prepared statements
- **XSS:** `htmlspecialchars()` for plain text, `strip_tags()` with allowlist for HTML
- **Image upload:** MIME validation, extension whitelist (jpg, png, gif, webp), 5MB limit
- **Admin routes:** Protected via `require_auth.php` session check

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/content.php?slug=X&lang=Y` | GET | No | Fetch page content |
| `/api/content.php` | POST | Admin | Create/update page |
| `/api/upload.php` | POST | Admin | Upload image (field: `image`) |

## Troubleshooting

- **500 on API:** Check `config/database.php` credentials and that `site_db` exists
- **404 on content:** Ensure page exists in admin with matching slug
- **Upload fails:** Verify `uploads/` exists and is writable
