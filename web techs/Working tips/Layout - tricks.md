<!-- Layout Tricks -->

# Layout Tip & Tricks

[TOC]

***

## Убрать создание оберток для чекбоксов

 добавить класс`n-change` к классам input если старые стили перебивают новые в компоненте

 ```html
  <input class="item n-change" type="radio" 
  name="rating" value="4" aria-label="Полезно">
 ```

## Маски на изображение

* Стили

```less
// контейнер изображения
  .image-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
    outline: 1px solid black;

    width: 160px;
    height: 160px;
  }

// изображение
  .image {
    // mask: url(masks.svg#star);
    -webkit-mask-image: url("/wp-content/themes/td-edu/assets/image/our-courses/mask-1x80_min.svg");
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;

    mask-image: url("/wp-content/themes/td-edu/assets/image/our-courses/mask-1x80_min.svg");
    mask-repeat: no-repeat;
    mask-position: center;


    object-fit: cover;
    width: 100%;
    height: 100%;
  }
```

* Сжатый SVG файл-маска

__Важно задать для svg `width=""` и `height=""`__ для правильного позиционирования

```less
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
<path fill="#C4C4C4" d="M72.063 52.62c2.081-1.2 ... ... Z"/>
</svg>
```

## Ссылка открывается в другом окне

```html
<a href="" class="" title="" target="_blank" rel="noreferrer noopener"></a>
```

## Подчеркивание ссылок

```css
.link {
  &_underline,
  &-underline {
    border-bottom: 1px solid var(--np-light);
  }
}
```

## В input, где нужно вводить login/password/email и еще какие-то данные

Применяйте атрибут autocapitalize="off".
Действует только на мобильных. На реальной клавиатуре не срабатывает.

## Обрезка текста с многоточием

```css
.crop-line {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
```

## Правильное подключение тултипа

```html
{% if option_value.name == 'summary' %}
<button class="np-tooltip np-tooltip_help np-tooltip_attention np-tooltip_clicker js-np-tooltip">
  <span class="np-tooltip__content np-tooltip__content_medium np-tooltip__content_black np-tooltip__content_center">
    <span>Краткое содержание книги, выжимка полезных идей.</span>
    <span class="np-tooltip__arrow"></span>
    <span class="np-tooltip__close"></span>
  </span>
</button>
{% endif %}
```

## Градиентное исчезновение текста для справа

```scss
.text-fading(@_line-height) {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;

    width: 30%;
    height: @_line-height;

    background: linear-gradient(to right, transparent, white 50%);
  }
}
```

## Шрифты

### Параметры шрифтов

* размеры, насыщенность, высота строк, регистр, трекинг, цвет+прозрачность, межбуквенный интервал, капитализация

### Что мы должны узнать о тексте

* семейство и тип (наличие засечек)
* размер шрифта
* насыщенность (вес)
* начертание (курсив)
* цвет
* прозрачность / градиент / эффекты
* выравнивание
* межстрочный интервал
* межбуквенный интервал
* капитализация

* 100: Thin;
* 200: Extra Light (Ultra Light);
* 300: Light;
* 400: Normal (regular, auto);
* 500: Medium;
* 600: Semi-bold;
* 700: Bold;
* 800: Extra Bold (Ultra Bold);
* 900: Black (Heavy).

```css
font-size: 16px; /* размер шрифта */
line-height: 22px; /* auto, интерлиньяж стандартный — 120% */
```

## Тег datetime

`<p>Концерт состоялся <time datetime="2001-05-15 19:00">15 мая</time>.</p>`

## Адаптивная графика

```html
<picture>
  <source
    type="image/webp"
    media="(min-width: 1300px)"
    srcset="img/image-desktop@1x.webp 1x, img/image-desktop@2x.webp 2x"
  />
  <source
    type="image/webp"
    media="(min-width: 768px)"
    srcset="img/image-tablet@1x.webp 1x, img/image-tablet@2x.webp 2x"
  />
  <source type="image/webp" srcset="img/image-mobile@1x.webp 1x, img/image-mobile@2x.webp 2x" />

  <source media="(min-width: 1300px)" srcset="img/image-desktop@1x.png 1x, img/image-desktop@2x.png 2x" />
  <source media="(min-width: 768px)" srcset="img/image-tablet@1x.png 1x, img/image-tablet@2x.png 2x" />

  <img class="" src="img/image-mobile@1x.png" srcset="img/image-mobile@2x.png 2x" alt="" width="" height="" />
</picture>
```

### Ретинизация

```html
<img
  class=""
  src="/catalog/view/theme/default/image/image@1x.png"
  srcset="/catalog/view/theme/default/image/image@2x.png 2x"
  alt=""
  width=""
  height=""
/>
```       

#### Ретинизация background image

* (min-resolution: @retina-dpi)
* (min-resolution: @retina-dppx)

```css
 @media (min-resolution: 144dpi), (min-resolution: 1.5dppx) {
   …
 }
```

```css
@media (max-width: $tablet_breakpoint) {
  background-image: url('../img/back-image@1x.png');

  @media (min-resolution: $retina-dpi), (min-resolution: $retina-dppx) {
    background-image: url('../img/back-image@2x.png');
  }
}
```

```css
background-image: data-uri('../../image/icons/letter.svg');
```

## Плавная прокрутка к якорю

```scss
html {
  scroll-behavior: smooth;
}
```

```html
<a href="https://shop.local/business#request-form" class="kit-button">Заказать</a>
```

## Ссылки на background

```css
background-image: url('../../image/back_new@1x.png');
background-image: url('../../image/back_new@2x.png');
```

## Storage

```js
userFirstNameValue = userFirstName.value;

sessionStorage.setItem(userFirstNameKey, userFirstNameValue);

sessionStorage.removeItem(userFirstNameKey);
```
