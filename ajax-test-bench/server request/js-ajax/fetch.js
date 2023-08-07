// fetch.js

/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
'use strict';

let userObj = {
  username: 'Ivan',
  userage: 44,
};

let postOutput = 'username=' + encodeURIComponent(userObj.username) + '&userage=' + encodeURIComponent(userObj.userage);

let fetchBtn = document.querySelector('.ajax-fetch-btn');
let fetchLocalBtn = document.querySelector('.ajax-fetch-local-btn');

// fetchBtn.addEventListener('click', fetchBtnClickHandler);
fetchBtn.addEventListener('click', getPost);
fetchLocalBtn.addEventListener('click', fetchLocalBtnClickHandler);

function getPost() {
  return fetch('http://phpserver/ajax_json_get.php').then((response) => {
    if (response.ok) {
      console.log(`response.ok = ${response.ok}`);
    }
    console.log(response);
    return response.text();
  });
}

getPost()
  .then((post) => console.log(post))
  .catch((err) => console.log(err));

function fetchBtnClickHandler(evt) {
  console.log(evt.type);
  fetch('http://phpserver/ajax_json_get.php')
    .then((response) => {
      if (response.ok) {
        console.log(`response.ok = ${response.ok}`);
      }
      console.log(response);
      return response.text();
    })
    .then((data) => {
      console.log(data);
    });
}

// чтобы ajax_echo_post_fetch.php вернул "имя" и "возраст"
// необходимо установить заголовок:
// 'Content-Type': 'application/x-www-form-urlencoded',

function fetchLocalBtnClickHandler(evt) {
  console.log(evt.type);
  console.log(JSON.stringify(userObj));
  console.log(postOutput);

  fetch('http://httpbin.org/post', {
    // fetch('http://phpserver/ajax_echo_post_fetch.php', {
    method: 'POST',
    // body: postOutput,
    body: JSON.stringify(userObj),

    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'text/plain;charset=UTF-8',
    },
  })
    .then((response) => {
      console.log(response);
      return response.text();
      // return response.json();
    })
    .then((texData) => {
      console.log(texData);
    });
}
