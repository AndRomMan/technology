<?php

header('Content-Type: text/html; charset=utf-8');

// Connect to db
$without_settings = true;
require_once( 'wp-config.php' );


$mysqli = mysqli_init();
mysqli_ssl_set($mysqli, NULL, NULL, USERS_DB_SSL_CA, NULL, NULL);
mysqli_real_connect($mysqli, USERS_DB_HOST, USERS_DB_USER, USERS_DB_PASSWORD, USERS_DB_NAME );
mysqli_set_charset( $mysqli, DB_CHARSET );

// Проверка токена
if(isset($_GET['lk']) and strlen($_GET['lk']) == 40) {
    $user_info = array();

    $user_request = $mysqli->prepare( "SELECT users.firstname,users.lastname,users.email AS total
    FROM user_tokens 
    JOIN users ON users.id = user_tokens.user_id
    WHERE user_tokens.token = ? LIMIT 1");

    $user_request->bind_param("s", $_GET['lk']);
    $user_request->execute();
    $user_info = $user_request->get_result();
    $user_info = $user_info->fetch_assoc();

    $user_request->close();

    if(!empty($user_info)) {
        echo json_encode($user_info);
    } else {
        echo "none";
    }
    exit();
}

// Redirect to https login if forced to use SSL
if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off"){
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirect);
    exit();
}

function random($type = NULL, $length = 8)
{
    if ($type === NULL) {
        // Default is to generate an alphanumeric string
        $type = 'alnum';
    }

    $utf8 = FALSE;

    switch ($type) {
        case 'alnum':
            $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'alpha':
            $pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'hexdec':
            $pool = '0123456789abcdef';
            break;
        case 'numeric':
            $pool = '0123456789';
            break;
        case 'nozero':
            $pool = '123456789';
            break;
        case 'distinct':
            $pool = '2345679ACDEFHJKLMNPRSTUVWXYZ';
            break;
        default:
            $pool = (string)$type;
            $utf8 = !UTF8::is_ascii($pool);
            break;
    }

    // Split the pool into an array of characters
    $pool = ($utf8 === TRUE) ? UTF8::str_split($pool, 1) : str_split($pool, 1);

    // Largest pool key
    $max = count($pool) - 1;

    $str = '';
    for ($i = 0; $i < $length; $i++) {
        // Select a random character from the pool and add it to the string
        $str .= $pool[mt_rand(0, $max)];
    }

    // Make sure alnum strings contain at least one letter and one digit
    if ($type === 'alnum' AND $length > 1) {
        if (ctype_alpha($str)) {
            // Add a random digit
            $str[mt_rand(0, $length - 1)] = chr(mt_rand(48, 57));
        } elseif (ctype_digit($str)) {
            // Add a random letter
            $str[mt_rand(0, $length - 1)] = chr(mt_rand(65, 90));
        }
    }

    return $str;
}

header('Content-Type: application/json');

$result = [
    'status'    => false,
    'message'   => 'Ошибка, сервер не смог обработать запрос',
    'query'     => [],
    'alert'     => 'error',
    'data'      => null,
];

if (!session_id()) {
    session_start();
}

// Проверяем пользователя на наличии в БД
if(
    (isset($_GET['email']) && !empty($_GET['email'])) &&
    (isset($_GET['ssid']) && !empty($_GET['ssid']))
) {

    $user_exists = array();

    $data_request = $mysqli->prepare("SELECT id FROM users WHERE email = ? AND ssid = ? LIMIT 1");
    $data_request->bind_param("ss", $_GET['email'], $_GET['ssid']);
    $data_request->execute();

    $user_exists = $data_request->get_result();
    $user_exists = $user_exists->fetch_array(MYSQLI_NUM);
    $user_exists['id'] = array_pop($user_exists);

    $data_request->close();
}

// Если пользователь найден
if(isset($user_exists['id']) && ($user_exists['id'] != '')) {

    $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $token = sha1(uniqid(random('alnum', 32), TRUE));

    // Формируем запись в данных
    $data = array(
        'user_id'    => $user_exists['id'],
        'created'    => time(),
        'expires'    => time() + 315360000,
        'user_agent' => sha1($_SERVER['HTTP_USER_AGENT']),
        'token'      => $token
    );

    $token_insert = $mysqli->prepare("INSERT INTO user_tokens(user_id,created,expires,user_agent,token) VALUES(?,?,?,?,?)"); 
    $token_insert->bind_param("sssss", $data['user_id'], $data['created'], $data['expires'], $data['user_agent'], $data['token']);
    $token_insert->execute();
    $token_insert->close();

    setcookie("lk", $token, time() + 315360000);

    // Формируем ответ
    $result = [
        'status'    => true,
        'message'   => 'Операция прошла успешно',
        'query'     => [],
        'alert'     => 'success',
        'data'      => [
            'token' => $token
        ],
    ];

}

// Redirect from TD to NP
if (strpos($_SERVER['HTTP_HOST'], 'takiedela.ru') !== false) {
    header("Status: 301 Moved Permanently");
    header("Location: https://nuzhnapomosh.ru". $_SERVER['REQUEST_URI']);
    exit;
}

// Осуществляем перенаправление если оно нужно
if (isset($_GET['lk_ref']) && ($_GET['lk_ref'] != '')) {
    $ref = $_GET['lk_ref'];
    $ref .= (isset($_GET['url'])) ? '?referer='.$_GET['url'] : '';

    header("Location: $ref");
}
if (isset($_GET['referer']) && ($_GET['referer'] != '')) {
    $ref = $_GET['referer'];

    header("Location: $ref");
}


echo json_encode($result);
die();