# Проект "Vue.js v2.7"

**[Сайт в интернете](https://demindesign.ru/vue-project/)**.

Бесплатный курс по **[Vue.js](https://www.youtube.com/watch?v=4XTy6ucbLNg&list=PLvTBThJr861yMBhpKafII3HZLAYujuNWw)**.

* * *

* Разработчик: **[Роман Демин](https://htmlacademy.ru/profile/id219593)**

* Создатель проекта для изучения фреймворка Vue **Илья Климов** - [JavaScript.Ninja](http://javascript.ninja)

* * *

## Общие технические требования

*
*

* * *

## Что сделано

*
*

* * *

## Краткая инструкция по развертыванию проекта

### Подготовка системы автоматизации сборки

### Установите

* [Node.js](https://nodejs.org/ru/) - последнюю версию LTS
* NPM - установка включена в установку Node.js
  * Проверьте корректность установки Node и NPM:

    ```bash
    node --version
    npm --version
    ```

* Gulp-cli - v4.x:

    ```bash
        npm install --global gulp-cli
    ```

* Проверьте корректность установки Gulp:

    ```bash
        gulp --version
    ```

### Порядок работы с проектом

* Запустите терминал из корневой директории проекта
* Установите npm-пакеты плагинов сборки и тестирования (devDependencies из файла package.json)

  ```bash
      npm i
  ```

* Протестируйте код на соответствия style-guides

  ```bash
      npm test
  ```

* Соберите проект без запуска локального сервера

  ```bash
      npm run build
  ```

* Запустите локальный сервер

  ```bash
      npm start
  ```
