// / ____________________________________ // main.js
'use strict';

(function () {
  let onError = function (message) {
    console.error(message);
  };

  let onSuccess = function (data) {
    console.log(data);
  };

  // window.load('https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/unknownfile.json', onSuccess, onError);

  // window.load('https://up.htmlacademy.ru/assets/javascript/demo/8-xhr/data.json', onSuccess, onError);
  window.load('https://javascript.pages.academy/kekstagram', onSuccess, onError);

  // window.load('https://api.github.com/user', onSuccess, onError);
})();
