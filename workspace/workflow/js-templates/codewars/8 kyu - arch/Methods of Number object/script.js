'use strict';
/*
Coding in function 'howManySmaller', function accept 2 parameter:
 'arr' - is a decimal array,
'n' is a decimal.

The first mission:
let all elements in the array keep 2 decimal places
(No need to convert number n).

The second mission:
Traversal arr,
count the number of the element which smaller than n and return it.

For example:
howManySmaller([1.234,1.235,1.228],1.24) should return 2
howManySmaller([1.1888,1.1868,1.1838],1.19) should return 1
howManySmaller([3.1288,3.1212,3.1205],3.1212) should return 2
 */

// функция нахождения нахождения позиции (индекса) точки в дробном числе
// (число представлено в виде строки)
let findDotIndex = function(inputStringNumber) {
  let dotIndex = 0;
  for (let i = 0; i < inputStringNumber.length; i++) {
    // console.log(inputStringNumber[i]);
    if (inputStringNumber[i] === '.') {
      // console.log(inputStringNumber[i]);
      dotIndex = i;
      break;
    }
  }
  return dotIndex;
};

// Функция нахождения длины дробной части числа
// (c которым производим сравнение элементов массива) -
// таким образом получаем число разрядов для округления элементов массива перед сравнением
let fractionalPartOfNum = function(inputNumber) {
  // Преобразуем число в строку
  let stringOfInputNumber = inputNumber.toString(10);
  let dotIndex = findDotIndex(stringOfInputNumber);
  // длина стороки
  let stringLength = stringOfInputNumber.length;

  console.log(`inputNumber: ${inputNumber}`);
  console.log(`dotIndex: ${dotIndex}`);
  console.log(`stringLength: ${stringLength}`);
  // Сколько цифр после запятой в числе
  let lengthOfFractionalPart = stringLength - (dotIndex + 1);
  return lengthOfFractionalPart;
};

let howManySmallerAllRanks = function(array, comparedNumber) {
  // объявляем счетчик элементов массива, удовлетворяющих условию arr[i] < comparedNumber
  let counter = 0;
  let rankForRounding = fractionalPartOfNum(comparedNumber);
  console.log(rankForRounding);

  array.forEach(function(element) {
    let roundedElement = element.toFixed(rankForRounding);
    console.log(`typeof roundedElement: ${typeof roundedElement}`);

    // Преобразуем округленное строковое число из числовой тип
    let plainNumber = Number(roundedElement);
    console.log(plainNumber);
    console.log(typeof plainNumber);

    if (plainNumber < comparedNumber) {
      counter++;
    }
  });
  return counter;
};

/* For example:
howManySmaller([1.234,1.235,1.228],1.24) should return 2
howManySmaller([1.1888,1.1868,1.1838],1.19) should return 1
howManySmaller([3.1288,3.1212,3.1205],3.1212) should return 2 */
// let arr = [1.234, 1.235, 1.228];
// let arr = [1.1888, 1.1868, 1.1838];
let arr = [3.1288, 3.1212, 3.1205];

console.log(arr);
let num = 3.1212;

console.log(howManySmallerAllRanks(arr, num));

/* Функция, в которой элементы массива будут округляться до 2 знака после запятой
  и уже потом сравниваться с заданным числом, которое НЕ округляем.
  */

let howManySmaller = function(array, comparedNumber) {
  // объявляем счетчик элементов массива, удовлетворяющих условию arr[i] < comparedNumber
  let counter = 0;
  array.forEach(function(element) {
    let roundedElement = element.toFixed(2);
    console.log(roundedElement);
    console.log(`typeof roundedElement: ${typeof roundedElement}`);

    // Преобразуем округленное строковое число из числовой тип
    let plainNumber = Number(roundedElement);
    console.log(plainNumber);
    console.log(typeof plainNumber);

    if (plainNumber < comparedNumber) {
      counter++;
    }
  });
  return counter;
};

