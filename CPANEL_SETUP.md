# Simple cPanel Setup (5 Steps)

## 1. Create MySQL Database

1. Log in to **cPanel** → **MySQL® Databases**
2. **Create Database:** name it `site_db` (cPanel may add a prefix like `youruser_site_db`)
3. **Create User:** username `site_user`, password `SecurKhribech2026`
4. **Add User to Database:** select both → **Add** → check **ALL PRIVILEGES** → **Make Changes**

> If cPanel adds a prefix (e.g. `youruser_`), update `config/database.php` to use the full names: `youruser_site_db` and `youruser_site_user`.

## 2. Import the Schema

1. Open **phpMyAdmin** (in cPanel)
2. Click your database (`site_db` or `youruser_site_db`)
3. Go to **Import** tab
4. **Choose File** → select `api/schema.sql` from your project
5. Click **Go**

## 3. Upload Your Files

1. Open **File Manager** in cPanel
2. Go to `public_html` (or your domain’s folder)
3. Upload the whole project (or drag the folder contents into `public_html`)

## 4. Set Permissions

1. Right‑click the `uploads` folder → **Change Permissions**
2. Set to **755** (or **775** if uploads fail)

## 5. Log In to Admin

1. Visit: `https://yoursite.com/admin/login.php`
2. **Username:** `admin`
3. **Password:** `ChangeMe123!`
4. Change the password after the first login.

## 6. Edit Solution Page Buttons

1. After login, click **Edit Solution Buttons** in the dashboard (or go to any solution page, e.g. `solution-detail.html?scenario=hotels`)
2. You'll see **Enable editing** and **Save positions to server** (only when logged in as admin)
3. Click **Enable editing**, then **drag the buttons** on the diagram to reposition them
4. Click **Save positions to server** when done

---

**If the database name has a prefix** (e.g. `abc123_site_db`), edit `config/database.php`:

```php
'dbname'   => 'abc123_site_db',
'username' => 'abc123_site_user',
```
