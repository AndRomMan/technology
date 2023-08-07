/* eslint-disable no-console */
'use strict';

// serverRequest.js

function ajaxPostRequest(inputData) {
  console.log(JSON.stringify(inputData));

  // Метод POST

  fetch('ajax_post.php', {
    method: 'POST',
    body: JSON.stringify(inputData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      // return response.json();
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch(function (err) {
      console.error('Error!', err);
    });

  // newFoundationPercent
  // newHelpUsPercent

  // Метод GET
  // fetch('ajax_get.php')
  //   .then((response) => {
  //     // return response.text(); // получение от сервера текстовых данных $data
  //     return response.json(); // получение от сервера $data_json
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });
}

export {ajaxPostRequest};
