/* eslint-disable no-invalid-this */
/* eslint-disable no-alert */
/* eslint-disable no-console, no-console*/
'use strict';

// script_modules.js

// ============================================================ section 1
// Модуль util.js
/* (function () {
  let ESC_KEYCODE = 27;
  let ENTER_KEYCODE = 13;

  console.log('Модуль util создан!');

  // Экспорт в глобальную ОВ window.ю
  // Чтобы понимать откуда мы получили значения мы положим экспортируемые значения
  // в объект, имя которого совпадает с именем модуля.
  window.util = {
    ESC_KEYCODE,
    ENTER_KEYCODE,
    // ESC_KEYCODE: ESC_KEYCODE,
    // ENTER_KEYCODE: ENTER_KEYCODE
  };
})(); */

// Модуль dialog.js
/* (function () {
  // получение переменных через глобальную область видимости называется импортом.
  // Теперь по имени объекта мы однозначно определяем имя файла
  // из которого мы получили значения.
   console.log(window.util.ESC_KEYCODE);
  console.log(window.util.ENTER_KEYCODE);

  console.log('Модуль dialog создан!');
})();

// Модуль setup.js
(function () {
  console.log(window.util.ESC_KEYCODE);
  console.log('Модуль setup создан!');
})(); */

// Если имя модуля состоит из нескольких слов, то они записываются через дефис,
// а объект в котором хранится экспортируемое значение записывается по правилам
// именования переменных — через camelCase.

// Модуль create-element.js
/* (function () {
  console.log('Модуль util создан!');

  window.createElement = function () {
    // здесь какой-то полезный код
  };
})();
 */
// Ещё одна важная особенность связанных модулей заключается в том,
// что прежде чем воспользоваться значением из родительского модуля
// мы должны быть уверены, что это значение было проинициализировано.
// Поэтому порядок подключения модулей важен
// — сначала подключаются модули, которые не зависят от других модулей
// и только потом подключаются зависимые модули.
/*
<script src="first.js"></script>
<script src="second.js"></script>
*/

/* // Модуль first.js
(function () {
  console.log('Модуль first проинициализирован!');

  window.first = 'yes';
})();

// Модуль second.js
(function () {
  console.log(window.first);

  console.log('Модуль second проинициализирован!');
})();
 */
// ============================== Паттерн - "Раскрывающийся модуль"
//  В данном модульном паттерне все методы и переменные остаются приватными, пока их явно раскроют.
/* let myGradesCalculate = (function () {
  // Keep this variable private inside this closure scope
  let myGrades = [93, 95, 88, 0, 55, 91];

  let average = function () {
    let total = myGrades.reduce(function (accumulator, item) {
      return accumulator + item;
    }, 0);

    return 'Your average grade is ' + total / myGrades.length + '.';
  };

  let failing = function () {
    let failingGrades = myGrades.filter(function (item) {
      return item < 70;
    });
    return 'You failed ' + failingGrades.length + ' times.';
  };

  // Explicitly reveal public pointers to the private functions
  // that we want to reveal publicly

  return {
    average,
    failing,
  };
})();

console.log(myGradesCalculate.failing());
console.log(myGradesCalculate.average()); */

// ============================== Паттерн "Модуль"
/*  базируется на замыканиях и состоит из двух компонентов:
внешняя функция, которая определяет лексическое окружение,
и возвращаемый набор внутренних функций, которые имеют доступ к этому окружению. */
//  https://metanit.com/web/javascript/3.3.php

// (function () {
//   console.log('Привет мир');
// })();

// Здесь определена переменная foo, которая представляет результат анонимной функции.
// Внутри подобной функции определен объект obj с некоторыми данными.
// Сама анонимная функция возвращает объект, который определяет функцию display.
// Возвращаемый объект определяет общедоступный API,
// через который мы можем обращаться к данным, определенным внутри модуля.

/* let foo = (function () {
  let obj = {greeting: 'hello'};

  return {
    display() {
      console.log(obj.greeting);
    },
  };
})();
foo.display(); */

// Все данные инкапсулированы в объекте data, который хранит результат операции.
// Все операции представлены тремя возвращаемыми функциями: sum, subtract и display.
//  Через эти функции мы можем управлять результатом калькулятора извне.
let calculator = (function () {
  let data = {number: 0};
  return {
    sum(n) {
      data.number += n;
    },
    subtract(n) {
      data.number -= n;
    },
    display() {
      console.log('Result: ', data.number);
    },
  };
})();
calculator.sum(10);
calculator.sum(3);
calculator.display(); // Result: 13
calculator.subtract(4);
calculator.display(); // Result: 9 */
