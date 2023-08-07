<?php
// отключаем проверку CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: content-type');

// создадим переменную для формирования ответа
$output ='';

// // если в массиве пост есть ключ nameUser, то
// if (isset($_POST['username'])) {

//   // в переменную name помещаем переданное с помощью запроса имя
//   $name = $_POST['username'];

//   // добавляем в переменную output строку приветствия с именем
//   $output .= 'Здравствуйте, '.$name.'! ';
// }


if (isset($_POST)) {
$output = "Получено: " . $_POST['product'];
}

echo $output;
?>