// ajax_ip.js

/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
'use strict';

let userObj = {
  username: 'Ivan',
  userage: 44,
};

let postOutput = 'username=' + encodeURIComponent(userObj.username) + '&userage=' + encodeURIComponent(userObj.userage);

let sendBtn = document.querySelector('.btn-send');
sendBtn.addEventListener('click', ajaxPostBtnClickHandler);

// Для создания объекта FormDatа, содержащего данные существующей формы (<form>)
// передайте форму в качестве аргумента при создании объекта FormData
// FormData будет использовать только те поля ввода, которые используют атрибут name

function ajaxPostBtnClickHandler(evt) {
  evt.preventDefault();
  let request = new XMLHttpRequest();

  let form = document.querySelector('form');
  let outFormData = new FormData(form);
  // for (let key of outFormData.keys()) {
  //   console.log(`${key}: ${outFormData.get(key)}`);
  // }

  console.log(...outFormData);

  request.open('POST', 'http://phpserver/ajax_formdata_post.php');
  // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

//  HTML-формы предоставляют три метода кодирования.

//     application/x-www-form-urlencoded (по умолчанию)
//     multipart/form-data (если надо передавать файлы)
//     text/plain -  плохой!


  // Для отправки данных в формате json нам необходимо установить соответствующий
  // заголовок и сериализовать данные с помощью метода JSON.stringify:
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  // Объекты FormData всегда отсылаются с заголовком
  // Content-Type: form/multipart,
  // этот способ кодировки позволяет отсылать файлы.

  // Если нам больше нравится формат JSON, то используем JSON.stringify
  // и отправляем данные как строку.
  // Важно не забыть поставить соответствующий заголовок
  // Content-Type: application/json,
  //  многие серверные фреймворки автоматически декодируют JSON при его наличии:
  // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  // request.responseType = 'json';

  // request.send(formData);
  // console.log(postOutput);
  // request.send(postOutput);
  let jsonOut = JSON.stringify(postOutput);
  console.log(`json output = ${jsonOut}`);

  request.send(jsonOut);

  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status === 200) {
      console.log('========== request');
      console.log(request);

      console.log('========== responseText');
      console.log(request.responseText);

      console.log('========== response to json');
      let outJson = JSON.parse(request.response);
      console.log(outJson);
    }
  });
}
