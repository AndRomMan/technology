attributes

childNodes

firstChild
lastChild
previousSibling
nextSibling

parentNode

============================================================
appendChild() -
parentElem.appendChild(node)
Добавляет node в конец дочерних элементов parentElem.

============================================================
parentElem.insertBefore(node, nextSibling)
Вставляет node перед nextSibling в parentElem.

============================================================
removeChild() заменен на remove()

parentElem.removeChild(node)
Удаляет node из parentElem (предполагается, что он родитель node).

============================================================
replaceChild()
parentElem.replaceChild(node, oldChild)
Заменяет oldChild на node среди дочерних элементов parentElem.

============================================================
insertBefore()
parentElem.insertBefore(элемент, перед кем вставить)
Метод insertBefore позволяет вставить элемент перед другим элементом.

============================================================
document.write(html)
записывает html на страницу «прямо здесь и сейчас».
Строка html может быть динамически сгенерирована, поэтому метод достаточно гибкий.
Мы можем использовать JavaScript, чтобы создать полноценную веб-страницу и записать её в документ.

В современных скриптах он редко встречается из-за следующего важного ограничения:
Вызов document.write работает только во время загрузки страницы.
Так что после того, как страница загружена,
он уже непригоден к использованию.
============================================================
cloneNode()

createAttribute() - Use Element.setAttribute() instead.
getAttributeNode() - Use Element.getAttribute() instead.
setAttributeNode() - Use Element.setAttribute() instead.

hasAttributes() - This method now always returns false!


Рекомендуется использовать именно методы
    append
    prepend
    before
    after
    remove
    replaceWith
