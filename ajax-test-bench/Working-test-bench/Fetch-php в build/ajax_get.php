<?php
 if (isset($_GET)) {
  $data_arr = ['found-1', 'found-1'];
  $data_obj = [ 'foundation' => 'Дом', 'donation' => 1000 ];

  // текстовые данные отправляются по GET запросу
  // $data_text = 'server text answer';
}
    // $data_json = json_encode($data_arr);
    $data_json = json_encode($data_obj);
    echo $data_json;

    // echo $data_text;
?>
