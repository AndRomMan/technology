[TOC]

# GULP

***

## Локальная установка пакетов

`npm i -D <node_modules>`

## Удаление пакетов

`npm uni -g <name of plugin>`
`npm uni -D <name of plugin>`

## Установка готового набора пакетов

Если вы хотите использовать в своём проекте
множество пакетов, то лучше указать их package.json
вместо того, чтобы каждый раз скачивать их через терминал.

Создайте в директории вашего проекта файл package.json,
и добавьте в него следующий код для необходимых пакетов.
Или используйте готовый package.json.

```
{
  "devDependencies": {
    "gulp-babel": "^8.0.0",
    "gulp-csso": "^4.0.x",
    "gulp-file-include": "^2.2.x"
    ...
  }
}
```

Выполните в терминале команду:
`npm i`

***

## Инициализируем проект

В корневой папки нашего проекта запустите команду:
`npm init`

После нажатия клавиши Enter, вам будут заданы некоторые вопросы
о вашем проекте.
Ниже вы увидите вопросы на русском языке и возможные варианты ответов:

```
    Имя(здесь будет вписано название папки с проектом).
  - Можете оставить таким же или ввести другое название проекта.

    Версия(1.0.0 или другая).
  - Можете оставить по умолчанию.

    Описание. Здесь вы можете написать, о чем ваш проект.
  - Можете оставить это поле пустым.

    Точка входа(app.js).
  - Здесь вы можете указать ваш главный файл проекта или оставить тот, что в скобках.

    Тестовая команда.
  - Оставьте пустым.

    Git репозиторий.
  - Оставьте пустым.

    Ключевые слова.
  - Можете оставить пустым

    Автор.
  - Можете вписать автора проекта или оставить пустым.

    Лицензия(ISC).
  - Оставьте пустым
```

 ___Теперь введите английскую букву y и нажмите Enter.___

В корне появляется __package.json__
в котором хранятся установленные зависимости.

Можно взять готовый package.json, если надо
установить готовые зависимости.
Тогда вводить команду:
npm i (если в корне проекта лежит package.json)
***

## Установка Gulp

