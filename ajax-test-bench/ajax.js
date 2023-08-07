/* eslint-disable no-console */
'use strict';

(function () {
  function getHeaderSuggestList(value) {
    // console.log('5 get suggest list');
    $.ajax({
      // HINT: проверка поиска заголовков товаров через Get запрос
      // /index.php?route=product/search/searchTitle&title=Слово_поиска
      // 'Слово_поиска' - заменить на нужное
      url: 'index.php?route=product/search/searchTitle',
      type: 'GET',
      data: {title: value},
      dataType: 'json',
      success(response) {
        window.searchSuggestRendering.fillHeaderSuggestList(response);
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

  window.searchServerRequest = {
    getHeaderSuggestList,
  };
})();
