'use strict';
/* eslint-disable no-console, no-undef, no-alert */

let wordStart = 'world';

let wordReverse = function(word) {
  let outputWord = '';

  for (let i = word.length - 1; i >= 0; i--) {
    outputWord += String(word[i]);
  }
  return outputWord;
};
let str = wordReverse(wordStart);
console.log(str);

let arr = [1, 2, 3];
let reverseArrayString = arr.join('-');
console.log(str);

/*
Метод join
Метод join объединяет элементы массива в строку с указанным разделителем
(он будет вставлен между элементами массива).

Разделитель задается параметром метода и не является обязательным.
 Если он не задан - по умолчанию в качестве разделителя возьмется запятая.
 Если вы хотите слить элементы массива без разделителя - укажите его как пустую строку ''.

 */
