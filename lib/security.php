<?php
/**
 * Security utilities: XSS sanitization, input validation
 */
declare(strict_types=1);

/**
 * Sanitize HTML for safe output (allows safe tags for rich content)
 * Use for content that may contain HTML from admin.
 */
function sanitize_html(string $html): string
{
    $allowed = '<p><br><strong><em><u><a><ul><ol><li><h1><h2><h3><h4><h5><h6><span><div><img><table><tr><td><th><tbody><thead><section><header><footer><nav><style><i>';
    return strip_tags($html, $allowed);
}

/**
 * Sanitize string for plain text output (no HTML)
 */
function sanitize_plain(string $str): string
{
    return htmlspecialchars($str, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

/**
 * Sanitize slug (alphanumeric, hyphen, underscore)
 */
function sanitize_slug(string $slug): string
{
    $slug = preg_replace('/[^a-zA-Z0-9\-_]/', '', $slug);
    return substr($slug, 0, 128);
}
