<?php
// отключаем проверку CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
// header('Content-Type: text/html; charset=utf-8');
// header('Access-Control-Allow-Headers: content-type');
header( "Content-type: application/json" );

 mb_internal_encoding ("utf-8");

  $arr = [
        [ 'name' => 'Тест 1',
          'description' => 'test description',
          'correct'  => 'a,b,c,d,e,f',
        ],
        [ 'name' => 'Test 1',
          'description' => 'описание теста',
          'correct'  => 'a,b,c,d,e,f',
        ],
     ];

$data_json = json_encode($arr);
echo $data_json;

?>
