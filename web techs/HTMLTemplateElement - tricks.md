[TOC]

# Работа с шаблонами и фрагментами HTML

## HTMLTemplateElement

Обеспечивает доступ к содержимому элемента HTML

`<template>`

Содержимое `<template>` — это шаблон для фрагмента HTML, который может быть клонирован и вставлен в документ через скрипты.
 Обычно применяется для элементов с повторяющейся структурой, вроде списков, таблиц, списков `<select`>  и др.

### Свойство ***content***

```js
var documentFragment = templateElement.content
```

Фрагмент документа только для чтения, содержащий поддерево DOM, представляющее содержимое шаблона элемента `<template>`.

```js
The HTMLTemplateElement.content
```

```html
<template id="element-template">
  <div class="element">
    <span>
      Text content the of element
    </span>
  </div>
</template>
```

Клонируем содержимое шаблона для того,
чтобы переиспользовать его несколько раз

### Пример применения

**В примере вместо ***elem*** можно использовать ***fragment*****

```js
let elem = document.createElement('div');

let template = document.querySelector('#element-template')
let templateContent = template.content.querySelector('div');

//  если мы хотим поместить template в elem
elem.append(template.cloneNode(true));
```

## Интерфейс DocumentFragment()

### Метод createDocumentFragment()

```js
var fragment = document.createDocumentFragment();
```

Здесь fragment это ссылка на пустой объект DocumentFragment.

Creates and returns a new DocumentFragment object.
Этот интерфейс наследует методы его родителя, Node,
и реализует методы интерфейса ParentNode.

Метод создает объект DocumentFragment, который по сути является узлом DOM, который не является частью DOM древа. Это будто бы буфер, в который мы можем класть другие элементы, перед тем как добавлять их в желаемый DOM-узел.

Добавление элементов в DocumentFragment объект не вызывает каких-либо изменений в шаблоне, так что вы можете добавлять в него столько элементов, сколько захотите перед тем как передать их DOM древу, вызывая смену шаблона только в нужный момент.

 Поскольку все узлы вставляются в документ одновременно,
 запускается только одна перекомпоновка и рендеринг
 вместо потенциально одного для каждого вставленного узла,
 если они были вставлены отдельно.

### Пример применения

```js

var element  = document.getElementById('ul'); // assuming ul exists
var fragment = document.createDocumentFragment();
var browsers = ['Firefox', 'Chrome', 'Opera', 'Safari', 'Internet Explorer'];

browsers.forEach(function(browser) {
    var li = document.createElement('li');
    li.textContent = browser;
    fragment.appendChild(li);
});

element.appendChild(fragment);

```
