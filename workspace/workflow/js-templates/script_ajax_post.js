'use strict';

// 2. Post AJAX запрос на чистом JavaScript
// Делаем запрос к файлу ajax_quest.php
// Файл будет возвращать то что мы ему передали.

let id_post = 111;
let qty_post = 222;
let sendPostBtn = document.querySelector('.ajax-btn__post');
// console.log(sendBtn);
sendPostBtn.addEventListener('mousedown', sendBtnMousedownHandler);
// Указываем путь до файла на сервере, который будет обрабатывать наш запрос
const urlPost = 'https://demindesign.ru/ajax_post.php';

// Так же как и в GET составляем строку с данными, но уже без пути к файлу
const paramsPOST = 'id_post=' + id_post+ '&qty_post=' + qty_post;

function sendBtnMousedownHandler() {
  let eventCounter = 0;
  // Создаем экземпляр класса XMLHttpRequest
  const requestPost = new XMLHttpRequest();
  /* Указываем
  - что соединение у нас будет POST,
  - говорим что путь к файлу в переменной url,
  - и что запрос асинхронный, (по умолчанию).*/
  requestPost.open('POST', urlPost, true);
  console.log('open - readyState = ' + requestPost.readyState);

  //В заголовке говорим что тип передаваемых данных закодирован.
  requestPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  console.log('send - readyState = ' + requestPost.readyState);
  requestPost.send(paramsPOST);

    requestPost.addEventListener('readystatechange', (evt) => {
      console.log('_________________________________ eventCounter = '+ (++eventCounter));
      console.log('evt.type = ' + evt.type);
      console.log('readyState = ' + requestPost.readyState);

      if(requestPost.readyState === 4 && requestPost.status === 200) {
        console.log('_________________________________ status 200 = ');
        console.log('readyState = ' + requestPost.readyState);
        console.log(requestPost.responseText);
      }
  });
}
