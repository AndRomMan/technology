/* eslint-disable no-console */
'use strict';

// major-navigation-banners.js

(function () {
  const APERTURE = 'js-slider-aperture';
  const TRACK_FIRST = 'js-banners__track-first';
  const TRACK_SECOND = 'js-banners__track-second';
  const TRACK_HIDDEN = 'banners__track_hidden';
  const ITEM = 'js-banners__item';
  // высота баннера см. major-navigation-banners.less
  // item height = link height = высота апертуры отображения активного баннера
  const OFFSET_STEP = 40;
  const SHOW_TIME = 3000;
  const LONG_START_TIME = SHOW_TIME;
  const SHORT_START_TIME = 50;

  let aperture;
  let trackStepsNumber;
  let trackFirst;
  let trackSecond;
  let firstTrackMovePosition = 0;
  let secondTrackMovePosition = 0;
  let activeState;
  let stopCounter = 0;
  let currentCounter = 0;

  let trackSecondStartPosition = 0;

  let sliderStartTimeId;
  let sliderMovementTimeId;

  // делаем событие visibilityChange кроссбраузерным
  let hidden;
  let visibilityChange;

  document.addEventListener('DOMContentLoaded', initBannerSlider);

  function initBannerSlider() {
    let isSliderFirstStart = true; // первый старт слайдера после инициализации

    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    // console.log('major-navigation-banners.js  = = = = = = = = = = 1  initBannerSlider');
    aperture = document.querySelector(`.${APERTURE}`);

    if (aperture) {
      trackFirst = aperture.querySelector(`.${TRACK_FIRST}`);

      if (trackFirst) {
        let items = trackFirst.querySelectorAll(`.${ITEM}`);
        trackStepsNumber = items.length;

        if (trackStepsNumber <= 1) {
          activeState = 'stop';
        } else {
          activeState = 'start';

          aperture.addEventListener('mouseenter', mouseEnterSliderHandler);
          aperture.addEventListener('mouseleave', mouseLeaveSliderHandler);
          document.addEventListener(visibilityChange, visibilityChangeHandler, false);
          trackSecondStartPosition = OFFSET_STEP * trackStepsNumber;
        }

        startSliderHandler(activeState, isSliderFirstStart);
      }
    }
  }

  function startSliderHandler(activeSliderState, isFirstStart) {
    // console.log('major-navigation-banners.js  = = = = = = = = = = 2  startSliderHandler');
    // console.log(`activeSliderState = ${activeSliderState}`);
    // console.log(`isFirstStart = ${isFirstStart}`);
    if (activeSliderState === 'stop') {
      return;
    } else {
      let startTime;
      if (isFirstStart) {
        startTime = LONG_START_TIME;
      } else {
        startTime = SHORT_START_TIME;
      }

      if (activeSliderState === 'start') {
        // console.log('major-navigation-banners.js  = = = = = = = = = = 2  startSliderHandler: start');
        trackFirst = aperture.querySelector(`.${TRACK_FIRST}`);
        trackSecond = aperture.querySelector(`.${TRACK_SECOND}`);

        if (trackFirst && trackSecond) {
          let startStepCounter = 0;
          if (isFirstStart) {
            trackFirst.style.top = '0px';
            trackSecond.style.top = `${trackSecondStartPosition}px`;
          }

          sliderTrackMovementCycle(startStepCounter, trackFirst, trackSecond, startTime);
        }
      } else if (activeSliderState === 'resume') {
        // console.log('major-navigation-banners.js  = = = = = = = = = = 2  startSliderHandler: resume');
        sliderTrackMovementCycle(stopCounter - 1, trackFirst, trackSecond, startTime);
      }
    }
  }

  function visibilityChangeHandler() {
    // console.log('visibilityChangeHandler');
    // console.log(document[hidden]);
    if (document[hidden]) {
      breakStartMovement();
    } else {
      activeState = 'resume';
      startSliderHandler(activeState, false);
    }
  }

  function mouseEnterSliderHandler() {
    // console.log('major-navigation-banners.js  = = = = = = = = = =  mouseEnterSliderHandler');
    breakStartMovement();
  }

  function mouseLeaveSliderHandler() {
    // console.log('major-navigation-banners.js  = = = = = = = = = =  mouseLeaveSliderHandler');
    console.log('active = resume');
    activeState = 'resume';
    startSliderHandler(activeState, false);
  }

  function breakStartMovement() {
    stopCounter = currentCounter;
    console.log('stop counter = ' + stopCounter);
    clearTimeout(sliderStartTimeId);
    clearInterval(sliderMovementTimeId);
  }

  // #TODO: изменить setSliderPositionUp: синхронизировать подъём 2-х треков (first, second)
  function setSliderTrackPositionUp(stepCounter, firstTrack, secondTrack) {
    // console.log('major-navigation-banners.js  = = = = = = = = = = 6  setSliderTrackPositionUp');
    // console.log('currnetCounter = ' + currentCounter);
    firstTrackMovePosition = -(OFFSET_STEP * stepCounter);
    secondTrackMovePosition = trackSecondStartPosition - OFFSET_STEP * stepCounter;

    firstTrack.style.top = `${firstTrackMovePosition}px`;
    if (firstTrack.classList.contains(TRACK_HIDDEN)) {
      firstTrack.classList.remove(TRACK_HIDDEN);
    }
    secondTrack.style.top = `${secondTrackMovePosition}px`;
    if (secondTrack.classList.contains(TRACK_HIDDEN)) {
      secondTrack.classList.remove(TRACK_HIDDEN);
    }
  }

  function restartSliderMoveventCycle(firstTrack, secondTrack) {
    // console.log('major-navigation-banners.js  = = = = = = = = = =  7  sliderTracksExchange');
    clearInterval(sliderMovementTimeId);

    firstTrack.classList.add(TRACK_SECOND);
    firstTrack.classList.remove(TRACK_FIRST);

    secondTrack.classList.add(TRACK_FIRST);
    secondTrack.classList.remove(TRACK_SECOND);

    firstTrack.classList.add(TRACK_HIDDEN);
    firstTrack.style.top = `${trackSecondStartPosition}px`;
    secondTrack.insertAdjacentElement('afterend', firstTrack);
    firstTrack.classList.remove(TRACK_HIDDEN);

    let isSliderFirstStart = false; // повторный старт слайдера
    startSliderHandler('start', isSliderFirstStart);
  }

  function sliderTrackMovementCycle(startCounter, firstTrack, secondTrack, startTime) {
    // console.log('major-navigation-banners.js  = = = = = = = = = = 3  sliderTrackMovementCycle');
    currentCounter = startCounter + 1;

    sliderStartTimeId = setTimeout(() => {
      // console.log('major-navigation-banners.js  = = = = = = = = = = 4  timeout start');

      setSliderTrackPositionUp(currentCounter, firstTrack, secondTrack);

      sliderMovementTimeId = setInterval(function () {
        // console.log('major-navigation-banners.js  = = = = = = = = = = 5  setInterval start');

        currentCounter += 1;

        if (currentCounter <= trackStepsNumber) {
          setSliderTrackPositionUp(currentCounter, firstTrack, secondTrack);
        } else {
          restartSliderMoveventCycle(firstTrack, secondTrack);
        }
      }, SHOW_TIME);
    }, startTime);
  }
})();
