<?php

$json = '{"currentDonation":1,"newFoundationPercent":2,"newHelpUsPercent":3}';


if (isset($_POST)) {
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
$output = json_encode($data);

$output = 'done';
}

echo $output;

?>