Все хорошо расписано в [документации](https://gulpjs.com/docs/en/getting-started/quick-start).

По новой документации для gulp4 необходимо глобально
ставить только gulp-cli,
а gulp ставить уже локально.

* Если вы ранее устанавливали gulp глобально, запустите,
  * `npm rm --global gulp`
  * `npm i --global gulp-cli`
  * `npm i gulp -D`
* если нет готового package.json, то запускаем инициализацию
    `npm init`
* В файле package.json gulp появляется как локальная зависимость:

  ```
  "devDependencies": {
    "gulp": "^4.0.2"
  }
  ```

### Требуется уточнение структуры и экспорта

* Можно заменить файл gulpfile.js на каталог с именем gulpfile.js, который содержит файл index.js, который обрабатывается как gulpfile.js.

Этот каталог может содержать ваши отдельные модули для задач.
***

## Удаление node_modules

__ставим rimraf глобально__

```
    npm i -g rimraf
    cd /path/to/project
    rimraf node_modules
```

***

## Установка плагинов

### Плагины сборки

    * gulp
    * @htmlacademy/editorconfig-cli
    * gulp-sourcemaps
    * gulp-plumber будет перехватывать ошибки,
                  и после устранения ошибки сборка восстановит работоспособность.
                  Интегрировать его оченьпросто, добавляем его первым .pipe(plumber()) в наших цепочках.

    * gulp-rename
    * browser-sync
    * del
    * gulp-concat
    * gulp-cache
    * cheerio
    * gulp-cheerio - __Cheerio__ анализирует разметку и предоставляет API для управления полученной структурой данных.
    * npm i -D gulp-concat - __простая конкатенация__
    * gulp-zip - __сжатие__

### Плагины компиляции CSS

    * gulp-sass __SASS компилятор__
    * gulp-csso __сжатие__
    * doiuse __проверка на применимость__

### Плагины PostCSS

    * gulp-postcss

    * postcss
    * autoprefixer
    * postcss-flexbugs-fixes // корректировка ошибок во Flex-box

### Плагины сборки HTML

    * gulp-replace
    * replace
    * gulp-file-include __удобно вставлять SVG-sprites__
    * gulp-html-minifier-terser - __минификация__

### Плагины сборки JavaScript

    * gulp-terser - __Terser__ is a modern gulp plugin,
                    compressed es6+ code

    * gulp-uglify работает со стандартом ES5 (не понимает let и const и др.) Есть новая версия.

#### Babel 7

* `npm i -D gulp-babel @babel/core @babel/cli @babel/preset-env`

##### Polyfill & runtime libs

* `npm i -D gulp-babel @babel/core @babel/cli @babel/preset-env core-js regenerator-runtime`

* __проверить как работает без runtime-corejs3__

    ```
        npm i --save-dev @babel/runtime-corejs3
    ```

### Linters + Formatter

* htmlhint
* gulp-htmlhint
* editorconfig
* gulp-csscomb
* csscomb

#### Stylelint

* stylelint
* gulp-stylelint
* stylelint-scss
* stylelint-config-recommended
* stylelint-config-recommended-scss

#### ESlint

* eslint
* gulp-eslint
* eslint-config-airbnb
* babel-preset-airbnb
* eslint-config-airbnb-base
* eslint-config-standard
* eslint-config-htmlacademy

#### Prettier

* prettier
* gulp-prettier
* eslint-plugin-prettier
* eslint-config-prettier
* stylelint-config-prettier

#### Для линтеров в составе VSCode

__ставим только следующие конфигурации__

```
stylelint-config-htmlacademy
eslint-config-htmlacademy
```

___все остальные настройки можно корректировать
через конфигурационные файлы___

### Img compressing

* gulp-responsive (менять размеры изображений)
* gulp-imagemin
* imagemin
* imagemin-mozjpeg
* imagemin-pngquant
* imagemin-webp
* imagemin-svgo
* imagemin-jpegtran
* imagemin-optipng
* imagemin-jpeg-recompress
* gulp-svgmin

```
gulp-imagemin
{
В пакет gulp-imagemin входят
 imagemin.mozjpeg
    imagemin.optipng
    imagemin.svgo
}
```

#### Преобразование в webp

    * gulp-webp

#### Сборка SVG спрайтов

    * gulp-svgstore (для создания svg sprites!)

***

## Пакетная установка

  1. `npm i -g gulp-cli`
  2. `npm i -D gulp browserslist gulp-plumber gulp-sourcemaps gulp-plumber gulp-rename del browser-sync gulp-file-include`
  3. `npm i -D gulp-sass gulp-csso gulp-postcss autoprefixer`
  4. `npm i @htmlacademy/editorconfig-cli htmlhint -D`
  5. `npm i htmlhint gulp-html-minifier-terser -D`
  6. `npm i csscomb -D`
  7. `npm i stylelint stylelint-config-recommended stylelint-scss stylelint-config-recommended-scss stylelint-config-htmlacademy -D`
  8. `npm i gulp-terser eslint eslint-config-standard eslint-config-htmlacademy -D`
  9. `npm i prettier eslint-plugin-prettier eslint-config-prettier stylelint-config-prettier -D`
  10. `npm i gulp-imagemin imagemin-webp gulp-svgmin gulp-svgstore -D`
  11. `npm i -D gulp-babel @babel/core @babel/preset-env`

***

### Установка в проект ESLint

12. `npm i prettier eslint-plugin-prettier eslint-config-prettier -D`
13. `npm i eslint eslint-config-htmlacademy -D`

14.

***

  15. `npm i gulp-responsive sharp imagemin imagemin-mozjpeg imagemin-pngquant imagemin-svgo imagemin-jpegtran imagemin-optipng imagemin-jpeg-recompress -D`

  16. `npm i -D cheerio gulp-cheerio gulp-cache gulp-concat gulp-zip editorconfig`

***

  17. __Неиспользуемые варианты__

  ___`npm i eslint-config-airbnb babel-preset-airbnb eslint-config-airbnb-base -D`___

  ___`npm i -D node-sass`___

  ___`npm i doiuse postcss-flexbugs-fixes -D`___

  ___`npm i gulp-htmlhint -D`___

  ___`npm i gulp-csscomb -D`___

  ___`npm i postcss -D`___

  ___`npm i editorconfig -D`___

  ___`npm i csscomb -D`___

  ___`npm i gulp-stylelint -D`___

  ___`npm i terser gulp-eslint -D`___

  ___`npm i eslint-config-airbnb babel-preset-airbnb eslint-config-airbnb-base -D`___

  ___`npm i gulp-prettier -D`___
