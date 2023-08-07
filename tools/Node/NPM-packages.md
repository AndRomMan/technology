# Установка NPM пакетов

[TOC]

## NPM

### --save-dev `-D` - разработка: linters, compilators, task-runners

### --save `-S` - интегрируется в проект: libraries, frameworks

## ESlint

- eslint
- gulp-eslint
- eslint-plugin-prettier
- eslint-config-prettier
- eslint-config-htmlacademy

## Prettier

- prettier
- gulp-prettier

## Stylelint

- stylelint
- stylelint-scss
- stylelint-config-prettier
- stylelint-config-recommended-scss
- stylelint-config-htmlacademy

## Editorconfig

- @htmlacademy/editorconfig-cli

## Htmlhint

- gulp-htmlhint
- htmlhint

## @utils

- @utils/logotypes
- @utils/socials

- @utils/button
- @utils/css-variables
- @utils/form-checkbox
- @utils/form-fieldset
- @utils/form-input
- @utils/tooltip
- @utils/cookie-notice
- @utils/categories
- @utils/donate-form
- @utils/header
- @utils/pagination

## Работа с изображением

- gulp-imagemin
- gulp-svgmin
- gulp-svgstore
- imagemin-pngquant
- imagemin-webp

## Babel

- gulp-babel
- @babel/core
- @babel/preset-env
- @babel/runtime-corejs3

## Пакеты команд для установки

- gulp-csso  - 2 years
- gulp-concat - 5 years
- gulp-plumber - 3 years
- gulp-rename - 2 years

***

### Linting & Formatting

- **eslint**
  `npm i -D eslint eslint-config-htmlacademy eslint-config-prettier eslint-plugin-prettier`
  
- **stylelint**
  `npm i -D stylelint stylelint-scss stylelint-config-recommended-scss stylelint-config-htmlacademy stylelint-config-prettier`

- **prettier**
  `npm i -D prettier`

- **htmlhint**
  `npm i -D gulp-htmlhint htmlhint`

### Compressing HTML

`npm i -D gulp-html-minifier-terser html-minifier-terser`

### Compressing JS

`npm i -D gulp-terser core-js`

### Image compressing

`npm i -D gulp-imagemin gulp-svgmin gulp-svgstore imagemin-pngquant imagemin-webp`

### Gulp

`npm i -D gulp gulp-concat gulp-plumber gulp-rename gulp-sourcemaps`

### Components

`npm i -S @utils/button @utils/css-variables @utils/form-checkbox @utils/form-fieldset @utils/form-input @utils/tooltip @utils/cookie-notice @utils/categories @utils/donate-form @utils/header @utils/pagination`

### Server

`npm i -D browser-sync`

### Tools

- **files**
  `npm i -D del rimraf`
  `npm i -D gulp-file-include`

### CSS Tools

- **css**: **postcss-csso** лучше, чем cssnano

`npm i -D gulp-postcss postcss r postcss-csso postcss gulp-sass gulp-csso gulp-autoprefixer autoprefixer`

### Babel

`npm i -D gulp-babel @babel/core @babel/preset-env @babel/runtime-corejs3`

### Setting sluchaem

```bash
npm uninstall @utils/cookie-notice
npm uninstall @utils/button
npm uninstall @utils/css-variables
npm uninstall @utils/form-checkbox
npm uninstall @utils/form-fieldset
npm uninstall @utils/form-input
npm uninstall @utils/tooltip
npm uninstall @utils/cookie-notice
npm uninstall @utils/categories
npm uninstall @utils/donate-form
npm uninstall @utils/header
npm uninstall @utils/pagination
npm uninstall @utils/file-loader
npm uninstall @utils/js-helper
npm uninstall @utils/popup
npm uninstall @utils/socials
npm uninstall @utils/technical
npm uninstall @utils/typography
```

```bash
npm i -S @utils/cookie-notice @utils/button @utils/css-variables

npm i -S @utils/form-checkbox @utils/form-fieldset @utils/form-input

npm i -S @utils/tooltip @utils/cookie-notice @utils/categories

npm i -S @utils/donate-form @utils/header @utils/typography

npm i -S @utils/popup @utils/socials @utils/technical
```

npm uninstall @utils/pagination
npm uninstall @utils/file-loader
