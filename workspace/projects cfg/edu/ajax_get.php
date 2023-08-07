<?php

if (isset($_GET)) {
  $input = $_GET['page'];

  $output = $input;

  $card = '<li class="courses-list__item js-course-item">
  <div class="course-card">
    <a class="course-card__wrapper-link js-course-link" href="#" title="Интенсив">
      <div class="course-card__inner">
        <h3 class="course-card__title">Check card</h3>
        <p class="course-card__start-date">Начало 28 февраля</p>
        <h4 class="course-card__subtitle">Подгруженная карта курса</h4>
        <p class="course-card__price">
          <span class="course-card__price-value">Бесплатно</span>
        </p>
        <div class="course-card__image-wrapper">
          <img class="course-card__image course-card__image_desktop" src="/wp-content/themes/td-edu/assets/image/our-courses/card-1@1x.jpg" srcset="/wp-content/themes/td-edu/assets/image/our-courses/card-1@2x.jpg" 2x="" width="160" height="160" aria-hidden="true" alt="" style="-webkit-mask-image: url(/wp-content/themes/td-edu/assets/image/our-courses/mask-1x120.svg); mask-image: url(/wp-content/themes/td-edu/assets/image/our-courses/mask-1x120.svg);">
          <img class="course-card__image course-card__image_mobile" src="/wp-content/themes/td-edu/assets/image/our-courses/card-1@1x.jpg" srcset="/wp-content/themes/td-edu/assets/image/our-courses/card-1@2x.jpg" 2x="" width="80" height="80" aria-hidden="true" alt="" style="-webkit-mask-image: url(/wp-content/themes/td-edu/assets/image/our-courses/mask-1x80.svg); mask-image: url(/wp-content/themes/td-edu/assets/image/our-courses/mask-1x80.svg);">
        </div>
      </div>
    </a>
  </div>
</li>';


  for ($i=0; $i < 5; $i++) {
    $html = $html . $card;
  }




}

// echo $output;
echo $html;

?>
