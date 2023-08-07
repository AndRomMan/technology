'use strict';

// 4. Post AJAX - новые обработчики событий XMLHttpRequest
  var xhr;

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

let id_modern = 111;
let qty_modern = 222;

let sendModernPostBtn = document.querySelector('.ajax-btn--modern');
// console.log(sendModernPostBtn);

// Указываем путь до файла на сервере, который будет обрабатывать наш запрос
// const urlModernPost = 'https://demindesign.ru/ajax_get.php';
const urlModernPost = 'https://demindesign.ru/ajax_post.php';
// const urlModernPost = 'https://demindesign.ru/';

// Строка с данными
const paramsModernPOST = ' id_modern = ' + id_modern + '&qty_modern = ' + qty_modern;

sendModernPostBtn.addEventListener('click', runXHR);

function addListeners(xhr) {
  xhr.addEventListener('load', loadHandler);
  xhr.addEventListener('error', errorHandler);
  xhr.addEventListener('timeout', timeoutHandler);
  xhr.addEventListener('loadstart', loadstartHandler);
  xhr.addEventListener('loadend', loadendHandler);
  xhr.addEventListener('progress',progressHandler);
  xhr.addEventListener('abort', abortHandler);
}
function loadstartHandler(evt) {
    console.log('---------- Загрузка 1:  -  загрузка данных с сервера началась - ' + 'evt.type = ' + evt.type);
}
function progressHandler(evt) {
    console.log('---------- Загрузка 2:  -  загрузка данных идет - ' + 'evt.type = ' + evt.type);
    console.log('---------- Загрузка 2:  -  всего загружено - ' + event.loaded + ' из ' + event.total);
}
function loadHandler(evt) {
      if (xhr.status === StatusCode.OK) {
        console.log('---------- Загрузка 3:  -  Данные с сервера успешно загружены - ' + 'evt.type = ' + evt.type);
        console.log('____________________ Success: статус ответа: ' + 'xhr.status = ' + xhr.status);
        console.log('____________________ Success: статус ответа: ' + 'xhr.statusText = ' + xhr.statusText);
        console.log('____________________ Success: xhr.response = ');
        console.log(xhr.response);
        console.log('Загружено с сервера: ' + xhr.response.length + ' байт.');  // response -- это ответ сервера
        console.log('____________________ ____________________');
      } else {
        console.log('____________________ Error: статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        console.log('____________________ Error: xhr.response = ');
        console.log(xhr.response);
        console.log('____________________ ____________________');

      }
  }
function loadendHandler(evt) {
    console.log('---------- Загрузка 4:  -  Загрузка данных с сервера закончена в любом случае - ' + 'evt.type = ' + evt.type);
}

function errorHandler(evt) {
    console.log('---------- Загрузка 5:  -  Произошла ошибка соединения - ' + 'evt.type = ' + evt.type);
}
function timeoutHandler(evt) {
    console.log('---------- Загрузка 6:  -  Время ожидания данных от сервера превышает - ' + TIMEOUT_IN_MS + ' мс. ' + 'evt.type = ' + evt.type);
}

function abortHandler(evt) {
    console.log('---------- Загрузка 7:  -  Загрузка данных прервана - ' + 'evt.type = ' + evt.type);
}

function addUploadListeners(xhr) {
    xhr.upload.addEventListener('loadstart', uploadStartHandler);
    xhr.upload.addEventListener('progress', uploadProgressHandler);
    xhr.upload.addEventListener('error', uploadErrorHandler);
    xhr.upload.addEventListener('load', uploadCompleteHandler);
    xhr.upload.addEventListener('timeout', uploadTimeoutHandler);
    xhr.upload.addEventListener('abort', abortTimeoutHandler);
}

function uploadStartHandler(evt) {
    console.log('Выгрузка 1:  -  Началась выгрузка данных на сервер - ' + 'evt.type = ' + evt.type);
}
function uploadProgressHandler(evt) {
    console.log('Выгрузка 2:  -  Идет выгрузка данных на сервер - ' + 'evt.type = ' + evt.type);
}

// События error, abort, timeout и load взаимно исключают друг друга – может произойти только одно из них.
function uploadErrorHandler(evt) {
    console.log('Выгрузка 3:  -  Произошла ошибка при выгрузке данных - ' + 'evt.type = ' + evt.type);
}
function uploadCompleteHandler(evt) {
    console.log('Выгрузка 4:  -  Данные выгружены на сервер - ' + 'evt.type = ' + evt.type);
}
function uploadTimeoutHandler(evt) {
    console.log('Выгрузка 5:  -  Запрос не успел выполниться за - ' + TIMEOUT_IN_MS + 'мс. - ' + 'evt.type = ' + evt.type);
}
function abortTimeoutHandler(evt) {
    console.log('Выгрузка 6:  -  Запрос на сервер прерван - ' + 'evt.type = ' + evt.type);
}

// xhr.addEventListener('load', handleEvent);
// function handleEvent(evt) {
//     console.log('____________________ load event');
//     console.log(' evt.type ' + evt.type + ' evt.loaded ' + evt.loaded + ' bytes transferred');
// }

function runXHR(evt) {
    console.log(evt.type);
    console.log('run XHR');
    xhr = new XMLHttpRequest();
    // xhr.responseType = 'json'; // Для загрузки файлов задаем тип ответа

    addListeners(xhr);
    addUploadListeners(xhr);

    xhr.timeout = TIMEOUT_IN_MS;

    console.log('____________________ open ____________________');
    xhr.open('POST', urlModernPost);

    // xhr.open('GET', URL); // для загрузки с сервера используем метод GET

    console.log('____________________ send ____________________');
    xhr.send(paramsModernPOST);
    // xhr.abort(); // Запрос можно прервать. При этом генерируется событие abort, а xhr.status устанавливается в 0
    // return xhr;
}

    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    // Запросы multipart/form-data
    // Второй способ кодирования — это отсутствие кодирования.
    // Например, кодировать не нужно для пересылки файлов.
    // Он указывается в форме (только для POST) так:
    // <form method="post" enctype="multipart/form-data"></form>
    // В этом случае при отправке данных на сервер ничего не кодируется.
    // А сервер, со своей стороны, посмотрев на Content-Type(=multipart/form-data), поймет, что пришло.
