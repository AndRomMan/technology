/* eslint-disable no-console */
'use strict';

// major-navigation-banners.js

(function () {
  document.addEventListener('DOMContentLoaded', initBannerSlider);

  function initBannerSlider() {
    // console.log('major-navigation-banners.js  = = = = = = = = = =  initBannerSlider');
    const APERTURE = 'js-slider-aperture';
    const TRACK = 'js-slider-track';
    const ITEM = 'js-slider-item';
    // высота баннера в shop\blocks\common\header_new\header_inner\major_navigation\major-navigation-banners.less
    const OFFSET_STEP = 40; // item height = link height = высота кадра в треке
    const SHOW_TIME = 1000;

    let aperture;
    let trackItemsNumber;
    let startCounter = 0;
    let stoppedTrack;
    let firstCounter = 0;
    let secondCounter = 0;
    let isActive;

    // делаем событие visibilityChange кроссбраузерным
    let hidden;
    let visibilityChange;
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

    startSlider();

    function startSlider() {
      aperture = document.querySelector(`.${APERTURE}`);

      if (aperture) {
        let track = aperture.querySelector(`.${TRACK}`);
        let items = aperture.querySelectorAll(`.${ITEM}`);

        if (track && items) {
          trackItemsNumber = items.length;
          aperture.addEventListener('mouseenter', stopMoving);
          aperture.addEventListener('mouseleave', startMoving);

          document.addEventListener(visibilityChange, visibilityChangeHandler, false);

          if (trackItemsNumber <= 0) {
            isActive = false;
          } else {
            isActive = true;
          }
        }

        firstTrackAutoPlay(SHOW_TIME, startCounter, track);
      }
    }

    // отключаем проигрывание слайдера баннеров после переключения на другую страницу
    // и включаем, после возвращения
    function visibilityChangeHandler() {
      // console.log('visibilityChangeHandler');
      // console.log(document[hidden]);
      if (document[hidden]) {
        stopMoving();
      } else {
        startMoving();
      }
    }

    function stopMoving() {
      isActive = false;
      let stoppedTracks = aperture.querySelectorAll(`.${TRACK}`);
      let stoppedTracksLength = stoppedTracks.length;
      if (stoppedTracksLength > 1) {
        stoppedTrack = stoppedTracks[stoppedTracksLength - 1];
      } else {
        stoppedTrack = stoppedTracks[0];
      }
    }

    function startMoving() {
      isActive = true;
      let trackType = stoppedTrack.dataset.track;

      if (trackType === 'first') {
        let removedTrack = aperture.querySelector(`.${TRACK}[data-track="second"]`);
        removeCurrentTrack(removedTrack);

        firstTrackAutoPlay(SHOW_TIME, firstCounter - 1, stoppedTrack);
        stoppedTrack = '';
      } else {
        let removedTrack = aperture.querySelector(`.${TRACK}[data-track="first"]`);
        removeCurrentTrack(removedTrack);

        secondTrackAutoPlay(SHOW_TIME, secondCounter - 1, stoppedTrack);
        stoppedTrack = '';
      }
    }

    function setSliderPositionUp(counter, trackToSetPositionUp) {
      // console.log('major-navigation-banners.js  = = = = = = = = = =  setSliderPosition');

      let movePosition = OFFSET_STEP * counter;
      trackToSetPositionUp.style.cssText = `transform: translateY(${-movePosition}px);`;
    }

    function removeCurrentTrack(removedTack) {
      if (removedTack) {
        removedTack.remove();
      }
    }

    function setNextTrack(previousTrack) {
      let nextTrack = previousTrack.cloneNode(true);
      nextTrack.style = '';
      // console.log(nextTrack.dataset.track);
      let track = nextTrack.dataset.track;

      if (track === 'first') {
        nextTrack.dataset.track = 'second';
      } else {
        nextTrack.dataset.track = 'first';
      }
      previousTrack.insertAdjacentElement('afterend', nextTrack);
      return nextTrack;
    }

    function firstTrackAutoPlay(showTime, start, innerCurrentTrack) {
      let newTrack;
      let innerCounter = start;
      firstCounter = innerCounter;
      setSliderPositionUp(innerCounter, innerCurrentTrack);

      let timerId = setInterval(function () {
        innerCounter += 1;
        firstCounter = innerCounter;

        if (innerCounter <= trackItemsNumber) {
          if (!isActive) {
            clearInterval(timerId);
            return;
          }
          setSliderPositionUp(innerCounter, innerCurrentTrack);
        } else {
          if (!isActive) {
            clearInterval(timerId);
            return;
          }
          if (innerCounter === trackItemsNumber + 1) {
            setSliderPositionUp(innerCounter, innerCurrentTrack);
            newTrack = setNextTrack(innerCurrentTrack);
            secondTrackAutoPlay(SHOW_TIME, 0, newTrack);
          } else {
            setSliderPositionUp(innerCounter, innerCurrentTrack);
            clearInterval(timerId);
            removeCurrentTrack(innerCurrentTrack);
            return;
          }
        }
      }, showTime);
    }

    function secondTrackAutoPlay(showTime, start, innerCurrentTrack) {
      let newTrack;
      let innerCounter = start;
      secondCounter = innerCounter;
      setSliderPositionUp(innerCounter, innerCurrentTrack);

      let timerId = setInterval(function () {
        innerCounter += 1;
        secondCounter = innerCounter;

        if (innerCounter <= trackItemsNumber) {
          if (!isActive) {
            clearInterval(timerId);
            return;
          }
          setSliderPositionUp(innerCounter, innerCurrentTrack);
        } else {
          if (!isActive) {
            clearInterval(timerId);
            return;
          }
          if (innerCounter === trackItemsNumber + 1) {
            setSliderPositionUp(innerCounter, innerCurrentTrack);
            newTrack = setNextTrack(innerCurrentTrack);
            firstTrackAutoPlay(SHOW_TIME, 0, newTrack);
          } else {
            setSliderPositionUp(innerCounter, innerCurrentTrack);
            clearInterval(timerId);
            removeCurrentTrack(innerCurrentTrack);
            return;
          }
        }
      }, showTime);
    }
  }
})();
