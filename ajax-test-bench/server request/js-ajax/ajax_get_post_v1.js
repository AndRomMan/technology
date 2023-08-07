/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
'use strict';
// ajax_echo_post.php
// ajax_echo_get.php

const ajaxGetBtn = document.querySelector('.get-btn');
const ajaxPostBtn = document.querySelector('.post-btn');

ajaxGetBtn.addEventListener('click', ajaxGetBtnClickHandler);
ajaxPostBtn.addEventListener('click', ajaxPostBtnClickHandler);

function ajaxGetBtnClickHandler() {
  let request = new XMLHttpRequest();
  // request.open('GET', 'http://phpserver/ajax_ip.php');
  // request.open('GET', 'http://ajax-site/ajax_echo_get.php');
  request.open('GET', 'http://ajax-site/test_json_data.php');
  request.send();
  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status === 200) {
      console.log('----------  server request');
      console.log(request);

      console.log('---------- response from server: ');
      console.log(request.response);

      console.log('---------- JSON: ');
      const jsonData = JSON.parse(request.response);
      console.log(jsonData);
    }
  });
}

function ajaxPostBtnClickHandler() {
  let request = new XMLHttpRequest();

  request.open('POST', 'http://ajax-site/ajax_echo_post.php');

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  let userObj = {username: 'Ivan'};

  let output = JSON.stringify(userObj);
  request.send(output);

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status === 200) {
      console.log('---------- request');
      console.log(request);

      console.log('---------- response');
      console.log(request.response);

      console.log('---------- responseText');
      console.log(request.responseText);

      // console.log('---------- responseText');
      // console.log(request.responseText);
      // const jsonText = JSON.parse(request.responseText);
      // console.log(jsonText);
    }
  });
}
