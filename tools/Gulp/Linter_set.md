========== Отключить eslint для одной или нескольких строк

/* eslint-disable */
alert("test");
/* eslint-enable */

// ==========
alert("test"); // eslint-disable-line

// ==========
/* eslint-disable no-alert, no-console */

alert("test");
console.log("test");

/* eslint-enable no-alert, no-console */

// ==========
alert("test"); // eslint-disable-line no-alert, quotes, semi

// ==========
// eslint-disable-next-line no-console
console.log(msg);

========================================
1
HTMLHint

npm install htmlhint --save-dev

Ставится в редактор VSCode
https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint

config:
файл
	.htmlhintrc
положить в корень проекта.

Настройки все понятные, есть хорошее описание и конфигуратор:
https://htmlhint.com/

https://github.com/htmlhint/HTMLHint/wiki/Rules

==============================
2
EditorConfig
https://editorconfig.org/

config:
файл
	.editorconfig
положить в корень проекта.

Ставится в редактор VSCode
https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig

Особенности настроек для VSCode есть на github
https://github.com/editorconfig/editorconfig-vscode

==============================
3
csscomb

npm install csscomb --save-dev

Ставится в редактор VSCode
https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-csscomb

config:
https://github.com/csscomb/csscomb.js/blob/dev/doc/options.md#sort-orde

готовые шаблоны
https://github.com/csscomb/csscomb.js/blob/dev/doc/configuration.md
https://github.com/csscomb/csscomb.js/tree/dev/config

файл csscomb.json
положить в корень проекта.
==============================
4
prettier

npm i prettier --save-dev

Ставится в редактор VSCode
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
https://prettier.io/docs/en/editors.html
https://github.com/prettier/prettier-vscode

Все правила:
https://prettier.io/docs/en/options.html

config:
файл
	.prettierrc в формате json (можно с комментами)
		или
	prettier.config.js
положить в корень проекта

Для работы с ESLint
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
==============================
5
ESLint
Самое главное:
1) Ошибки в js можно исправлять встроенными средствами ESLint.
2) Форматировать можно через VSCode плагин Prettier, при отключенном автоисправлении ESLint.
3) Форматирование js с помощью prettier можно делать вызывая его через файл настроек ESLint. Для этого ставить пакет prettier, загрузить перед этим спец пакеты настроек prettier, которые согласуют правила проверки(ESLint) и правила форматирования(prettier), подключить prettier в файле конфигурации ESLint и расширяющие конфигурации eslint-config-prettier.


The setting below turns on Auto Fix for all providers including ESLint:
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    }
============================== Вот пример файла .eslintrc:
	{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
	Здесь директива "extends" означает, что конфигурация основана на наборе настроек «eslint:recommended». После этого мы уточняем наши собственные.




==============================
6
Stylelint

npm install stylelint stylelint-scss --save-dev
npm i stylelint-config-prettier
