<?php
/**
 * Database configuration for cPanel MySQL
 * cPanel adds a prefix to db/user (e.g. youruser_site_db) - use full names if needed.
 */
return [
    'host'     => 'localhost',
    'dbname'   => 'synerid0_site_db',      // or youruser_site_db if cPanel adds prefix
    'username' => 'synerid0_site_user',    // or youruser_site_user
    'password' => 'SecurSiteUser2050',
    'charset'  => 'utf8mb4',
];
