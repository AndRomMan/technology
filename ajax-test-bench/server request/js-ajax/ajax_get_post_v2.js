/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
'use strict';
// ajax_echo_post.php
// ajax_echo_get.php

const ajaxGetBtn = document.querySelector('.ajax-get-btn');
const ajaxPostBtn = document.querySelector('.ajax-post-btn');
ajaxGetBtn.addEventListener('click', ajaxGetBtnClickHandler);
ajaxPostBtn.addEventListener('click', ajaxPostBtnClickHandler);

// объект для отправки
let userObj = {
  name: 'Trick&Tim',
  age: 23,
};

// Чтоб избежать неожиданных запросов к серверу, вам следует вызывать
// encodeURIComponent для любых вводимых пользователем параметров,
// используемых как часть URI.
// let encodeName = encodeURIComponent(userObj.name); // Tom%26Tim
// console.log(encodeName);
// При необходимости мы можем выполнить обратное декодирование с помощью функции
//  decodeURIComponent():
// let decodeName = decodeURIComponent(encodeName); // Tom&Tim
// console.log(decodeName);

// строка с параметрами для отправки
let output = 'name=' + userObj.name + '&age=' + userObj.age;
output = 'name=' + encodeURIComponent(userObj.name) + '&age=' + encodeURIComponent(userObj.age);

function ajaxGetBtnClickHandler() {
  let request = new XMLHttpRequest();

  // request.open('GET', 'ajax_echo_get.php');
  // request.open('GET', 'https://demindesign.ru/phpserver/ajax_echo_get.php');
  // request.open('GET', 'https://demindesign.ru/phpserver/ajax_ip.php');
  // request.open('GET', 'http://phpserver/ajax_ip.php');
  console.log(output);
  // Не забываем ? отделяющий GET параметры запроса от URL
  // Разделителем между параметрами служит знак «&»
  request.open('GET', 'http://phpserver/ajax_echo_get.php?' + output);
  request.send();

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status === 200) {
      console.log('========== request ==========');
      console.log(request);

      // console.log('response');
      // console.log(request.response);

      console.log('========== responseText ==========');
      console.log(request.responseText);
    }
  });
}

let postOutput = 'name=' + encodeURIComponent(userObj.name) + '&age=' + encodeURIComponent(userObj.age);

function ajaxPostBtnClickHandler() {
  let request = new XMLHttpRequest();
  console.log(`postOutput = ${postOutput}`);

  // request.open('POST', 'ajax_echo_post.php');
  // request.open('GET', 'https://demindesign.ru/phpserver/ajax_echo_post.php');
  request.open('POST', 'http://phpserver/ajax_echo_post.php');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(postOutput);

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status === 200) {
      console.log('========== request ==========');
      console.log(request);

      // console.log('---------- response');
      // console.log(request.response);

      console.log('========== responseText ==========');
      console.log(request.responseText);
    }
  });
}
