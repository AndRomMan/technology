<?php
// https://snipp.ru/jquery/ajax-jquery
// При работе с JSON может всплыть одна ошибка – после запроса сервер отдал результат, все хорошо, но метод success не срабатывает. Причина кроется в серверной части (PHP) т.к. перед данными могут появится управляющие символы
// Очистка буфера
  ob_end_clean();
// устанавливаем заголовок
  // header('Content-Type: application/json');
  // mb_internal_encoding ("utf-8");

 if (isset($_GET)) {
  $input = $_GET['userData'];

  $output = $input;
  // $output = 'GET ECHO';
}

echo $output;

?>