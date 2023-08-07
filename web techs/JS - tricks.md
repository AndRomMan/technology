<!-- JS Tricks -->

# Javascript tip&tricks

[TOC]

---

## Работа с событиями

### Enter

```js
  document.getElementById('myform').addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      this.submit();
    }
  });
```

## Работа с формой

### Добавляем обработчики события Submit и клик по кнопке "Отправить"

```js
    if (form) {
      if (form && submitButton) {
        form.addEventListener('submit', formSubmitHandler);
        form.addEventListener('click', formSubmitHandler);
      }
    }

  function formSubmitHandler(evt) {
    evt.preventDefault();
    console.log('formSubmitHandler');
    console.log(evt.target);
  }
```

## Обозначить глобальную функцию

``` js
/* global OrderForm */
```

## Методы массива

### Преобразовать в массив

## Отслеживание события фокуса на элементе

```js
    document.addEventListener('focusin', (evt) => {
      console.log('focus event');
      console.log(evt.target);
    });
```

## Редирект на другую страницу js: `window.location.href = 'redirect-url';`

`document.location.href = 'http://myrusakov.ru';`

## Закрытие модального по Escape

 __Инициализировать обработчик закрытия при открытии окна и снимать
 после закрытия окна__

```js
var modal = document.querySelector('.modal')

window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modal.style.display = 'none'
  }
})
```

## GET-запросы

### Кодирование пользовательских данных для GET-запроса

```js
let myOtherUrl = 'http://example.com/index.html?userData=' + encodeURIComponent(userData);
```

### Синтаксис: `http://домен/страница?[параметр1=значение1][&параметр2=значение2]`

- набор передаваемых данных на сервер начинаются с символа `?` и разделяются символом `&`
- данные представляют собой пары параметр=значение
- передать имя и фамилию пользователя на странице регистрации (например, register.php)
  `http://mysite.com/register.php?fname=Иван&lname=Иванов'`
- передавать информацию в виде чисел и слов на english
- недостатком GET-запросов является ограниченность передаваемых данных: на стороне сервера строка запроса ограничивается некоторым максимальным значением
- символы ? и & уже зарезервированы и их передавать как значения параметров нельзя. Однако это правило можно обойти, если в строке запроса передавать не сам символ, а его кодовое значение. Для этого используется символ `%`, за которым следует код символа, например, так:
  `http://mysite.com/register.php?fname=%CC%DF%AD%1F%DS&lname=%DD`
  Здесь кодовые значения указаны в шестнадцатиричном виде с целью экономии длины запроса.
- GET-запросы незаменимы в случаях начальной инициализации страницы сайта для конкретного пользователя, когда в запросе указывается не только сайт и текущая страница, но и его id:
  `http://vk.com/profile.php?id=12345678`

Также GET-запросы часто применяются для проверки корректности email-адреса при регистрации пользователя. В этом случае пользователю на указанный email приходит письмо со ссылкой активации и эта ссылка представляет собой GET-запрос.

#### Пример 1

`http://mysite.ru/?a=2&b=3`

И в скрипте параметры можно получить так:

```php
<?php $c = $_GET['a'] + $_GET['b'];
```

#### Пример 2

Подразумевается, что пользователь ввёл в браузере адрес `http://example.com/?name=Иван`

```php
<?php
echo 'Привет, ' . htmlspecialchars($_GET["name"]) . '!';
?>
```

## Событие загрузки страницы

```js
document.addEventListener('DOMContentLoaded', contentLoadedHandler);
```

```js
function contentLoadedHandler() {
  console.log('main-pay.js: giftPackageInputChangeHandler() - Инициализация блока подарочной ');
  if (giftPackageInput && orderTotalSum) {
    giftPackageInput.addEventListener('change', giftPackageInputChangeHandler);
  }
}
```

## Scroll prevention

```js
(function () {
  function openModal(templateID) {
    // вызов функции предотвращения скролла при открытии popup
    window.myStudiesScrollPrevention.scrollPrevention();
    closeModalInit();
  }

  function scrollPrevention() {
    let scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scrollbarWidth}px`;
  }

  function cancelScrollPrevention() {
    document.body.removeAttribute('style');
  }

  window.myStudiesScrollPrevention = {
    scrollPrevention,
    cancelScrollPrevention,
  };
})();
```

## Debounce

```js
function debounce(f, delay_ms) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), delay_ms);
  };
}
```

- Вызов debounce возвращает обёртку. Возможны два состояния:
  - isCooldown = false – готова к выполнению.
  - isCooldown = true – ожидание окончания тайм-аута.
- В первом вызове isCoolDown = false, поэтому вызов продолжается, и состояние изменяется на true.
- Пока isCoolDown имеет значение true, все остальные вызовы игнорируются.
- Затем setTimeout устанавливает его в false после заданной задержки.

### Тестирование debounce: функция вызывается один раз в N 'ms'

```js
// обработчик нажатия кнопки
function submitButtonClickHandler(evt) {
  evt.preventDefault();
  setTimeout(newRequest(), 300);
  setTimeout(newRequest(), 900);
  setTimeout(newRequest(), 1100);
  setTimeout(newRequest(), 1500);
}

let newRequest = preventDebounce(callRequest, 1000);

