/* eslint-disable no-console */
'use strict';

// #SHOP search-get-result.js
(function () {
  const SEARCH_RESULT_HEAD = 'js-search-result-head';
  const SEARCH_RESULT_CONTENT = 'js-search-result-content';
  const SEARCH_INPUT = 'js-main-suggest-field';
  const SEARCH_VALUE_KEY = 'shopSearchValue';

  function pageRendering(htmlContent, value) {
    let resultHead = document.querySelector(`.${SEARCH_RESULT_HEAD}`);
    let currentContentBlock = document.querySelector(`.${SEARCH_RESULT_CONTENT}`);
    // изменяем заголовок станиц для вывода строки запроса
    document.title = `Поиск - ${value}`;

    if (currentContentBlock) {
      currentContentBlock.remove();
    }

    if (resultHead) {
      let searchInput = resultHead.querySelector(`.${SEARCH_INPUT}`);
      searchInput.value = localStorage.getItem(SEARCH_VALUE_KEY);
      resultHead.insertAdjacentHTML('afterend', htmlContent);
      localStorage.removeItem(SEARCH_VALUE_KEY);
    }
  }
  window.searchGetResult = {
    pageRendering,
  };
})();
