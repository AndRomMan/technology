/* eslint-disable no-alert */
/* eslint-disable no-invalid-this */
/* eslint-disable no-console, no-console*/
'use strict';

// node-trycatch.js

// =======================================
try {
  // код...
} catch (err) {
  // обработка ошибки
}
// =======================================

/* try {
  numValue; // ошибка, переменная не определена!
} catch (err) {
  console.log(err.name); // ReferenceError
  console.log(err.message); // numValue is not defined
  console.log(err.stack); // ReferenceError: numValue is not defined at (...стек вызовов)

  // Можем также просто вывести ошибку целиком
  // Ошибка приводится к строке вида "name: message"
  console.log(err); // ReferenceError: numValue is not defined
} */

// =======================================
// let json = '{ некорректный JSON }';
let json = '{JSON}';
try {
  let user = JSON.parse(json); // <-- тут возникает ошибка...
  console.log(user.name); // не сработает
} catch (e) {
  // ...выполнение прыгает сюда
  console.log('Извините, в данных ошибка, мы попробуем получить их ещё раз.');
  console.log('______________');
  console.log('e.name = ' + e.name);
  console.log('e.message = ' + e.message);
}

try {
  JSON.parse('{ bad json o_O }');
} catch (e) {
  console.log('______________');
  console.log('e.name = ' + e.name);
  console.log('e.message = ' + e.message);
}

console.log('______________');
/* В строке (*) оператор throw генерирует ошибку SyntaxError с сообщением message.
Точно такого же вида, как генерирует сам JavaScript.
Выполнение блока try немедленно останавливается, и поток управления прыгает в catch.
Теперь блок catch становится единственным местом для обработки всех ошибок:
 и для JSON.parse и для других случаев. */

json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json); // <-- выполнится без ошибок
  if (!user.name) {
    throw new SyntaxError('Данные неполны: нет имени'); // (*)
  }
  console.log(user.name);
} catch (e) {
  console.log('JSON Error: ' + e.message); // JSON Error: Данные неполны: нет имени
}

console.log('______________');
/* Проброс исключения:
Ошибка в строке (*) из блока catch «выпадает наружу»
и может быть поймана другой внешней конструкцией
try..catch (если есть), или «убьёт» скрипт.

Таким образом, блок catch фактически обрабатывает только те ошибки,
с которыми он знает, как справляться, и пропускает остальные. */

json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError('Данные неполны: в строке JSON нет имени');
  }

  newJSONString(); // неожиданная ошибка

  console.log(user.name);
} catch (e) {
  if (e.name === 'SyntaxError') {
    console.log('JSON Error: ' + e.message);
  } else {
    throw e; // проброс (*)
  }
}

/* Здесь readData знает только, как обработать SyntaxError,
тогда как внешний блок try..catch знает, как обработать всё. */
function readData() {
  json = '{ "age": 30 }';
  try {
    // ...
    jsonString(); // ошибка!
  } catch (e) {
    // ...
    if (e.name !== 'SyntaxError') {
      throw e; // проброс исключения (не знаю как это обработать)
    }
  }
}
try {
  readData();
} catch (e) {
  console.log('Внешний catch поймал: ' + e); // поймал!
}

console.log('________________');
/* У кода есть два пути выполнения:
Если вы ответите на вопрос «Сгенерировать ошибку?» утвердительно,
то try -> catch -> finally.
Если ответите отрицательно, то try -> finally.
Неважно как завершилась функция: через return или throw.
 Секция finally срабатывает в обоих случаях.
 Блок finally срабатывает при любом выходе из try..catch, в том числе и return.
*/

try {
  console.log('try');
  if (confirm('Сгенерировать ошибку?')) BAD_CODE();
} catch (e) {
  console.log('catch');
} finally {
  console.log('finally');
}
