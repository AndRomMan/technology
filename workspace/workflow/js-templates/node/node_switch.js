/* eslint-disable no-invalid-this */
/* eslint-disable no-console, no-console*/
'use strict';

// node_switch.js

console.log('________________ SWITCH');
/* // функция SWITCH: сокращенный вариант
let seasons = ['Лето', 'Осень', 'Весна', 'Зима', 'Дождь'];
let getCloth = function (season) {
  switch (season) {
    case 'Осень':
      return 'Зонт';
    case 'Зима':
      return 'Варежки';
    case 'Лето':
      return 'Майку';
    case 'Весна':
      return 'Плащ';
    default:
      return 'Непонятно =(';
  }
};
for (let i = 0; i < seasons.length; i++) {
  document.body.innerHTML += 'Что надеть, если сейчас ' + seasons[i] + '?<br>';
  document.body.innerHTML += getCloth(seasons[i]) + '<br>';
} */

/* // Полная запись
var getCloth = function (season) {
  var answer = 'Непонятно =(';
  switch (season) {
    case 'Осень':
      answer = 'Зонт';
      break;
    case 'Зима':
      answer = 'Варежки';
      break;
    default:
      answer = 'Непонятно =(';
  }
  return answer;
} */
