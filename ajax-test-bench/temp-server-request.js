/* eslint-disable no-console */
'use strict';

// #SHOP search-server-request.js
(function () {
  const SEARCH_VALUE_KEY = 'shopSearchValue';

  // запрос на поиск из формы в header и редирект на страницу результатов
  function redirectToSearchResult(value) {
    localStorage.setItem(SEARCH_VALUE_KEY, value);
    // window.location.href = `https://shop.local/search/?search=${value}`;
    window.location.href = `/search/?search=${value}`;
  }

  // запрос на получение списка поисковых подсказок
  function getSuggestList(value) {
    // console.log('5 get suggest list');
    $.ajax({
      // NOT: Проверка поиска заголовков товаров через Get запрос
      // /index.php?route=product/search/searchTitle&title=Слово_поиска
      // 'Слово_поиска' - заменить на нужное
      url: 'index.php?route=product/search/searchTitle',
      type: 'GET',
      data: {title: value},
      dataType: 'json',
      success(response) {
        // console.log('6 fill header suggest list - start');
        window.searchSuggestRendering.fillHeaderSuggestList(response);
      },
      error(jqXHR, textStatus, errorThrown) {
        showErrorStatus(jqXHR, textStatus, errorThrown);
      },
    });
  }

  // запрос на поиск из формы на странице результатов поиска
  function sendSearchInput(value) {
    localStorage.setItem(SEARCH_VALUE_KEY, value);
    ajaxRequest(value);
  }

  function ajaxRequest(value) {
    // NOT: Проверка поиска товаров через Get запрос
    // window.location.href = `https://shop.local/search/?search=${value}`;
    $.ajax({
      url: 'index.php?route=product/search/index',
      type: 'GET',
      data: {search: value},
      dataType: 'html',
      success(response) {
        window.searchGetResult.pageRendering(response);
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
    redirectToSearchResult,
    sendSearchInput,
    getSuggestList,
  };
})();
