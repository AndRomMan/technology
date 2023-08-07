<?php
// отключаем проверку CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: content-type');

$output = 'Здравствуйте, пользователь! ';
if ($_SERVER['REMOTE_ADDR']) {
  $output .= 'Ваш IP адрес: '. $_SERVER['REMOTE_ADDR'];
}
else {
 $output .= 'Ваш IP адрес неизвестен.';
}
echo $output;

?>
