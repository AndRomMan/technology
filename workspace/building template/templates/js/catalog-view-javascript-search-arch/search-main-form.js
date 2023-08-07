/* eslint-disable no-console */
'use strict';

// catalog/view/theme/default/template/product/search.twig
// #SHOP search-main-form.js

(function () {
  // форма поиска на странице с результатами поиска
  const FORM_CLASS = 'js-main-suggest';
  const INPUT_CLASS = 'js-main-suggest-field';
  const SUBMIT_BUTTON_CLASS = 'js-main-suggest-submit';
  const MAIN_CLASS = 'js-search-result';

  const SUGGEST_SELECTOR_CLASS = 'js-main-suggest-selector';
  const SUGGEST_BUTTON_CLASS = 'js-suggest-button';
  const HIDE_CLASS = 'is-hidden';
  const SEARCH_VALUE_KEY = 'shopSearchValue';
  const DEBOUNCING_DELAY = 500;

  let searchForm;
  let searchInput;
  let submitButton;
  let suggestSelector;

  function mainFormLoadedHandler() {
    // console.log('9 main Form Loaded Handler');
    // console.log('10 init Main Search Form - start');
    let container = document.querySelector(`.${MAIN_CLASS}`);
    if (container) {
      initMainSearchForm(container);
    }
  }

  function initMainSearchForm(highLevelContainer) {
    // console.log('10 init Main Search Form');

    if (highLevelContainer) {
      searchForm = highLevelContainer.querySelector(`.${FORM_CLASS}`);
      searchInput = searchForm.querySelector(`.${INPUT_CLASS}`);
      submitButton = searchForm.querySelector(`.${SUBMIT_BUTTON_CLASS}`);
      suggestSelector = searchForm.querySelector(`.${SUGGEST_SELECTOR_CLASS}`);
    }

    if (searchForm && searchInput && submitButton && suggestSelector) {
      searchInput.addEventListener('input', searchInputChangeHandler);
      searchForm.addEventListener('reset', searchFormResetHandler);

      searchForm.addEventListener('submit', formSubmitHandler);
      submitButton.addEventListener('click', submitButtonClickHandler);

      searchInput.value = localStorage.getItem(SEARCH_VALUE_KEY);
      localStorage.removeItem(SEARCH_VALUE_KEY);

      // загрузка листа подсказок
      // console.log('11 fill Main Suggest List - start');
      window.searchSuggestRendering.fillMainSuggestList();
      // console.log('12 init Main Suggest - start ');
      window.searchMainSuggest.initMainSuggest();
    }
  }

  // CHECKIT D: formKeydownHandler
  function formSubmitHandler(evt) {
    evt.preventDefault();
    callRequest();
  }

  function submitButtonClickHandler(evt) {
    evt.preventDefault();
    delayedRequest();
  }

  // для запроса по AJAX
  let delayedRequest = window.commonFunctions.preventDebounce(callRequest, DEBOUNCING_DELAY);

  function searchInputChangeHandler() {
    let enteredText = this.value;
    if (enteredText === '') {
      clearSuggestBlock();
    }
  }

  function clearSuggestBlock() {
    if (suggestSelector) {
      suggestSelector.classList.add(HIDE_CLASS);

      let suggestButtons = suggestSelector.querySelectorAll(`.${SUGGEST_BUTTON_CLASS}`);
      suggestButtons.forEach((btn) => {
        if (btn.classList.contains(HIDE_CLASS)) {
          return;
        } else {
          btn.classList.add(HIDE_CLASS);
        }
      });
    }
  }

  function searchFormResetHandler() {
    searchInput.focus();
    clearSuggestBlock();
  }

  function callRequest() {
    let inputValue = searchInput.value;
    if (inputValue === '') {
      return;
    }
    clearSuggestBlock();
    window.searchServerRequest.sendSearchInput(inputValue);
  }

  function clearForm() {
    searchForm.reset();
  }

  function closeSearchForm() {
    clearSuggestBlock();
    clearForm();
    searchInput.removeEventListener('input', searchInputChangeHandler);
    searchForm.removeEventListener('reset', searchFormResetHandler);
    // searchForm.removeEventListener('keydown', formKeydownHandler);
  }

  window.searchMainForm = {
    mainFormLoadedHandler,
    closeSearchForm,
    clearForm,
  };
})();
