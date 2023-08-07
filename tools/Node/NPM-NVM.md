# Node.js & NPM

[TOC]

## NPM

### --save-dev `-D` - разработка: linters, compilators, task-runners

Компиляторы-транспиляторы-трансляторы (типа LESS, Pug), тест-раннеры, style-checkers, linters (mocha, eslint), плагины для task-runners (gulp-jade) — все это обычно ставится как **--save-dev**, потому что нужно только тем, кто контрибьютит в этот проект, работает с его кодом.

### --save `-S` - интегрируется в проект: libraries, frameworks

Библиотеки и фреймворки (expressjs, jquery, backbone), на основе которых работает ваш код, без которых ваш код не запустится у пользователя, ставятся как **--save**.

### GIT aliases: `C:/Users/roman/.gitconfig`

```bash
[alias]
    cat = cat-file
    res = restore
    sw = switch
    cho = checkout
    com = commit
    st = status
    br = branch
    logs = log --pretty=format:'%C(yellow)%h%Creset %C(blue)%d%Creset %s' --graph --topo-order
    type = cat-file -t
    dump = cat-file -p
```

### Bash aliases: `C:/Users/roman/.bashrc`

```bash
    alias cdup='cd ..'
    alias cdb='cd -'
    alias cl='clear'
    alias hy='history'
    alias g='git'
    alias npmauf='npm audit fix'
    alias npmauff='npm audit fix --force'
    alias npmup='npm update'
    alias npmout='npm outdated'
```

### Hotkeys for NPM

**_показывает список всех доступных команд Node.js_**

- `node -h` - help
- `install = i`
- `uninstall = r`
- `config = c`
- `update = up`
- `list = ls`
- `--save-dev = -D`
- `--save = -S`
- `--global = -g`

### Команды NPM

#### Обновить NPM

##### Обновление версии NPM

_**NPM вполне может обновлять сама себя**_

- Обновим npm через npm в рамках минорной версии
  `npm update npm -g`
- Обновим npm через npm с переходом на последнюю мажорную версию
  `npm install npm -g`

##### v1

Это новый лучший способ обновить npm в Windows.

Запустите PowerShell в качестве администратора

```bash
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm install -g npm-windows-upgrade
npm-windows-upgrade
```

Примечание. Не запускайте npm i -g npm. Вместо этого используйте npm-windows-upgrade для обновления npm в будущем.
Также, если вы запустите установщик NodeJS, он заменит версию node.

