/* eslint-disable no-console */
'use strict';

// business-server-request.js

(function () {
  function ajaxPostRequest(inputData) {
    let inputDataTemplate = {
      name: 'Username',
      email: 'newmail@gmail.com',
      kits: ['s', 'm', 'l', 'xl'],
    };

    $.ajax({
      url: 'ajax_post_bench.php',
      type: 'POST',
      dataType: 'text',
      data: inputDataTemplate,

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
    console.groupCollapsed('Server Error Status');
    console.log(`errorThrown: ${errorThrown}`);
    console.log(`textStatus: ${textStatus}`);
    console.log(`statusText: ${jqXHR.statusText}`);
    console.log(`readyState: ${jqXHR.readyState}`);
    console.groupEnd('Server Error Status');

    console.groupCollapsed('Response Text');
    console.log(`responseText: ${jqXHR.responseText}`);
    console.groupEnd('Response Text');

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
