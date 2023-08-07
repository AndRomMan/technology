/* eslint-disable no-console */
'use strict';

// #BUSINESS business-scroll.js

(function () {
  const FORM_ANCHOR = 'anchor-request-form';
  const ANCHOR_LINK = 'js-anchor-link';

  let anchorLinks = document.querySelectorAll(`.${ANCHOR_LINK}`);
  let targetAnchor = document.querySelector(`#${FORM_ANCHOR}`);

  function scrollInit() {
    if (anchorLinks && targetAnchor) {
      anchorLinks.forEach((anchorLink) => {
        console.log(anchorLink);
        anchorLink.addEventListener('click', anchorLinkClickHandler);
      });
    }
  }

  function anchorLinkClickHandler(evt) {
    evt.preventDefault();
    targetAnchor.scrollIntoView({
      // behavior: 'smooth',
      behavior: 'auto',
      block: 'start',
    });
  }

  window.businessScroll = {
    scrollInit,
  };
})();