// The best practice
function howManySmallerBest(array, numForComparing) {
  // Метод filter позволяется отфильтровать элементы массива,
  //  оставив только подходящие под определенное условие элементы.
  // Метод в параметре получает функцию, которая выполнится для каждого элемента массива.
  // Своим результатом метод возвращает новый массив, в который войдут только те элементы,
  //  для которых переданная функции вернет true.
  // В функцию можно передавать 3 параметра.
  // Если эти параметры есть (они не обязательны),
  //  то в первый автоматически попадет элемент массива,
  //   во второй попадет его номер в массиве (индекс),
  //    а в третий - сам массив.
  return array.filter(x => +x.toFixed(2) < numForComparing).length;
}

/* For example:
howManySmaller([1.234,1.235,1.228],1.24) should return 2
howManySmaller([1.1888,1.1868,1.1838],1.19) should return 1
howManySmaller([3.1288,3.1212,3.1205],3.1212) should return 2 */
arr = [1.234, 1.235, 1.228];
num = 1.24;
// arr = [3.1288, 3.1212, 3.1205];
// num = 3.1212;

// arr = [1.1888, 1.1868, 1.1838];
// num = 1.19;

console.log(arr);
console.log(howManySmaller(arr, num));
console.log(howManySmallerBest(arr, num));

// Преобразование числа в строку в десятичной системе
// let numToString = numToConvert.toString(10);

/*
Метод toFixed(n)
производит округление числа до указанного знака в дробной части.
n - количество знаков.
Если n не указано, то по умолчанию берется 0 знаков, то есть округление до целого числа.
 */
// num = 111.111;
// let n = 2;
// let a = num.toFixed(n);
// console.log(`a = ${a} | type: ${typeof a}`);

/*
Метод toExponential(n)
переводит число в экспоненциальную нотацию.
n - число цифр после запятой,
Если его нет, то будет выведено столько цифр после запятой, сколько нужно для записи.

*/
// num = 11123;
// n = 3;
// a = num.toExponential(n);
// console.log(`a = ${a} | type: ${typeof a}`);

/*
Метод toPrecision(n)
округляет число до заданного знака.
В отличие от Math.round округление можно проводить не только в дробной части.
n - указывается сколько цифр должно остаться в числе.
Остальные цифры будут отброшены.
Последнее оставшееся число будет округлено по правилам математического округления.
Если указанное количество знаков не достижимо обрезанием десятичной части
 - переводит число в экспоненциальную форму.
 Если параметр пуст, то будет возращено исходное число.
 */
// let numb = 678.49999;
// let n = 3;
// let a = numb.toPrecision(n);
// console.log(`a = ${a} | type: ${typeof a}`);

/*
 Функция parseFloat() преобразует строку в число с плавающей точкой.
Это нужно для значений типа '12.5px' - когда вначале стоит число, а потом единицы измерения.
Преобразование произойдет, если только целое число стоит в начале строки, иначе будет выведено NaN.
 */

// num = '52.98';
// a = parseFloat(num);
// console.log(`a = ${a} | type: ${typeof a}`);

/*
parseInt(string, radix) - преобразует строку в целое число.
radix
  Целое число в диапазоне между 2 и 36,
  представляющее собой основание системы счисления числовой строки string, описанной выше.
  В основном пользователи используют десятичную систему счисления и указывают 10.
  Всегда указывайте этот параметр,
  чтобы исключить ошибки считывания и гарантировать корректность исполнения и предсказуемость результата.
  Когда основание системы счисления не указано, разные реализации могут возвращать разные результаты.

Важно! - вначале должно стоять число, а потом единицы измерения '12px'.
Преобразование произойдет, если только целое число стоит в начале строки,
иначе будет выведено NaN.
Если применить функцию parseInt к '12px', то результатом получится число 12
(и это будет действительно число, а не строка).
 */

// let numToConvert = '0145.53454';
// let numToConvert = 10;
// let numToString = numToConvert.toString(10);
// console.log(`numToString = ${numToString} | type of: ${typeof numToString}`);

// let a = parseInt(numToConvert, 0);
// console.log(`a = ${a} | type: ${typeof a}`);

/* eslint-disable no-console, no-undef, no-alert */
