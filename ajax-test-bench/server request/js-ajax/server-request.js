// server-request.js

/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
'use strict';

// План работы с объектом XMLHttpRequest:

// 1. Создание объекта XMLHttpRequest
// 2. Установка обработчика события onreadystatechange
// 3. Открытие соединения с сервером методом open
// 4. Отправка запроса методом send

const ajaxBtn = document.querySelector('.ajax-btn');
const TIMEOUT_MS = 5000;

ajaxBtn.addEventListener('click', ajaxBtnClickHandler);

function ajaxBtnClickHandler(evt) {
  console.log(evt.type);
  getServerResponse();
}

function getServerResponse() {
  // этап 1 инициализируем переменную новым объектом XMLHttpRequest
  let xhr = new XMLHttpRequest();

  //  Если значение не задано,
  // будет использовано значение по умолчанию xhr.responseType = 'text';
  // xhr.responseType = 'json';

  // Время в миллисекундах, после которого запрос будет отменен.
  // Значение 0 (по умолчанию) значит что таймаута не будет. Никогда.
  xhr.timeout = TIMEOUT_MS;

  // этап 2 определяем параметры для запроса
  // xhr.open('GET', 'https://httpbin.org/get');
  // xhr.open('POST', 'https://httpbin.org/post');
  xhr.open('GET', 'http://phpserver/ajax_ip.php');

  // Для POST запроса устанавливает значения HTTP заголовков
  //  Content-Type, чтобы сервер знал в какой кодировке пришёл
  //  к нему запрос и смог его расшифровать.

  // 'Content-Type': 'application/json;charset=utf-8'
  // 'Content-Type': 'application/json'
  // 'Content-Type': 'text/plain;charset=UTF-8'
  // 'Content-Type': 'application/x-www-form-urlencoded'

  // Метод setRequestHeader()  следует вызывать
  //  только после  open(), но до send()!
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // этап 3 отправляем запрос на сервер
  xhr.send();

  // этап 4 обрабатываем событие изменения состояния документа readyState
  // Свойство Document.readyState описывает состояние загрузки document.
  // Когда значение этого свойства изменяется,
  //  в объекте document запускается событие readystatechange.

  // Кроме обработки события readystatechange для получения ответа сервера
  // можно также обрабатывать событие load, которое возникает после
  // выполнения запроса.
  xhr.addEventListener('readystatechange', stateChangeHandler);

  // 5 отслеживание прогресса загрузки
  xhr.addEventListener('progress', progressHandler);

  // 6 текущий запрос отменяем
  // У браузера есть лимит - два одновременных подключения к домену-порту.
  // Третье будет открыто только после завершения сеанса
  //  одно из предыдущих двух (по таймауту).

  // xhr.abort();
}

// В старом коде вы можете встретить свойства xhr.responseText
//  и даже xhr.responseXML. Они существуют по историческим причинам,
//  раньше с их помощью получали строки или XML-документы.
//  Сегодня следует устанавливать желаемый тип объекта в
//  xhr.responseType и получать xhr.response

const progressHandler = (e) => {
  // console.log('SERVER progress', e);
  // console.log('SERVER total = ', e.total);
  // console.log('SERVER lengthComputable = ', e.lengthComputable);
  console.log('SERVER loaded = ', e.loaded);
};

// Вы можете наткнуться на обработчики события
// readystatechange в очень старом коде,
// так уж сложилось исторически, когда-то не было событий load и других.
// Сегодня из-за существования событий
// load/error/progress
//  можно сказать, что событие readystatechange «морально устарело».

function stateChangeHandler() {
  // console.log(this.status);
  // console.log(this.readyState);

  // Состояния readyState
  //   На протяжении всего AJAX запроса меняется его состояние от 0 до 4
  //   1 (ОТКРЫТО): запрос начинается
  //   2 (HEADERS_RECEIVED): заголовки HTTP получены
  //   3 (ЗАГРУЗКА): начинается загрузка ответа
  //   4 (ВЫПОЛНЕНО): ответ был загружен

  if (this.readyState === 4 && this.status === 200) {
    console.log(this);

    // для POST http://ptsv2.com
    // Ответ, который приходит с сервера,
    //  всегда находится в свойстве responseText
    const dataT = this.response;
    console.log(dataT);

    // анализируем строку в формате JSON и инициализируем переменную значением, полученным в ходе анализа
    // const dataJ = JSON.parse(this.responseText);

    // анализируем строку в формате JSON и инициализируем переменную значением, полученным в ходе анализа
    // const data = JSON.parse(this.response);

    // responseText -
    // представление ответа сервера в виде обычного текста (строки)
    // Полный текст есть только при readyState=4
    // console.log(dataJ);

    // console.log(this.responseText);
  }
}

// =============================================================================
// const body = document.querySelector('body');

// окончание обмена данными с сервером можно отлавливать по событию "load"
// xhr.addEventListener('load', loadHandler);
// xhr.addEventListener('error', errorHandler);
// xhr.addEventListener('timeout', errorHandler);
// xhr.addEventListener('progress', errorHandler);
// xhr.addEventListener('abort', () => console.log('User abort loading!'));
// xhr.addEventListener('readystatechange', () => {
//   console.log(xhr.readyState);
// });

// let loadHandler = () => {
//   const posts = JSON.parse(xhr.response);
//   console.log(posts);

//   // for (let post of posts) {
//   //   const div = document.createElement('div');
//   //   const h2 = document.createElement('h2');
//   //   const p = document.createElement('p');

//   //   h2.textContent = post.title;
//   //   p.textContent = post.content;
//   //   div.appendChild(h2);
//   //   div.appendChild(p);
//   //   body.appendChild(div);
//   // }
// };

// const errorHandler = (e) => {
//   console.log('SERVER ERROR', e);
// };

// const progresHandler = (e) => {
//   console.log('PROGRESS', e);
// };
