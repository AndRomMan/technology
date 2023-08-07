'use strict';
/* eslint-disable no-console, no-undef, no-alert */
// Задача: найти максимальный результат из массива результатов,
//  получаемых при вычислении нескольких выражений

// Функция сравнения для метода сортировки
function compareNumericAsc(a, b) {
  if (a > b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  if (a < b) {
    return -1;
  }
}

let expressionsMatter = function(a, b, c) {
  let max = [];
  max[0] = a * b * c;
  max[1] = a + b * c;
  max[2] = a * b + c;
  max[3] = a + b + c;
  max[4] = a * (b + c);
  max[5] = (a + b) * c;
  console.log('initial array: ' + max);
  // Сортируем полученную матрицу
  max.sort(compareNumericAsc);
  console.log('final array: ' + max);
  // Возвращаем элемент массива, в котором после сортировки будет находиться максимум
  return max[5];
};

let maxNumber = expressionsMatter(2, 2, 2);
console.log('maxNumber = ' + maxNumber);

// Создадим функцию на основе метода max объекта Math
let expressionsMatterMath = function(a, b, c) {
  let expression0 = a * b * c;
  let expression1 = a + b * c;
  let expression2 = a * b + c;
  let expression3 = a + b + c;
  let expression4 = a * (b + c);
  let expression5 = (a + b) * c;
  return Math.max(expression0, expression1, expression2, expression3, expression4, expression5);
};

let maxNumberMath = expressionsMatterMath(2, 2, 2);

console.log('maxNumberMath = ' + maxNumberMath);
