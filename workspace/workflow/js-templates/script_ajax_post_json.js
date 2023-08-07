'use strict';

// 3. Post AJAX запрос на чистом JavaScript - возврат данных в формате JSON

let id_post_json = 111;
let qty_post_json = 222;
let sendPostBtnJSON = document.querySelector('.ajax-btn__json');
sendPostBtnJSON.addEventListener('mousedown', sendBtnMousedownHandler);

const urlPostJSON = 'https://demindesign.ru/ajax_post_json.php';
const paramsJSON = 'id_post_json=' + id_post_json + '&qty_post_json=' + qty_post_json;

function sendBtnMousedownHandler() {
  const requestPostJSON = new XMLHttpRequest();
  // Здесь нужно указать в каком формате мы будем принимать данные
  requestPostJSON.responseType = 'json';

  requestPostJSON.open('POST', urlPostJSON, true);
  requestPostJSON.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  requestPostJSON.addEventListener('readystatechange', () => {
    if(requestPostJSON.readyState === 4 && requestPostJSON.status === 200) {
      let obj = requestPostJSON.response;
      console.log(obj);
      // Здесь мы можем обращаться к свойству объекта и получать  его значение
      console.log(obj.id_post_json);
      console.log(obj.qty_post_json);
    }
});
  requestPostJSON.send(paramsJSON);
}

// =================================================
// var xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = "https://developer.mozilla.org/";

// xhr.open(method, url, true);
// xhr.onreadystatechange = function () {
//         if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             console.log(xhr.responseText);
//         };
//     };
// xhr.send();

// =================================================
// var request = new XMLHttpRequest();
//  function reqReadyStateChange() {
//     if (request.readyState == 4) {
//         var status = request.status;
//         if (status == 200) {
//             document.write(request.responseText);
//         } else {
//             document.write("Ответ сервера " + request.statusText);
//         }
//     }
// }

// request.open("GET", "http://localhost:8080/hello.txt");
// request.onreadystatechange = reqReadyStateChange;
// request.send();

// =================================================
// Отправка формы

// var formData = new FormData();
// formData.append('name', 'Tom');
// formData.append('age', 23);

// var request = new XMLHttpRequest();
// function reqReadyStateChange() {
//     if (request.readyState == 4 && request.status == 200)
//         document.getElementById("output").innerHTML=request.responseText;
// }

// request.open("POST", "http://localhost:8080/display.php");
// request.onreadystatechange = reqReadyStateChange;
// request.send(formData);

// =================================================
/* // после загрузки DOM модели
document.addEventListener('DOMContentLoaded', function() {
  // получим форму с id = "message"
  var message = document.getElementById('message');
  // при возникновении у формы события submit

  message.addEventListener('submit', function(evt) {
    // создадим объект FormData и добавим в него данные из формы
    var formData = new FormData(message);


    // создадим объект XHR
    var request = new XMLHttpRequest();

    // инициализируем запрос
    request.open('POST', 'process.php');

    // при изменении состояния запроса

    request.addEventListener('readystatechange', function() {
      // если запрос завершился и код ответа сервера OK (200), то
      if (this.readyState === 4 && this.status === 200) {

        // разбираем строку json, который вернул сервер и помещаем её в переменную data
        var data = JSON.parse(this.responseText);
        // создаём переменную, в которую будем складывать результат работы (маркированный список)
        console.log(data);
      }
    });

    // отправляем запрос на сервер
    request.send(formData);
    // отменяем отправку формы стандартным способом
    evt.preventDefault();
  });
}); */
// =================================================

// xhr.onreadystatechange = function() {
//   if (xhr.readyState == 3) {
//     // загрузка
//   }
//   if (xhr.readyState == 4) {
//     // запрос завершён
//   }
// };



// =================================================
