<?php

if (php_sapi_name() !== 'cli') {
    exit('Invalid environment, cli expected, '.php_sapi_name().' given');
}

require __DIR__.'/wp-load.php';


$ts = current_time('timestamp');
echo sprintf("%s [%d]", date('Y-m-d H:i:s', $ts), $ts).PHP_EOL;

global $wpdb;

$rows = $wpdb->get_results(
    sprintf(
        "select * from `%s` where `status` = 0 and `releases_at` between %d and %d;",
        EduJob::$table,
        $ts - QUEUE_RANGE,
        $ts
    )
);

if (empty($rows)) {
    exit('Empty jobs');
}

$ids = array_map(function ($row) {
    return $row->id;
}, $rows);

$wpdb->query(sprintf("UPDATE `%s` SET `status` = 1 WHERE `id` IN (%s);", EduJob::$table, implode(",", $ids)));
foreach ($rows as $row) {
    if ( ! class_exists($row->job)) {
        require_once $row->file;
    }

    $job = $row->job;
    $payload = json_decode($row->payload, true);

    (new $job($payload))->run($row->id);
}
