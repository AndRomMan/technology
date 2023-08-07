[TOC]
# Методы

## Deprecated!
* appendChild()
* removeChild()
* replaceChild()
* insertBefore()

---
* ### HTMLCollection - динамическая коллекция элементов DOM.
* ### NodeList = статический объект.

---
## ParentNode

1)
свойство
children
возвращает ДИНАМИЧЕСКУЮ коллекцию (HTMLCollection = только валидные HTML элементы)
 которая содержит все дочерние элементы узла, на котором он был вызван

2)
свойство
firstElementChild
возвращает первый дочерний элемент (объект Element) конкретного узла

свойство
lastElementChild
возвращает последний дочерний элемент (объект Element) конкретного узла

3)
ParentNode.append()
позволяет вставить в конец какого-либо другой элемент.

ParentNode.prepend()
позволяет вставить в начало какого-либо другой элемент.

 Параметром метод принимает элемент, как правило созданный
 через createElement, либо строку.
 Можно добавить сразу несколько элементов или строк, перечислив их через запятую.

    ParentNode.append() позволяет добавлять DOMString объекты,
     в то время как Node.appendChild() принимает только Node.

    ParentNode.append() ничего не возвращает,
     в то время как Node.appendChild() возвращает добавленный объект Node.

    ParentNode.append() позволяет добавить несколько узлов (node) или строк,
    в то время как Node.appendChild() может добавить только один узел (node).

4)
childElementCount
возвращает количество дочерних элементов конкретного узла

element.children.length === childElementCount
