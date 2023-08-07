[TOC]

# Elements

Интерфейс Element:
 описывает методы и свойства, которые являются общими для всех видов элементов, представляет собой один из объектов в Document.

## Статический объект и динамическая коллекция

* HTMLCollection: динамическая коллекция элементов DOM.
* NodeList: статический объект.

***

## Работа с атрибутами

### getAttribute()

Возвращает значение указанного атрибута, принадлежащего к определенному HTML элементу.

Если данный атрибут не существует у указанного элемента, то возвращаемое значение будет соответствовать значению null.

```js
const attributeVal = element.getAttribute( attributeName );
```

Использование методов ***getAttribute()*** и ***getAttributeNames()*** является эффективным с точки зрения производительности и служит альтернативой свойству ***Element.attributes***!

В этом примере, мы показываем значение атрибута contenteditable, принадлежащего элементу <div> с помощью метода getAttribute()

```html
<div contenteditable=true>hello</div>
```

```js
var div = document.querySelector('div');
alert(div.getAttribute('contenteditable'))
```

### getAttributeNames()

Возвращает имена всех атрибутов элемента в виде **массива строк Array**
Если элемент не имеет атрибутов, он возвращает пустой массив.

```js
let attributeNames = element.getAttributeNames();
let attributeNames = btn.getAttributeNames();
```

Имеет смысл использовать ***hasAttribute***,
чтобы проверять наличие атрибутов перед вызовом getAttribute(),
если может быть такое, что выбранный элемент не будет содержать искомого атрибута.

### hasAttribute()

Возвращает логическое значение, указывающее на то, имеет ли указанный элемент заданный атрибут или нет

```js
attr = "data=val";
// инициализируем переменную строковым значением
if ( p.hasAttribute(attr) ) {}
// проверяем имеется ли у элемента атрибут со значением, содержащимся в переменной attr
```

### hasAttributes()

Возвращает логическое значение, указывающее на то, имеет ли элемент один или несколько любых атрибутов HTML

```js
const elem = document.getElementById("myElem");
// находим элемент по id
const result = elem.hasAttributes();
// проверяем имеет ли элемент атрибуты
```

**This method now always returns false!!!**

### toggleAttribute()

Добавляет элементу логический атрибут, если его нет, или удаляет его, если он присутствует у данного элемента.

```js
textInput.toggleAttribute("readonly");
```

**Требуется проверка!**

```js
checkboxInput.toggleAttribute("disabled");
// добавляем элементу логический атрибут, если его нет,
// или удаляем его, если он присутствует у данного элемента
```

### setAttribute()

Добавляет новый атрибут HTML элементу, так и меняет его значение для уже существующих.

* ele.setAttribute(name, value);
ele — это HTML элемент, к которому будет добавлен атрибут или чей атрибут будет изменен.
name — имя атрибута
value — значение атрибута

p.setAttribute("style", "color:red");
 // устанавливаем значение атрибута style у элемента

### removeAttribute()

удалить из элемента атрибут с указанным именем.

p.removeAttribute("style");
// удаляем атрибут style у элемента

В этом примере мы удаляем contenteditable атрибут из элемента <div>.
Как результат, <div> больше не будет редактируемым.

HTML:
  <div contenteditable=true>hello</div>JavaScript:
var div = document.querySelector('div');
div.removeAttribute('contenteditable');

* * *

### data-attributes

Свойство HTMLElement.dataset предоставляет доступ как для чтения,
так и для изменения всех пользовательских дата-атрибутов

Обратите внимание, свойство dataset доступно только для чтения.

* string = element.dataset.camelCasedName;
* element.dataset.camelCasedName = string;
* string = element.dataset[camelCasedName];
* element.dataset[camelCasedName] = string;

```HTML
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe</div>
```

```js
let el = document.querySelector('#user');
// el.id == 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

// 'someDataAttr' in el.dataset === false
el.dataset.someDataAttr = 'mydata';
// 'someDataAttr' in el.dataset === true
```

* Атрибуты можно устанавливать и считывать по имени в camelCase (ключ) как свойство объекта dataset,
  например element.dataset.keyname