- Обновляет npm на месте, где node установил его.
- Простое обновление, обновление до последней версии, запустив npm-windows-upgrade -p -v latest.
- Не изменяет путь по умолчанию.
- Не меняет местоположение глобального пакета по умолчанию.
- Позволяет легко обновлять и понижать.
- Официально рекомендован командой NPM.
- Список версий, сопоставленных между NPM и node (<https://nodejs.org/en/download/releases/>), но вам нужно будет загрузить node INSTALLER и запустите это, чтобы обновить node (<https://nodejs.org/en/>)

##### v2

Чтобы обновить NPM, это сработало для меня:

- Перейдите в свою оболочку в каталог установки node, например C:/Program Files (x86)/nodejs
- запустить npm install npm (нет -g)

#### Сгенерировать package.json

**_качестве name будет использовано название каталога_**
`npm init --yes`

#### Где установлена Node

- `which node` - покажет директорию
- `where node` - покажет файлы

#### Где установлен NPM

- `which npm` - покажет директорию
- `where npm` - покажет файлы

##### Место установки глобальных пакетов NPM

`npm config get prefix`

#### Вывод списка установленных пакетов

- **_глобальная установка_** : `npm list --global`

- **_локальная установка_** : `npm list`

- **_вывод с заданной глубиной_** : `npm list -g --depth=0`
Команда для вывода списка установленных пакетов с номерами их версий, без зависимостей (depth = 0)

#### Список настроек

`npm config ls -l`

`npm config list`

#### Фиксируем версии пакетов npm shrinkwrap

Прежде чем передавать продукт в промышленную эксплуатацию,
по хорошему, нужно зафиксировать точные версии пакетов с которыми все 100% работает.
Эта команда так и сделает.
После ее выполнения будет создан shrinkwrap.json,
в котором будут прописаны точные версии ваших пакетов,
теперь npm install будет устанавливать именно их.

#### Устанавливает все пакеты, перечисленные в package.json

`npm install`

#### Локальная установка пакетов

- вносит запись о нем в package.json в секцию dependencies
  `npm install express --save`
- вносит запись о нем в package.json в секцию devDependencies
  **Таким образом, пакет устанавливается как "зависимость для разработки".**
  `npm install grunt --save-dev`
  `npm i grunt -D`

##### Установить конкретную версию пакета

- Точное указание версии
  **номер версии указывается после символа @**
  `npm install package@1.0.1`

- Последнюю минорную версию

  - Используя каретку (^) -последнюю минорную версию
  - Используя тильду (~) -последнюю версию патча

    Если вы хотите использовать Express версию 4.16, но версия патча не важна, вы можете использовать тильду, чтобы сообщить NPM и получить последнюю версию патча:
    `$ npm install express@~4.16.1`
    получили
    `+ express@4.16.4`

#### Удаление пакетов

##### Удаление глобального пакета

`npm uninstall --global json`

`npm r -g json`

##### Удаление локального пакета

`npm uninstall package-name`
`npm r package-name`

#### Команды обновления пакета

##### Проверить наличие устаревших пакетов

`npm outdated`
`npm outdated --depth=0`

##### Посмотреть версию установленного пакета

`npm list <имя_пакета>`

**_Посмотреть последнюю версию пакета в репозитории npm (которая устанавливается по npm i)_**

`npm view <имя_пакета> version`

##### Посмотреть версию с помощью плагина

- Установить: [latest-version-cli](https://github.com/sindresorhus/latest-version-cli)

`npm install --global latest-version-cli`

- Запустить проверку: `latest-version package-name`

##### Автоматическое обновление: npm-check-updates

[npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

- `ncu` - проверка локальных пакетов на актуальность(можно до установки модулей)
- `ncu -g` - проверка глобальных пакетов на актуальность
- `ncu -u` - в package.json вписывает актуальную версию пакетов
- `npm i` - запускаем установку в соответствии с измененным package.json

Пример:

```bash
 babel-loader          ^7.1.5  →   ^8.0.6
 babel-preset-env      ^1.6.1  →   ^1.7.0
 copy-webpack-plugin   ^4.6.0  →   ^5.0.5
 style-loader         ^0.20.2  →   ^1.0.1
 webpack                4.0.0  →   4.41.2
```

##### Установить последнюю версию пакета: @latest

`npm i package-name@latest`

##### Обновить пакет до заданной версии v.v.v

`npm i -D package-name@v.v.v`

Update обновляет пакеты в соответствии с записями из package.json,
поэтому надо учитывать знаки >/<, ~, ^ и =.
**Если пакет задан как = 1.0.67, то npm update его не обновит**

- `npm update имя_пакета`
- обновить npm пакеты проекта за записью новых версий в package.json
  `npm update --save`

- Для обновления пакетов npm, установленных глобально
  `npm update -g <имя_пакета>`

- Если нужно поставить версии пакетов, отличные от записей в package.json, то следует воспользоваться командой `npm install`

#### Очистка каталога кэша от старых пакетов

**_После установки пакета npm сохраняет его копию в кэше, поэтому при следующей его установке вам не нужно беспокоить сеть. Кэш хранится в каталоге .npm вашего домашнего каталога._**

- `ls ~/.npm`

- **_Этот каталог со временем замусоривается старыми пакетами и иногда его полезно очищать._**
  `npm cache clean`
  `npm cache clean --force`

#### Запуск скриптов

```bash
  npx htmlhint **/*.html
  npx eslint yourfile.js
  npx stylelint "**/*.css
```

**package.json**

```bash

scripts:
    "checkHtml": "gulp checkHtml",
    "htmlhint": "htmlhint source/*.html"
    "stylelint": "stylelint source/sass/**/*.scss --syntax scss"
```

#### Запуск локально установленных исполняемых модулей

Мы установили пакет, в нем есть исполняемый модуль, но он работает только при запуске через npm-скрипты.

В `node_modules/.bin` локально установленные пакеты размещают свои исполняемые модули.

Запускаем `./node_modules/.bin/mocha`
В директории проекта просто пишите
`./node_modules/.bin/<команда>`
когда хотите запустить локально установленный исполняемый модуль.

#### Usefull tricks

##### Проверить пакеты, необъявленные в package.json

- `npm prune`

1. При выполнении prune, npm CLI пройдет через ваш package.json
   и сравнит его с директорией /node_modules вашего проекта.
   Она выведет список модулей, которых нет в вашем package.json.
2. Затем, команда npm prune удаляет эти пакеты и удалит любые
   не добавленные в package.json вручную или установленные
   при помощи npm install без — save флага пакеты.

##### npm-check-updates

## NVM - управление версиями Node.js

- [NVM for Windows](https://github.com/coreybutler/nvm-windows)
- [download nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases)
- put the file in the folder: `YandexDisk/Design-mega/DesignSoft/Node/nvm-setup>`
- check sum MD5: `nvm-setup.zip.checksum.txt`
- run setup
- setting `C:/Users/roman/AppData/Roaming/nvm`

### Commands

- `nvm install latest` - installs the latest patch version of Node (instead of latest minor)
- `nvm install lts` - installs the latest LTS patch version
- `nvm install <version>` - installs the latest patch version of Node (instead of latest minor)

- `nvm use latest`, `nvm use lts`
- `nvm use latest <version>`

- `nvm current` - displays the active version
- `nvm list available` - доступные для установки версии node.js

### How to remove Node.js from Windows

1. Run npm cache clean --force
2. Uninstall from Programs & Features with the uninstaller.
3. Reboot (or you probably can get away with killing all node-related processes from Task Manager).
4. Look for these folders and remove them (and their contents) if any still exist. Depending on the version you installed, UAC settings, and CPU architecture, these may or may not exist:
    - C:/Program Files (x86)/Nodejs
    - C:/Program Files/Nodejs
    - C:/Users/{User}/AppData/Roaming/npm (or %appdata%/npm)
    - C:/Users/{User}/AppData/Roaming/npm-cache (or %appdata%/npm-cache)
    - C:/Users/{User}/.npmrc (and possibly check for that without the . prefix too)
    - C:/Users/{User}/AppData/Local/Temp/npm-*

5. [Check your %PATH% environment variable](https://stackoverflow.com/questions/141344/how-to-check-if-directory-exists-in-path) to ensure no references to Nodejs or npm exist.

6. If it's still not uninstalled, type where node at the command prompt and you'll see where it resides -- delete that (and probably the parent directory) too.
7. Reboot, for good measure.
