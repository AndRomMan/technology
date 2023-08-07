/* eslint-disable no-console */
'use strict';

// search-saggets
(function () {
  function initSuggest() {
    suggestComponentJs.init();
  }

  const suggestComponentJs = new SuggestComponentJs();

  function SuggestComponentJs() {
    this.suggest = '.js-suggest'; // форма поиска
    this.suggestField = '.js-suggest-field'; // input
    this.suggestSelector = '.js-suggest-selector';
    this.suggestButton = '.js-suggest-button';

    this.highlighted = false;
    this.escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
  }

  SuggestComponentJs.prototype.init = function init() {
    const that = this;
    const suggestArr = document.querySelectorAll(that.suggest);

    for (let i = 0; i < suggestArr.length; i += 1) {
      let item = suggestArr[i];
      let itemId = item.dataset.id;
      let itemField = item.querySelector(that.suggestField);

      let itemSelector = item.querySelector(that.suggestSelector);
      let itemButtons = item.querySelectorAll(that.suggestButton);

      item.addEventListener('keydown', (e) => {
        that.keyDown(e, itemId);
      });

      itemField.addEventListener('input', (e) => {
        let field = e.target;

        for (let j = 0; j < itemButtons.length; j += 1) {
          let button = itemButtons[j];
          let buttonVal = button.dataset.name;
          let buttonUnit = button.dataset.unit;
          button.innerHTML = that.highlightSubstring(button, buttonVal, field.value);

          button.addEventListener('click', () => {
            itemField.value = buttonVal;
            itemField.dataset.unit = buttonUnit;
            itemSelector.classList.add('is-hidden');
            itemField.focus();
            // window.searchHeaderForm.initKeydownHandler();
          });
        }

        setTimeout(() => {
          let buttonActive = item.querySelector(that.suggestButton + '.is-active');
          let buttonVisible = item.querySelectorAll(that.suggestButton + ':not(.is-hidden)');
          if (buttonVisible.length) {
            if (buttonActive) {
              buttonActive.classList.remove('is-active');
            }
            that.highlighted = true;
            itemSelector.classList.remove('is-hidden');
            buttonVisible[0].classList.add('is-active');
          } else {
            that.highlighted = false;
            itemSelector.classList.add('is-hidden');
            if (buttonActive) {
              buttonActive.classList.remove('is-active');
            }
          }
        }, 0);
      });
    }
  };

  SuggestComponentJs.prototype.highlightSubstring = function highlightSubstring(button, string, fieldVal) {
    const that = this;
    const val = that.escapeRegExp(fieldVal).trim();
    const pattern = new RegExp(val, 'i');
    if (string.match(pattern) !== null) {
      button.classList.remove('is-hidden');
      return string.replace(pattern, (str) => `<b>${str}</b>`);
    } else {
      button.classList.add('is-hidden');
    }
    return string;
  };

  SuggestComponentJs.prototype.keyDown = function keyDown(e, id) {
    const that = this;
    const wrap = document.querySelector(`${that.suggest}[data-id='${id}']`);
    const field = wrap.querySelector(that.suggestField);
    const list = wrap.querySelector(that.suggestSelector);

    switch (e.keyCode) {
      // вверх
      case 38:
        e.preventDefault(); // чтобы не происходило прыжка каретки инпута в начало
        that.highlightPrevOption(list);
        break;
      // вниз
      case 40:
        that.highlightNextOption(list);
        break;
      // enter
      case 13:
        e.preventDefault();
        if (that.highlighted && !list.classList.contains('is-hidden')) {
          let buttonActive = wrap.querySelector(that.suggestButton + '.is-active');
          field.value = buttonActive.dataset.name;
          field.dataset.unit = buttonActive.dataset.unit;
          list.classList.add('is-hidden');
          // FIX D: del
          console.log('keydown 13 suggest');
          // window.searchHeaderForm.initKeydownHandler();
        }
        break;
      // escape
      // выход по Escape реализован в функции winEscapeHandler - ready.js
      case 27:
        list.classList.add('is-hidden');
        break;
      default:
    }
  };

  SuggestComponentJs.prototype.highlightPrevOption = function highlightPrevOption(list) {
    const that = this;
    const itemsArr = list.querySelectorAll(that.suggestButton + ':not(.is-hidden)');
    for (let i = 0; i < itemsArr.length; i++) {
      let item = itemsArr[i];
      let prevNum = i > 0 ? i - 1 : itemsArr.length - 1;
      let itemPrev = itemsArr[prevNum];
      if (item.classList.contains('is-active')) {
        let scrollPosition = prevNum * item.getBoundingClientRect().height;
        item.classList.remove('is-active');
        itemPrev.classList.add('is-active');
        if (list.scrollTop >= scrollPosition || i === 0) {
          list.scrollTop = scrollPosition;
        }
        break;
      }
    }
  };

  SuggestComponentJs.prototype.highlightNextOption = function highlightNextOption(list) {
    const that = this;
    const itemsArr = list.querySelectorAll(that.suggestButton + ':not(.is-hidden)');
    for (let i = 0; i < itemsArr.length; i++) {
      let item = itemsArr[i];
      let itemHeight = item.getBoundingClientRect().height;
      let nextNum = i < itemsArr.length - 1 ? i + 1 : 0;
      let itemNext = itemsArr[nextNum];
      if (item.classList.contains('is-active')) {
        let scrollPosition = nextNum * itemHeight;
        let visibleElements = Math.floor(list.getBoundingClientRect().height / itemHeight);
        item.classList.remove('is-active');
        itemNext.classList.add('is-active');
        if (list.scrollTop <= scrollPosition - (visibleElements - 1) * itemHeight) {
          list.scrollTop = scrollPosition - (visibleElements - 1) * itemHeight;
        }
        if (i === itemsArr.length - 1) list.scrollTop = 0;
        break;
      }
    }
  };

  window.searchSuggest = {
    initSuggest,
  };
})();