* Атрибуты также можно устанавливать и считывать с использованием доступа к свойствам объекта через квадратные скобки,
  например element.dataset[keyname]
* Оператор in может быть использован для проверки существования атрибута.

## Вставка текста или разметки без перерендеринга

### универсальный метод: elem.insertAdjacentHTML(where, html)
 where должно быть одним из следующих:

* "beforebegin" – вставить html непосредственно перед elem,
* "afterbegin" – вставить html в начало elem,
* "beforeend" – вставить html в конец elem,
* "afterend" – вставить html непосредственно после elem.

Позиции "beforebegin" и "afterend" работают только в том случае,
если узел находится в дереве и имеет родительский элемент.

Второй параметр – это HTML-строка, которая будет вставлена именно «как HTML».

### универсальный метод: elem.insertAdjacentText(where, text)

  – такой же синтаксис, но строка text вставляется «как текст», вместо HTML,

### универсальный метод: elem.insertAdjacentElement(where, elem)

  – такой же синтаксис, но вставляет элемент elem.

 Они существуют, в основном, чтобы унифицировать синтаксис.
 На практике часто используется только insertAdjacentHTML.

  Потому что для элементов и текста у нас есть методы
  `append/prepend/before/after`
   – их быстрее написать, и они могут вставлять как узлы, так и текст.

### метод insertAdjacentElement()

вставить указанный узел элемента в заданную позицию относительно элемента, на котором он вызывается.

### метод insertAdjacentText()

вставить указанный текстовый узел в заданную позицию относительно элемента на котором он вызывается.

## Получить элементы

11)
метод
getElementsByClassName()
возвращает ДИНАМИЧЕСКУЮ коллекцию HTMLCollection,
которая содержит каждый элемент, который имеет указанное имя,
или имена класса, поиск элементов при этом ведется внутри указанного элемента.

// поиск элементов с определенными классами
let elements = element.getElementsByClassName( name1 name2 nameX )

let blocks = section.getElementsByClassName( "block active" );
// находим элементы с классами block и active внутри элемента <section>

12)
метод
getElementsByTagName( tagName )
возвращает ДИНАМИЧЕСКУЮ коллекцию HTMLCollection элементов с заданным именем тега,
поиск элементов при этом ведется внутри указанного элемента.

let blocks = section.getElementsByTagName( "div" );
// находим элементы с определенным именем тега внутри элемента <section>

========================================
13)
метод
Element.querySelector()

метод
Element.querySelectorAll()
Возвращает СТАТИЧЕСКИЙ объект NodeList,
представляющий список элементов,
соответствующих указанной группе селекторов,
которые являются потомками элемента на котором был вызван метод.
Если совпадений не найдено, то возвращается значение null.

var ele = document.querySelector(selector);
ele — сначала ищет совпадения элементов и если нет, то он выдает null.

selector — один или больше селекторов
“#fooId”,
“.fooClassName”,
“.class1.class2”
“.class1, .class2”

========================================

14)
свойство
tagName
возвращает имя тега элемента, на котором он вызывается
const tagName = element.tagName;

15)
свойство
innerHTML
позволяет установить или возвратить содержимое элемента.
Свойство предназначено для работы с HTML или XML разметкой.

В случае с innerHTML браузер будет рисовать текст как HTML разметку.
В то время как textContent вставляет текст как есть.

Обращаю Ваше внимание на то,
что если узел <div> или <span> имеет дочерний текстовый узел,
включающий символы ( & ), ( < ), или ( > ),
то innerHTML возвращает эти символы в виде HTML сущностей
 "&amp;", "&lt;" и "&gt;" соответственно.
Используйте свойство textContent объекта Node,
чтобы получить сырую копию содержимого этих текстовых узлов.

// получение содержимого
const content = element.innerHTML;

// установка содержимого
element.innerHTML = htmlString

16)
свойство
 id
возвращает значение глобального атрибута id элемента (идентификатор элемента).

17)
 свойство
 classList
 возвращает ДИНАМИЧЕСКУЮ коллекцию DOMTokenList,
содержащую значение глобального атрибута class (классы элемента).

Методы объекта DOMTokenList:
classList.add
add( val, val, ...val );

classList.remove
remove( val, val, ...val );

