## Разработка
Репозиторий
* https://git.nuzhnapomosh.ru/td/edu

Основная ветка `master`  
* https://edu.nuzhnapomosh.ru/education/
* https://edu.nuzhnapomosh.ru/wp-admin/
    
Ветка для разработки `staging`  
* https://staging-edu.nuzhnapomosh.ru/education/
* https://staging-edu.nuzhnapomosh.ru/wp-admin/

## Отправка писем
Обычная pluggable-функция `wp_mail` отправляет письмо через [Expert Sender](https://git.nuzhnapomosh.ru/lib/php-amqp) с шаблоном 2956.    
Принимает аргументы:  
```php
/**
 * @param  string|string[]  $to
 * @param  string  $subject
 * @param  string  $message
 *
 * @see /wp-content/plugins/td-edu/pluggable.php
 */
``` 

Чтобы отправить письмо в Planfix, используется `PlanfixSender.php`
```php
/**
 * @param  string  $subject
 * @param  array  $snippets
 *
 * @see /wp-content/plugins/td-edu/classes/PlanfixSender.php
 */
```
`$subject` - тема письма, она же будет заголовком задачи  
`$snippets` - одномерный массив, который форматируется как список вида  
`ключ: значение`

### REST 
#### Поиск организации по ИНН
```php
/**
 * @url GET /wp-json/v1/search/щкп
 * 
 * @param  
 * @param  
 * @param  
 */
```

#### Покупка курса (физ.лицо)
```php
/**
 * @url GET /wp-json/v1/purchase/course
 * 
 * @param  
 * @param  
 * @param  
 */
```

#### Покупка курса (юр.лицо) - отправка формы
```php
/**
 * @url POST /wp-json/v1/purchase/course/org
 * 
 * @param  
 * @param  
 * @param  
 */
```

#### Покупка курса (юр.лицо) - курс оплачен (пост-запрос от Planfix)
```php
/**
 * @url POST /wp-json/v1/purchase/course/paid
 * 
 * @param  
 * @param  
 * @param  
 */
```

#### Перенос документа из Planfix в Google Drive (пост-запрос от Planfix)
```php
/**
 * @url POST /wp-json/v1/copy-document
 * 
 * @param  
 * @param  
 * @param  
 */
```

#### Информация о курсе
```php
/**
 * @url GET /wp-json/v1/get-course
 * 
 * @param  
 * @param  
 * @param  
 */
```

#### Проверка промокода
```php
/**
 * @url GET /wp-json/v1/get-coupon
 * 
 * @param  
 * @param  
 * @param  
 */
```
