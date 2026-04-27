<?php
declare(strict_types=1);
/* Canonical public blog is blog.html (static) so the browser never offers to download a .php file on hosts without PHP. */
header('Location: blog.html', true, 302);
exit;
