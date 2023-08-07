<!-- PHP Tricks -->

# PHP Tip & Tricks

[TOC]

***

## Сокращенное написание echo

```php
<?php echo($text) ?>

<?= $text ?>
```

## Файлы PHP

### Подключение файлов в php

```php
<?php include ('./blocks/site-footer.php'); ?>
```

### Режим отладки

* файл конфигурации в корневой директории проекта

```bash
OpenServer\domains\edu.npmsh.local\wp-config.php 
```

* Установить режим отладки
`define('WP_DEBUG', true);`

* Отключить логирование ошибок в футере
`define('WP_LOCAL_DEV', false);`
`define('WP_DEBUG_LOG', false);`
`define('WP_DEBUG_DISPLAY', false);`

## Поиск контроллера для заданного шаблона

Вот эта стока загружает шаблон affiliate_approve.twig,
находящийся в папке templates в подпапке mail

```php
$this->load->view('mail/affiliate_approve', $data)
```

## Вывод данных из контроллера

**Обязательно в админке делать сброс кэша.**

* админка - модули/расширения - модификаторы
* кнопка с круглыми стрелками - правый верхний угол

```php
        echo '<div style="position: width: 50%; z-index: 100; top: 200px; background-color: rgba(12, 128, 128, .8); absolute; display: block;"><pre>';
        var_dump('====== $data ======');
        var_dump($data);
        echo '<br>';
        echo '<br>';
```

```php
        echo '<div style="position: width: 50%; z-index: 100; top: 200px; background-color: rgba(12, 128, 128, .8); absolute; display: block;"><pre>';
        var_dump('====== $data ======');
        var_dump('---------- $data[  preorder  ]');
        var_dump($data['preorder']);
        echo '<br>';

        var_dump('---------- $data[  price  ] Цена без скидки');
        var_dump($data['price']);
        echo '<br>';

        var_dump('---------- $data[  special  ] Цена со скидкой');
        var_dump($data['special']);
        echo '<br>';

        var_dump('---------- $data[  select_exist  ]');
        var_dump($data["select_exist"]);
        echo '<br>';

        var_dump('---------- $data[  options  ]');
        var_dump($data['options']);
        echo '<br>';

        var_dump('---------- $data[options][0][product_option_value][n][option_name]');
        var_dump($data['options'][0]['product_option_value'][0]["option_name"]);
        echo '<br>';

        var_dump('---------- $data[  attribute_groups  ]');
        var_dump($data['attribute_groups']);
        echo '<br>';

        var_dump('---------- $data[  attribute_groups[0]  ]');
        var_dump($data['attribute_groups'][0]);
        echo '<br>';

        var_dump('---------- $data[  manufacturer_info  ]');
        var_dump($data['manufacturer_info']);
        echo '<br>';

        var_dump('---------- $data[  points  ]');
         var_dump($data['points']);
        echo '<br>';
```

```php

// product.php
// #VAR_DUMP: вывод в карточке товара
var_dump('====== $data [digital] ======');
var_dump($data['digital']);
        echo '<br>';

var_dump('====== $data [digital_only] ======');
var_dump($data['digital_only']);
        echo '<br>';

var_dump($data['products']);
        echo '<br>';
```

```php

// category.php
// #VAR_DUMP: вывод в каталоге
var_dump('====== [ preorder ] -> [ data_it ] = ');
var_dump($data['preorder']);
echo '<br>';

var_dump('====== $data [products] ');
var_dump($data['products']);
echo '<br>';

var_dump('======================== product_id');
var_dump($data['products'][0]['product_id']);
echo '<br>';

var_dump('====== quantity ');
var_dump($data['products'][0]['quantity']);

var_dump('====== [digital]');
var_dump($data['products'][0]['digital']);

var_dump('====== [digital_only]');
var_dump($data['products'][0]['digital_only']);
echo '<br>';

```
