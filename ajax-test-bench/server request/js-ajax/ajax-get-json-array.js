/* eslint-disable no-console */
'use strict';

// NOT: ajax-get-json-array.js
// функция для получения из php массива, преобразованного в json объект
(function () {
  function ajaxRequest(value) {
    $.ajax({
      url: '/technology/ajax-test-bench/ajax_echo_get.php',
      type: 'GET',
      data: {title: value},
      // NOT: если dataType: 'text', то необходимо распарсить JSON
      // dataType: 'text',
      dataType: 'json',
      beforeSend() {},
      complete() {},
      success(response) {
        // NOT: если dataType:const => jsonData = JSON.parse(response);
        // NOT: window.suggestionGetResult.suggestionRendering(jsonData);
        window.suggestionGetResult.suggestionRendering(response);
      },
      error(xhr, ajaxOptions, thrownError) {
        console.log('Error state');
        console.log(thrownError);
        console.log('Status text:');
        console.log(xhr.statusText);
        console.log('Response Text:');
        console.log(xhr.responseText);
      },
    });
  }

  window.ajaxGetJsonArray = {
    ajaxRequest,
  };
})();
