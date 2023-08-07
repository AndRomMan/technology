/* eslint-disable no-console */
'use strict';

// #BUSINESS business-server-request.js

(function () {
  function ajaxPostRequest(inputData) {
    let jsonInputData = JSON.stringify(inputData);

    $.ajax({
      url: 'ajax_post_echo_bench.php',
      type: 'POST',
      // data: {inputData},
      // data: {userData: jsonInputData},
      // dataType: 'text',
      data: {
        name: inputData.name,
        email: inputData.email,
        kits: inputData.kits,
      },
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
