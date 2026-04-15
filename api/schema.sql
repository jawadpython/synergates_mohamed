-- MySQL schema for admin panel and editable pages
-- Run this in phpMyAdmin or MySQL CLI after creating database site_db and user site_user

-- Admins table (secure login)
CREATE TABLE IF NOT EXISTS admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pages table (editable content)
CREATE TABLE IF NOT EXISTS pages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(128) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    lang VARCHAR(8) NOT NULL DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_slug_lang (slug, lang),
    INDEX idx_slug_lang (slug, lang)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default admin: username 'admin', password 'ChangeMe123!' (change immediately after first login)
-- Generate new hash: php -r "echo password_hash('YourNewPassword', PASSWORD_DEFAULT);"
INSERT INTO admins (username, password_hash) VALUES
('admin', '$2y$12$BgNmMBG01qSzyBdEYJux3eR2HfJQ5aAZOvbQK3MGl3DrqRQECSaua')
ON DUPLICATE KEY UPDATE username = username;
