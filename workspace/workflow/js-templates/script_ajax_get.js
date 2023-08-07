'use strict';

// 1. GET AJAX запрос на чистом JavaScript
// Делаем запрос к файлу ajax_quest.php
// Файл будет возвращать то что мы ему передали.

// Данные для передачи на сервер допустим id товаров и его количество
let id_get = 111;
let qty_get = 222;

let sendGetBtn = document.querySelector('.ajax-btn__get');
// console.log(sendBtn);
sendGetBtn.addEventListener('mousedown', sendBtnMousedownHandler);

// Создаём объект класса XMLHttpRequest
const requestGet = new XMLHttpRequest();

/*  Составляем строку запроса и кладем данные, строка состоит из:
пути до файла обработчика ? имя в GET запросе где будет лежать значение запроса id_product и
через & мы передаем количество qty_product. */
const urlGet = 'https://demindesign.ru/ajax_get.php?id_get=' + id_get + '&qty_get=' + qty_get;

function sendBtnMousedownHandler() {
/* Здесь мы указываем параметры соединения с сервером, т.е. мы указываем метод соединения GET,
а после запятой мы указываем путь к файлу на сервере который будет обрабатывать наш запрос. */
requestGet.open('GET', urlGet);

// Указываем заголовки для сервера,
// говорим что тип данных, - контент который мы хотим получить должен быть не закодирован.
requestGet.setRequestHeader('Content-Type', 'application/x-www-form-url');

// Здесь мы получаем ответ от сервера на запрос, лучше сказать ждем ответ от сервера
requestGet.addEventListener('readystatechange', () => {


if (requestGet.readyState === 4 && requestGet.status === 200) {
    console.log( requestGet.responseText ); // выводим в консоль то что ответил сервер
    }
});
  requestGet.send(); // Выполняем запрос
}

 /*   request.readyState - возвращает текущее состояние объекта XHR(XMLHttpRequest) объекта,
 бывает 4 состояния.
  4-е состояние запроса:
  - операция полностью завершена,
  - пришел ответ от сервера,
 вот то что нам нужно request.status это статус ответа,
 нам нужен код 200 это нормальный ответ сервера,
 401 файл не найден,
 500 сервер дал ошибку и прочее...   */
