<?php

use NpmshAuth\Client;

require __DIR__ . '/vendor/autoload.php';

$client = new Client(__DIR__);

$client->withCookie()->fetch();
$user = $client->getUser(); // объект пользователя

if(isset($_GET['show'])) {
    echo json_encode($user);
} else {
    return json_encode($user);
}

