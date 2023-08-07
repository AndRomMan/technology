/* eslint-disable no-console */
'use strict';

// BM:  jQ-AJAX-request.js
(function () {
  function jqAjaxRequest(value) {
    // Короткая версия для получения массива
    // $.getJSON передает запрос только через GET.
    // $.getJSON('/json.php', function(data) {
    // 	console.log(data.text);
    // 	console.log(data.error);
    // });

    // Низкоуровневый запрос - AJAX метод
    $.ajax({
      url: '/technology/ajax-test-bench/ajax_echo_get_json_array.php',
      type: 'GET',
      //  По умолчанию 'GET'

      data: {title: value},
      //  data: данные, отправляемые вместе с запросом на сервер.
      //  Тип данных: строка или объект javascript
      // data — данные, которые будут отправлены на сервер.
      //  Они должны быть представлены в форме объекта,
      //  в формате: {fName1:value1, fName2:value2, …}.

      dataType: 'json',
      //  dataType: тип получаемых от сервера данных.
      //  Варианты: html, xml, json, jsonp, text, script

      // cache: указывает, будет ли ответ кэшироваться веб-браузером.
      // Тип данных: булевое значение. По умолчанию true.
      // И false по умолчанию для запросов, у которых параметр dataType имеет значение 'script' или 'jsonp'

      // timeout: время в миллисекундах ожидания ответа на запрос

      // Локальные AJAX Events:
      //      beforeSend — срабатывает перед отправкой запроса
      //  позволяет редактировать XMLHttpRequest

      //      error — если произошла ошибка

      //      complete — срабатывает по окончанию запроса
      // complete(jqXHR, textStatus)
      //  срабатывает по завершению текущего AJAX запроса (с ошибкои или без — срабатывает всегда)

      //      success — Срабатывает по возвращению ответа,
      //  когда нет ошибок ни сервера, ни вернувшихся данных.
      // success (data, textStatus, jqXHR)
      //  — пользовательская функция, которая будет вызвана после ответа сервера.
      // data — данные, присланные с сервера.
      // textStatus — статус того, как был выполнен запрос.
      // jqXHR — объект jqXHR (в версиях до jquery-1.5, вместо него использовался XMLHttpRequest)

      //  функцию beforeSend использовать для отображения предзагрузчика
      //  функцию complete для его скрытия!

      //  CHECKIT D: замена методов success и error
      // В официальной документации по методу jQuery.ajax()
      // success(), error() и complete()
      //  заменены на
      // done(), fail() и always()

      success(response) {
        window.suggestionGetResult.suggestionRendering(response);
      },

      error(jqXHR, textStatus, errorThrown) {
        showErrorStatus(jqXHR, textStatus, errorThrown);
      },
      // вариант обработки ошибки
      // error: showJqXHRstatus(jqXHR, exception)
    });
  }

  function showErrorStatus(jqXHR, textStatus, errorThrown) {
    console.log(`errorThrown: ${errorThrown}`);
    console.log(`textStatus: ${textStatus}`);
    console.log(`statusText: ${jqXHR.statusText}`);
    console.log(`readyState: ${jqXHR.readyState}`);
    console.log(`responseText: ${jqXHR.responseText}`);

    if (jqXHR.status === 0) {
      console.log('Not connect. Verify Network.');
    } else if (jqXHR.status === 404) {
      console.log('Requested page not found (404).');
    } else if (jqXHR.status === 500) {
      console.log('Internal Server Error (500).');
    }

    // responseText - ответ сервера в виде простого текста
    // statusText - возвращает статус запроса в виде текста
    // xhr - XMLHTTPRequest объект
    // readyState: возвращает состояние запроса.
    // Имеет значения от 0 (запрос не отправлен) до 4 (запрос завершен)
    // status: возвращает код статуса HTTP, который получает от сервера

    //  textStatus -  статус выполнения запроса
    // строковое значение:
    //  success, notmodified, error, timeout, abort, или parsererror
  }

  function showJqXHRstatus(jqXHR, exception) {
    if (jqXHR.status === 0) {
      console.log('Not connect. Verify Network.');
    } else if (jqXHR.status === 404) {
      console.log('Requested page not found (404).');
    } else if (jqXHR.status === 500) {
      console.log('Internal Server Error (500).');
    } else if (exception === 'parsererror') {
      console.log('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
      console.log('Time out error.');
    } else if (exception === 'abort') {
      console.log('Ajax request aborted.');
    } else {
      console.log('Uncaught Error. ' + jqXHR.responseText);
    }
  }

  // timeout
  // Тип: число: ms
  // Если это время будет превышено,
  // запрос будет завершен с ошибкой и произойдет событие error,
  // которое будет иметь статус «timeout».

  // Время отсчитывается с момента вызова функции $.ajax.
  // Может случиться так, что в этот момент будет запущено несколько других
  // запросов и браузер отложит выполнение текущего запроса.
  // В этом случае timeout может завершиться,
  // хотя фактически, запрос даже еще не был запущен.

  // statusCode
  // Набор пар, в котором кодам выполнения запроса сопоставляются
  // функции, которые при этом будет вызваны.
  // Например, для кода 404 (страницы не существуют)
  //  можно сделать вывод сообщения на экран:
  //     $.ajax({
  //   statusCode: {
  //     404: function() {
  //       alert( "page not found" );
  //     }
  //   }
  // });

  // https://codernote.ru/jquery/ajax/ajax-zapros/
  $.ajax({
    statusCode: {
      404() {
        alert('page not found');
      },
    },
  });

  function getJsonResponse() {
    // AJAX-запрос с помощью функции getJSON
    $.getJSON({
      url: 'pages.json',
      success(data) {
        // переменная, для хранения результата
        let output = '';
        // переберём все страницы
        for (let i in data.pages) {
          output += '<li><a href="' + data.pages[i].url + '">' + data.pages[i].title + '</a></li>';
        }
        // вставим список в элемент с id="pages"
        $('#pages').empty().append(output);
      },
    });
  }

  // Содержимое файла pages.json:
  // {
  //   "pages": [
  //     {"title": "Название статьи 1", "url": "/pages/1.html"},
  //     {"title": "Название статьи 2", "url": "/pages/2.html"},
  //     {"title": "Название статьи 3", "url": "/pages/3.html"},
  //     {"title": "Название статьи 4", "url": "/pages/4.html"},
  //     {"title": "Название статьи 5", "url": "/pages/5.html"}
  //   ]
  // }

  window.jqServerRequest = {
    jqAjaxRequest,
  };
})();
