/* eslint-disable no-console */
'use strict';

// #BUSINESS business-scroll.js

(function () {
  const FORM_ANCHOR = 'anchor-request-form';
  const ANCHOR_LINK = 'js-anchor-link';
  const TOP_OFFSET = 50;
  const SCROLL_TIME = 500;

  let anchorLinks = document.querySelectorAll(`.${ANCHOR_LINK}`);
  let targetAnchor = document.querySelector(`#${FORM_ANCHOR}`);

  function scrollInit() {
    if (anchorLinks && targetAnchor) {
      document.addEventListener('click', anchorLinksClickHandler);
    }
  }

  function anchorLinksClickHandler(evt) {
    evt.preventDefault();

    $('body').on('click', `.${ANCHOR_LINK}`, function (evt) {
      evt.preventDefault();
      $('html,body')
        .stop()
        .animate({scrollTop: $(this.hash).offset().top - TOP_OFFSET}, SCROLL_TIME);
    });
  }

  window.businessScroll = {
    scrollInit,
  };
})();
