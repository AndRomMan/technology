[TOC]

#### исправление отображения лого в IE11

___по умолчанию будет изображение формата desktop___

```html
 <a class="header__link header__logo">
  <picture>
    ...
      <img src="img/logo_desk@1x.png" srcset="img/logo_desk@2x.png 2x" alt="Smart Device" width="202" height="52">
  </picture>
</a>
```

#### исправление отображения контентных изображений в IE11

___по умолчанию будет изображение формата desktop___

```
<picture>
  ...
    <img src="img/board_desk@1x.png" srcset="img/board_desk@2x.png 2x" alt="Образец печатной платы" width="705" height="515">
</picture>
```

Всего исправлено 3 изображения:

```
<picture>
  ...
    <img src="img/production_desk@1x.png" srcset="img/production_desk@2x.png 2x" alt="Линия производства" width="370" height="620">

    <img src="img/mounting_desk@1x.png" srcset="img/mounting_desk@2x.png 2x" alt="Линия производства" width="370" height="620">

    <img src="img/components_desk@1x.png" srcset="img/components_desk@2x.png 2x" alt="Линия производства" width="370" height="620">
</picture>
```

#### Ошибки в валидаторе: ошибка в атрибутах source

___добавим  type="image/png"___

```
A source element that has a following sibling source element or img element with a srcset attribute must have a media attribute and/or type attribute.

```

    From line 38, column 15; to line 38, column 78
    <source srcset="img/logo_mob@1x.png 1x, img/logo_mob@2x.png 2x">

    From line 103, column 15; to line 103, column 80
    <source srcset="img/board_mob@1x.png 1x, img/board_mob@2x.png 2x">


    From line 249, column 19; to line 249, column 94
    <source srcset="img/production_mob@1x.png 1x, img/production_mob@2x.png 2x">

    From line 280, column 19; to line 280, column 90
    <source srcset="img/mounting_mob@1x.png 1x, img/mounting_mob@2x.png 2x">

    From line 313, column 19; to line 313, column 94
    <source srcset="img/components_mob@1x.png 1x, img/components_mob@2x.png 2x">
    ```

#### Убрать курсор-пойнтер и фокус, карточки никуда не ведут

#### Поля textarea тянутся

```
  resize: none;
```

#### На адресе ссылка не нужна

#### В Safari обрезаны placeholder

Решается добавлением padding-top, padding-bottom.
В Firefox не работает центрирование placeholder для input.

#### файлы js должны объединяться

#### При использовании блочно-строчных элементов (display: inline-block) явно указано вертикальное выравнивание (vertical-align)

#### переполнение nav-list некорректно отрабатывается - появляется scrollbar

#### Вся область вкладки должна быть кликабельной

#### сделать обработчик формы: валидация, сохранение в localStorage, отправка данных на сервер
