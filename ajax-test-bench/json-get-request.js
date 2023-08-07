/* eslint-disable no-console */
'use strict';

// #BUSINESS business-server-request.js

(function () {
  function ajaxPostRequest(inputData) {
    let outputData = JSON.stringify(inputData);
    console.log(outputData);

    $.ajax({
      // HINT: проверка поиска заголовков товаров через Get запрос
      // ajax_get_echo_bench.php
      // ajax_post_bench.php

      url: 'ajax_get_echo_bench.php',
      type: 'GET',
      data: {userData: outputData},
      dataType: 'text',
      success(response) {
        console.log(response);

        // window.businessMain.successRequest();
      },
      error(jqXHR, textStatus, errorThrown) {
        showErrorStatus(jqXHR, textStatus, errorThrown);
      },
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
  }

  window.businessServer = {
    ajaxPostRequest,
  };
})();
