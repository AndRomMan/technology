<?php
require __DIR__ . '/vendor/autoload.php';

$client = new \NpmshAuth\Client(__DIR__);
try {
    $client->withCookie()->fetch();
} catch (Throwable $e) {
    $client->report($e);
}

echo '<style>
pre { font-size: 13px; margin: 1rem; background: #eee; border: solid 1px #ccc; border-radius: 0.25rem; padding: 1rem; }
</style>';

echo '<pre>';
echo '<strong>User</strong><hr />';
echo 'User ID: ' . ($client->getUserId() ?: 'null') . '<br />';
print_r($client->getUser());
echo '</pre>';

echo '<pre>';
echo '<strong>Cookie</strong><hr />';
print_r(array_map(function ($value) {
    if (mb_strlen($value) <= 100) {
        return $value;
    }

    return mb_substr($value, 0, 100) . '...';
}, $_COOKIE));
echo '</pre>';

$host = parse_url(\NpmshAuth\Helpers::config('API_BASEURL'), PHP_URL_HOST);
echo '<a href="https://' . $host . '/login?referer=https://' . $_SERVER['HTTP_HOST'] . '/a.php?foo=bar">Try Login</a><hr />';
