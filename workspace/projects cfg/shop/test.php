<?php

$text = "test2";

		$data = json_encode([
			'channel' => '#dev-test',
			'text' => $text,
			'icon_emoji' =>  ':computer:',
			'username' => 'order'
		]);


        $ch = curl_init('https://hooks.slack.com/services/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');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, ['payload' => $data]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        print_r($http_code);
        print_r($result);