classList.item
item( N ); Результат аналогичен вызову classList[Number].

classList.toggle
toggle( val, force );
force = Boolean
true, то указанное значение класса будет добавлено,
а если значение false, удалено.

classList.contains
contains( val );

classList.replace
replace( oldClass, newClass );

18)
 свойство
 className
 задает значение атрибута class,
 или возвращает строковое значение этого атрибута,
 содержащее класс, или классы текущего элемента, разделенные пробелами.

Обращаю Ваше внимание на то, что использование свойства classList является удобной альтернативой доступа к списку классов элемента.

// получение классов элемента
const className = element.className;

// установка классов элемента
element.className = someClassName

19)
 свойство
 attributes
возвращает ДИНАМИЧЕСКУЮ коллекцию всех узлов атрибута
(объект NamedNodeMap), зарегистрированных на указанном узле.

const attributes = element.attributes;

20)
 свойство
 id
возвращает значение глобального атрибута id элемента (идентификатор элемента).

// получение id элемента
const idString = element.id;

// установка id элементу
element.id = idString;

21)
свойство (объекта ParentNode)
childElementCount
возвращает количество дочерних элементов конкретного узла.

Свойство childElementCount возвращает тот же результат,
что и element.children.length.

const count = document.getElementById("myNode").childElementCount;
// возвращаем количество дочерних элементов узла с id myNode.

22)
свойство (объекта ParentNode)
children
возвращает ДИНАМИЧЕСКУЮ коллекцию (HTMLCollection),
 которая содержит все дочерние элементы узла, на котором он был вызван.

 Свойство children исключает дочерние узлы, не являющиеся элементами Element,
 например, такие как Text (текстовый узел)
 и Comment (узел комментария).

const elements = document.getElementById("myNode").children;

23)
свойство  (объекта ParentNode)
lastElementChild
возвращает последний дочерний элемент (объект Element)
конкретного узла, или null, если дочерних элементов нет.

24)
свойство  (объекта ParentNode)
firstElementChild
возвращает первый дочерний элемент (объект Element) конкретного узла,
или null, если дочерних элементов нет.

========================================
NonDocumentTypeChildNode + Element

1)
свойство (объекта NonDocumentTypeChildNode)

nextElementSibling
возвращает элемент (объект Element), следующий сразу
за указанным в списке дочерних элементов родительского элемента,

или null, если указанный элемент является последним в списке.

2)
свойство (объекта NonDocumentTypeChildNode)
previousElementSibling
возвращает элемент (объект Element), находящийся непосредственно
перед указанным в родительском списке дочерних элементом,

или null, если указанный элемент является первым в списке.

const beforeElement = elementNodeReference.previousElementSibling;

=================================================================
Доступ к стилям

element.style.width = '100px'
Названия CSS-свойств пишутся в верблюжьейНотации.
Свойство float называется cssFloat.

Свойство можно сбросить, присвоив пустую строку, тогда стиль будет взят из таблицы CSS.
style.cssText — строка стилей

Прочитать из объекта style можно только те стили, которые указаны в атрибуте элемента.
Стили из каскадных таблиц из него не видны!

метод
getComputedStyle(element[, pseudoEle]).

* получить текущее значение свойства:
он возвращает read-only вычисленные значения всех CSS свойств указанного HTML элемента.

style — CSSStyleDeclaration объект возвращаемый этим методом. Он содержит все CSS свойства и их значения для элемента ele.

ele — это HTML элемент, CSS значения которого будут подтянуты.

pseudoEle — (опциональный параметр) это строка, которая представляет
собой псевдоэлемент. Если он упомянут, то CSS свойства указанного псеводоэлемента ассоциированные с ele будут возвращены.

let computedStyle = getComputedStyle(document.body);
console.log(getComputedStyle.marginTop); // выведет px
console.log(getComputedStyle.color); // выведет цвет
Возвращается окончательное значение свойства, непосредственно примененное к элементу.

var style = getComputedStyle(document.querySelector('div'));
alert(style.width);

=================================================================
<!-- Удаление элемента -->
```js
Element.remove();
```

```js
var el = document.getElementById('div-02');
el.remove(); // Removes the div with the 'div-02' id
```
