[TOC]

# Интерфейс Document
предоставляет функции глобально для документа,
описывает общие свойства и методы для любого вида документа.

---
* ### HTMLCollection - динамическая коллекция элементов DOM.
* ### NodeList = статический объект.

---
## Методы

### Deprecated methods!
* createAttribute() - Use Element.setAttribute() instead.
* getAttributeNode() - Use Element.getAttribute() instead.
* setAttributeNode() - Use Element.setAttribute() instead.

### querySelector(), querySelectorAll()
Возвращает статический (не живой) объект NodeList

### document.createElement()
создаёт HTML элемент, используя имя HTML тега, такое как ‘p’ или ‘div’.
document.createElement(tagName);
let  newElem = document.createElement( "button" );

### Creates a new Text node.

This method can be used to escape HTML characters.
var text = document.createTextNode(data);
text is a Text node.
data is a string containing the data to be put in the text node.

function addTextNode(text) {
  var newtext = document.createTextNode(text),
      p1 = document.getElementById("p1");

  p1.appendChild(newtext);
}

### document.hasFocus()
имеет ли документ или любой элемент внутри документа фокус
true = документ имеет фокус,
false = документ не имеет фокуса.

if ( document.hasFocus() ) {
  // документ имеет фокус
} else {
  // документ не имеет фокуса
}

---
## Свойства

### forms
возвращает коллекцию HTMLCollection
со списком всех элементов <form>, содержащихся в текущем документе.
### images
возвращает коллекцию изображений в текущем HTML документе.
