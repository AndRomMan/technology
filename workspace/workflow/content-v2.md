[TOC]

# Smart Device project

* * *

## Mockup setting

## Breakpoints & paddings

- 320px - 767px — mobile версия,
- 768px - 1023px — tablet версия,
- больше 1024px — desktop версия

## Размеры макетов

- 320px
- 768px
- 1366px

* * *

## Font set

```css
// 400, 500, 700
@include font_poppins($size, $line_height, $weight, $color) 

// 500, 600, 700
@include font_cormorant($size, $line_height, $weight, $color) 

// 500
@include font_cormorant_italic($size, $line_height, $weight, $color) 
```

- 400:  Regular
- 500:  Medium
- 600:  Semi-bold
- 700:  Bold

```css
font_robotcon($size, $line_height, $weight, $color);
font_ptmono($size, $line_height, $weight, $color);
font_mont($size, $line_height, $weight, $color);
```

```css
  /* 599 layer(s) (click to toggle names) */
  font-family: Poppins;
  font-weight: regular; // 400
  font-weight: medium; // 500
  font-weight: bold; // 700
```

```css
  /* 69 layer(s) (click to toggle names) */
  font-family: Cormorant Garamond;
  font-style: italic; 
  font-weight: medium; // 500
  font-weight: medium; // 500 + Italic

  font-weight: semibold; // 600
  font-weight: bold; // 700
```

### Резервный безопасный шрифт

```css
  font-family: "Poppins", "Arial", "Helvetica", sans-serif;
  font-family: "Cormorant Garamond", "Georgia", "Times New Roman", serif;
```

* * *

## Basic colors

```css
    /* total: 11  */

    /* 28 */
    $main-dark: #000000;
    /* 297 */
    $main-light: #ffffff;

    /* 381 */
    $dark-1d: #1d1613;
    $dark-2c: #1c1612;

    /* 112 */
    $dark-grey: #9b9997;
    /* 4 */
    $silver: #c4c4c4;

    /* 15 */
    $light-grey: #f0eae4;

    /* 41 */
    $extra-light-grey: #f6f5f4;


    /* 6 */
    $dark-brown: #563f33;
    /* 142 */
    $fade-sienna: #a87b62;
```

## Font colors

```css
  $font-darker: $dark-1d;
  $font-dark: $dark-1c;

  $font-grey: $dark-grey;
  $font-main-light: $main-light;
  $font-main-dark: $main-dark;
```

## Background colors

```css
  $back-main-dark: $main-dark;
  $back-main-light: $main-light;

  $back-fade: $fade-sienna;
  $back-brown: $dark-brown;
  $back-alfa: 0.7;
  /* background: rgba(86, 63, 51, 0.7); */
  $back-light-grey: $light-grey;
  $back-silver: $silver;
```

## Border colors

```css
  $shadow-main-dark: $main-dark;
  $border-main-light: $main-light;
  
  $border-fade: $fade-sienna;
  $shadow-alfa: 0.25;
```

* * *

## Sections

### desktop

### tablet

### mobile
