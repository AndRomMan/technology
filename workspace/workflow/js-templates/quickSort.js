/* eslint-disable guard-for-in */
'use strict';
// ==============================================================================
// ==============================================================================
// Chapter 4
// ==================================== Быстрая сортировка.
/*
Алгоритм:
1 Делим массив примерно пополам.
Задаем начальный и конечный индексы элементов в массиве first и last.
Индекс середины будет как округленная полусумма начального first и конечного last индексов.
Math.floor((first + last) / 2)
2 Проверим условие:
если first < last, то переходим к следующим циклам.
2.1 Начинаем проходить по левой половине массива.
Проверяем условие:
(Начальный индекс цикла i = first;)
если array[i] < arrray[mid], то
сдвигаемся вправо, инкрементировать индекс (i++);
если условие не выполняется,
 то останавливаем продвижение,
 запоминаем элемент на котором движение остановилось array[stopFirst]
  и переходим к другому циклу(обход по правой половине массива)
2.2 Проходим по правой половине массива.
Проверяем условие:
(Начальный индекс цикла j = last;)
если array[i] > array[mid], то
сдвигаемся влево декрементировать индекс (j--);
если условие не выполняется,
то  запоминаем элемент на котором движение остановилось array[stopLast]
  и производим обмен позициями (swap function) элементов array[stopFirst] и array[stopLast].

На этом этап разбиения закончен.
Массив разделен на две части относительно опорного элемента.

 Алгоритм quicksort работает путем разбиения всего массива,
  а затем рекурсивного разбиения левой и правой частей массива до тех пор,
   пока весь массив не будет отсортирован.
*/

let arrToSort = [18, 15, 33, 4, 456, 1, 17, 5];

// Функция обмена позициями двух элементов массива
let swapFunc = function(array, firstIndex, lastIndex) {
  let swap = array[firstIndex];
  array[firstIndex] = array[lastIndex];
  array[lastIndex] = swap;
  return array;
};

console.log(arrToSort);
let newArray = swapFunc(arrToSort, 0, 7);
console.log(newArray);

// Функция разделения элементов больше
//  и меньше опорного по разные стороны от опорного.

let partition = function(array, first, last) {
  var pivot = array[Math.floor((first + last) / 2)];
  console.log(pivot);
  var i = first;
  var j = last;
  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swapFunc(array, i, j);
      i++;
      j--;
    }
  }
  return i;
};

function quickSort(array, first, last) {
  let index;
  if (array.length > 1) {
    // Первичное разбиение - узнаем начальный индекс опорного элемента,
    // который разделяет входящий массив на подмассивы. Это происходит рекурсивно.

    index = partition(array, first, last);

    if (first < index - 1) {
      quickSort(array, first, index - 1);
    }
    if (index < last) {
      quickSort(array, index, last);
    }
  }
  return array;
}

console.log(`arrToSort = ${arrToSort}`);
console.log(quickSort(arrToSort, 0, arrToSort.length - 1));

// console.log(quickSort(arrToSort));

// ==================================== Рекурсия.

/* // Рекурсивная функция нахождения максимального числа в массиве
var arrToSorting = [18, 15, 33, 0, 456, 1];

console.log(arrToSorting[0]);

let getMaxOfArray = array => {
  if (array[0] === undefined) {
    return 'the array is empty';
  }
  let max = array[0];

  if (array.length === 1) {
    return max;
  }

  if (max < array[1]) {
    max = array[1];
    console.log(max);
  } else {
    array[1] = max;
  }

  let shortenedArray = array.slice(1);
  console.log(shortenedArray);

  return getMaxOfArray(shortenedArray);
};

console.log(getMaxOfArray(arrToSorting));
 */
// ====================================
/*
 // Рекурсивная функция подсчета элементов в списке
var arrToSorting = [4, 3, 5, 8, 1];
let getElemNumOfArray = array => {
  let sum = 0;

  if (array[0] === undefined) {
    return sum;
  }
  let shortenedArray = array.slice(1);
  return (sum = 1 + getElemNumOfArray(shortenedArray));
};

console.log(getElemNumOfArray(arrToSorting)); */

// ====================================
/*
// Рекурсивное вычисление суммы массива
var arrToSorting = [4, 4, 4, 4, 4];

let checkSum = function(array) {
  let sum = 0;
  if (array.length === 0) {
    return sum;
  }

  let shortenedArray = array.slice(1);
  console.log(shortenedArray);
  return (sum = array[0] + checkSum(shortenedArray));
};

console.log(checkSum(arrToSorting));
 */

// ==============================================================================
// ==============================================================================

/*
//  программа сортировки массива выбором

var numbers = [3, 5, 15, 6, 2, 1, 18, 0, 17, 36, 42, 7, 7];
var sortedArray = function(array) {
  var swap;
  for (var i = 0; i < array.length; i++) {
    for (var j = i; j < array.length; j++) {
      if (array[j] < array[i]) {
        swap = array[i];
        array[i] = array[j];
        array[j] = swap;
      }
    }
  }
  return array;
};

console.log('sorted array = ' + sortedArray(numbers));
 */

/*
// алгоритм бинарного поиска

var numArray = [1, 3, 17, 20, 34, 53, 68, 74, 83, 92, 100, 123, 145, 156, 181];
var arrayLength = numArray.length;
var item = 83;

// console.log('arrayLength = ' + arrayLength);

var getArrayIndex = function(array, item) {
  var lowIndex = 0;
  var highIndex = array.length - 1;
  // console.log('highIndex = ' + highIndex);

  while (lowIndex <= highIndex) {
    var midIndex = Math.floor((highIndex + lowIndex) / 2);
    // console.log('midIndex = ' + midIndex);
    var guessItem = array[midIndex];
    // console.log('guessItem = ' + guessItem);

    if (guessItem === item) {
      return midIndex;
    } else if (guessItem > item) {
      highIndex = midIndex - 1;
      // console.log('change highIndex = ' + highIndex);
    } else {
      lowIndex = midIndex + 1;
      // console.log('change lowIndex = ' + lowIndex);
    }
  }
  return 'there is not the number';
};
console.log('position of number in array: ' + getArrayIndex(numArray, 17));
*/
// eslint-disable-next-line prettier/prettier
