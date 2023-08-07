# Vue — project deployment

[TOC]

## Клонирование проектов

- делаем форк репозитория
`https://github.com/htmlacademy/vue-third-pizza-start-source`

- клонируем форкнутый репозиторий
`git clone git@github.com:AndRomMan/vue-third-pizza-start-source.git`
`git clone git@github.com:AndRomMan/vue-third-work-start-source.git`

### Решение проблемы: ***WARNING: UNPROTECTED PRIVATE KEY FILE!***

Приватный ключ подключения по SSH обычно храниться в файле `~/.ssh/privat_key`. Поэтому для исправления ошибки «It is required that your private key files are NOT accessible by others. This private key will be ignored.» достаточно выполнить команду:

chmod 600 ~/.ssh/privat_key

После этого у файла private_key будут другие разрешения (чтение и запись для владельца, и полный запрет для всех остальных) и SSH сможет выполнить подключение.

## Установите Node.js - лучше ставить через NVM для контроля над версиями

- [Node.js](https://nodejs.org/ru/) - последнюю версию LTS
- NPM - установка включена в установку Node.js
  - Проверьте корректность установки Node и NPM:

    ```bash
    node -v
    npm -v
    ```

## Установка последней стабильной версии Vue

`npm install vue@next`

### 3 способа развёртывания нового Vue проекта

#### 1 — vue init

- Перейти в корневую директорию проектов, где нужно создать новый проект ***new-project***
- Запустите терминал из корневой директории проекта
- Запуск установки Vue.js актуальной версии

`npm init vue@latest`

- В процессе установки будет запрошено имя проекта ***new-project*** и опции установки плагинов: router, eslint, prettier

- После установки выйдет подсказка по порядку дальнейшей установки

```bash
  cd <new-project>
  npm install
  npm run format
  npm run dev
```

- После запуска dev сервера выводится:

```bash
  ➜  Local:   `http://localhost:5173/`
  ➜  Network: use --host to expose
  ➜  press h to show help
```

#### 2 — Vite

В отличие от Vue 2, где используется webpack, в третьей версии фреймворка новый проект по умолчанию использует сборщик Vite.js.

- Для создания нового проекта выполните команду: `npm create vite@latest`
- В ходе установки выйдут подсказки по порядку дальнейшей установки
- После установки перейти в директорию проекта и установить зависимости: `npm i`
- В отличие от Vue cli, Vite не предоставляет дополнительных пакетов, поэтому их нужно установить дополнительно: * 'npm i vue-router sass pinia'
  - В качестве маршрутизатора используется пакет vue-router — он считается стандартом. Мы будем использовать его в учебном и личном проектах.
  - Для менеджера состояния в третьей версии Vue рекомендуется использовать Pinia, тогда как для второй предпочтительнее был Vuex.
  - Для стилей наши проекты будут использовать препроцессор Sass.
- Запуск проекта: `npm run dev`  
  
##### Настройка алиасов для путей

  Проверить, поскольку в vite.config.js уже есть alias для @

  ```js
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  ```

  Можно указать Vite, чтобы он «пометил» или «обозначил» директорию src как заранее известный символ — обычно используется @ или ~

  Для этого в файле vite.config.js нужно добавить следующее:

  ```js
      /* Добавляем необходимый импорт */
      import * as path from 'path'

      export default defineConfig({
      plugins: [vue()],

      /* Добавляем опцию для поиска путей */
      resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
      }
      })
  ```

  Теперь можно заменить импорт
  `import Component from '../../../../../../src/components/Component.vue'`
  на
  `import Component from '@/components/Component.vue'`

#### 3 — Vue CLI

- Установка Vue cli происходит в глобальной области:
  `npm install -g @vue/cli`
- Проверка: `vue -V`
- `vue create my-project`
- Перейти в целевую директорию и запустить проект:
  
```bash
  cd vue-cli
  npm run serve
```

```bash
  - Local:   http://localhost:8080/
  - Network: http://192.168.0.109:8080/
```
