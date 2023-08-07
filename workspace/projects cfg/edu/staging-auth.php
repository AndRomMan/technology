<?php
require __DIR__ . '/vendor/autoload.php';

$client = new \NpmshAuth\Client(__DIR__);
$client->withCookie()->fetch();

echo '<style>
pre { font-size: 13px; margin: 1rem; background: #eee; border: solid 1px #ccc; border-radius: 0.25rem; padding: 1rem; }
</style>';

//public static function cookieDomain()
//{
//    $parts  = explode('.', $_SERVER['HTTP_HOST']);
//    $domain = array_slice($parts, -2);
//
//    return '.' . implode('.', $domain);
//}

echo 'C: ' . \NpmshAuth\Helpers::cookieDomain() . '<hr />';

echo '<pre>';
echo '<strong>User</strong><hr />';
print_r($client->getUser() ?? []);
echo '</pre>';

echo '<pre>';
echo '<strong>Cookie</strong><hr />';
print_r(array_map(function ($value) {
    if (mb_strlen($value) <= 100) {
        return $value;
    }

    return '...'.mb_substr($value, -100);
}, $_COOKIE));
echo '</pre>';
