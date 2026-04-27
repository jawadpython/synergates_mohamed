-- Run once on existing databases (phpMyAdmin or mysql CLI).
-- Grants all existing admin accounts full super access; new accounts get explicit permissions from the UI.

ALTER TABLE admins
    ADD COLUMN display_name VARCHAR(128) NULL DEFAULT NULL AFTER username,
    ADD COLUMN is_super_admin TINYINT(1) NOT NULL DEFAULT 0 AFTER password_hash,
    ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER is_super_admin,
    ADD COLUMN permissions TEXT NULL COMMENT 'JSON: {"images":true,"blogs":true,...}' AFTER is_active;

-- Existing rows: keep access until you create restricted users
UPDATE admins SET is_super_admin = 1, is_active = 1 WHERE is_super_admin = 0 AND id > 0;









