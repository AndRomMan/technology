[TOC]

# Pagination

PHP-версия:

1. Подключить php-шаблон `@utils/pagination/tpl-php/index.php`. Шаблон принимает два параметра:

- `$total` – общее количество страниц
- `$currentPage` – номер текущей страницы

2. Инициализировать js-функцию `new NPPaginationComponentJs()`. Функция принимает следующие параметры:

- `total` - `0` – общее количество страниц. Можно указать в случае, если общее количество страниц будет известно после ajax-запроса
- `currentPage` - `1` – номер текущей страницы. Можно указать в случае, если требуется сделать запрос исходя из GET-параметра
- `showPaging` – `true` - показывать или нет нумерованный список
- `showLoadMore` – `true` - показывать или нет кнопку "Загрузить ещё"
- `pagination` – `.js-np-pagination` - селектор для инициализации пагинации
- `loadMoreText` – `Загрузить ещё` – текст в кнопке подгрузки элементов
- `reloadPage` – `false` - перезагружать страницу при клике по ссылке или нет (не работает для мобильной версии, нужна обработка)
- `pageUrl` – `?page=` - параметр для ссылки перехода
- `changePageCallback` – `false` - функция, которая вызывается при смене страницы

Пример вызова:

```javascript
  const paginationComponentJs = new NPPaginationComponentJs();
  paginationComponentJs.loadMoreText = 'Подгрузить комментарии';
  const loadNewPage = (newPage, loadMore) => {
      // переходим на страницу
      console.log(newPage);
      if (loadMore) {
          // Подгружаем еще результаты
          setTimeout(() => {
              // Эмуляция разблокирования кнопки после успешной подгрузки
              paginationComponentJs.unblockLoadMore();
          }, 2000);
      }
  };
  // вызов инициализации пагинации
  paginationComponentJs.init(loadNewPage);
