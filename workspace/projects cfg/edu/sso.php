<?php
require __DIR__ . '/vendor/autoload.php';

$client = new \NpmshAuth\Client(__DIR__);
$client->listenForAuth($_SERVER['HTTP_HOST']);
