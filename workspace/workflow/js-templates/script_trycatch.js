/* eslint-disable no-invalid-this */
/* eslint-disable no-console, no-console*/
'use strict';

// script_trycatch.js

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
      // Выбросим исключение в случае передачи неизвестного времени года.
      throw new Error('Неизвестное время года: «' + season + '»');
  }
};

let questionsContainer = document.querySelector('.questions');

for (let i = 0; i < seasons.length; i++) {
  questionsContainer.insertAdjacentHTML('beforeend', 'Что надеть, если сейчас ' + seasons[i] + '?<br>');
  try {
    // Обработаем исключение при вызове функции getCloth
    questionsContainer.insertAdjacentHTML('beforeend', getCloth(seasons[i]) + '<br>');
  } catch (error) {
    questionsContainer.insertAdjacentHTML('beforeend', 'Непонятно =(<br>');
  }
}

questionsContainer.insertAdjacentHTML('beforeend', 'А что в Муссон?<br>');
questionsContainer.insertAdjacentHTML('beforeend', getCloth('Муссон') + '<br>');
