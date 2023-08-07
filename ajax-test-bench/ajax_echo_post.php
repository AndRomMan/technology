<?php

    // $login=$_POST['login'];
    // $pass=$_POST['password'];
    // if($login=="1111" && $pass=="2222"){
    //     echo "Авторизация прошла успешно";
    // }
    // else{
    //     echo "Неверно введен логин или пароль";
    // }

// https://snipp.ru/jquery/ajax-jquery
// При работе с JSON может всплыть одна ошибка – после запроса сервер отдал результат, все хорошо, но метод success не срабатывает. Причина кроется в серверной части (PHP) т.к. перед данными могут появится управляющие символы
// Очистка буфера
  ob_end_clean();

// устанавливаем заголовок
  header('Content-Type: application/json');

if (isset($_POST)) {
$output = "Получена строка: " . $_POST['product'];
}

echo $output;

?>