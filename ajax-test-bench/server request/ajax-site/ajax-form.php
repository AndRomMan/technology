<?php
|// отключаем проверку CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: content-type');

// if (isset($_POST)) {
//     print("Имя: " . $_POST['name']);
//     print("<br>Email: " . $_POST['email']);
//     print("<br>Сообщение: " . $_POST['message']);
// }

// создадим переменную для формирования ответа
$output ='';

// если в массиве пост есть ключ nameUser, то
if (isset($_POST['nameUser'])) {

  // в переменную name помещаем переданное с помощью запроса имя
  $name = $_POST['nameUser'];

  // добавляем в переменную output строку приветствия с именем
  $output .= 'Здравствуйте, '.$name.'! ';
}
  // добавляем в переменную output IP-адрес пользователя
if ($_SERVER['REMOTE_ADDR']) {
  $output .= 'Ваш IP адрес: '. $_SERVER['REMOTE_ADDR'];
}

  // При отправке формы методом POST
  // данные записываются в суперглобальный массив $_POST.

  // При отправке формы методом GET
  // данные записываются в суперглобальный массив $_GET.

  // К $_POST и $_GET нужно обращаться обычным способом
  // $массив['ключ'].


  // Если мы обрабатываем форму на другой странице
  // (action="example.php"), то после нажатия кнопки
  // подтверждения вас перекинет на указанную страницу.
  // Если action пуст, то страница с формой перезагрузится.
?>