function callRequest() {
  console.log('call request');
}
```

## Подключение модулей

### module/nomodule

Старые браузеры без поддержки ES-модулей не будут обрабатывать скрипты с типом module, так как этот тип им неизвестен. А браузеры, которые поддерживают ES-модули, будут загружать скрипт с типом module и игнорировать скрипт с атрибутом nomodule. Браузеры с поддержкой ES-модулей, описываются следующим конфигом:

  ```html
  <script type="module" src="index.modern.js"></script>
  <script nomodule src="index.legacy.js"></script>
  ```

Главный плюс паттерна module/nomodule:

отсутствие необходимости в собственном сервере — всё работает полностью на клиентской части. Загрузку стилей в зависимости от браузера таким образом не сделать, но можно реализовать загрузку ресурсов с помощью JavaScript, используя проверку вида:

```js
if ('noModule' in document.createElement('script')) {
  // Новые браузеры
} else {
  // Старые браузеры
}
```

### Шаблон страницы IEEE модули

  ```js
  'use strict';
  (function () {

      window.innerFunc = {
      innerFuncMethode,
    };

  })();
  ```

## Изменение состояния checkbox и radiobutton

```js
if (checkbox) {
  checkbox.addEventListener('change', checkboxChangeHandler);
}
```

### Проверка и установка состояния checked и disabled

```js
if (elem.checked) {
}
if (elem.disabled) {
}
```

```js
formButton.disabled = false;
formButton.disabled = true;
```

## Smooth scroll

### jQuery

Во-первых, асинхронно (например, у меня отзывы подгружались с другого сервиса, с задержкой несколько секунд). Во-вторых, для всех ссылок, которые содержат символ # (являются якорями). В-третьих, у меня в проекте было фиксированное меню сверху, поэтому при прокрутке прямо по якорю часть контента перекрывалась, для решения этой проблемы предлагаю установить fixed_offset равный высоте фиксированного меню (опционально).

```js
$('body').on('click', '[href*="#"]', function (e) {
  var fixed_offset = 100;
  $('html,body')
    .stop()
    .animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 1000);
  e.preventDefault();
});
```

### Проверенное решение

```js
const FORM_ANCHOR = 'anchor-request-form';
const ANCHOR_LINK = 'js-anchor-link';
const TOP_OFFSET = 100;
const SCROLL_TIME = 600;

let anchorLinks = document.querySelectorAll(`.${ANCHOR_LINK}`);
let targetAnchor = document.querySelector(`#${FORM_ANCHOR}`);

function scrollInit() {
  if (anchorLinks && targetAnchor) {
    anchorLinks.forEach((anchorLink) => {
      anchorLink.addEventListener('click', anchorLinkClickHandler);
    });
  }
}

function anchorLinkClickHandler(evt) {
  evt.preventDefault();
  console.log(evt.target);
  $('html,body')
    .stop()
    .animate({scrollTop: $(`#${FORM_ANCHOR}`).offset().top - TOP_OFFSET}, SCROLL_TIME);
}
```

### JavaScript - не поддерживается Safari

```js
const FORM_ANCHOR = 'anchor-request-form';
const ANCHOR_LINK = 'js-anchor-link';

let anchorLinks = document.querySelectorAll(`.${ANCHOR_LINK}`);
let targetAnchor = document.querySelector(`#${FORM_ANCHOR}`);

function scrollInit() {
  if (anchorLinks && targetAnchor) {
    anchorLinks.forEach((anchorLink) => {
      console.log(anchorLink);
      anchorLink.addEventListener('click', anchorLinkClickHandler);
    });
  }
}

function anchorLinkClickHandler(evt) {
  evt.preventDefault();
  targetAnchor.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
```

## Удалить пробелы из строки

Если вам нужно только заменить пробелы `' '` , используйте `split / join`.
Если могут быть разные символы класса символов - используйте `replace(/\s+/g, '')`

- Лучшее решение. Он дает тот же результат, но делает это быстрее.
  `str = str.replace(/\s+/g, '');`
  Регулярное выражение

`\` является регулярным выражением для «пробела» и `g` является «глобальным» флагом, что означает соответствие ВСЕ \s(пробелы).

- `string.split(' ').join('');`
- Кратчайшие и быстрые `str.replace(/ /g, '');`

## Имитируем нажатие на элемент

[HTMLElement.click()](https://developer.mozilla.org/ru/docs/Web/API/HTMLElement/click)

## События фокуса

```js
  document.addEventListener('focusin', focusHandler);
  function focusHandler(evt) {
    console.log('focus event');
    console.log(evt.target);
  }
```

## Операторы JS

*__Оператор in возвращает true, если свойство содержится в указанном объекте или в его цепочке прототипов.__*

- prop
    Строка или symbol, представляющий название свойства или индекс массива (non-symbols будут конвертированы в строки).

- object
    Объект, в котором нужно проверить содержание свойства с заданным именем.

- __Массивы__

```js
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // true
3 in trees        // true
6 in trees        // false
"bay" in trees    // false (вы должны указать индекс элемента в массиве, а не значение в этом индексе)
"length" in trees // true (length является свойством Array)
```

- __Уже существующие объекты__

```js
"PI" in Math      // true
```

- __Пользовательские объекты__

```js
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar  // true
"model" in mycar // true
```

## Работа с формой

### Очистка формы

```js
document.getElementById('myform').reset();
```
