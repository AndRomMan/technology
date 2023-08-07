<?php

if (isset($_POST)) {
$output = "Получена строка: " . $_POST['name'] . ' : ' . $_POST['email'] . ' : ' . $_POST['kits'][0] . $_POST['kits'][1] .  $_POST['kits'][3] . $_POST['kits'][4];
}

echo $output;

?>
