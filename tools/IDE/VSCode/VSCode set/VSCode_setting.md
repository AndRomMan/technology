Директория расширений VSCOde
c:\Users\ЮЗЕР\.vscode\extensions\
=====================================

Находим лишние пробелы после тегов [\w\S][\s]{2,} находим от двух пробелов после любых символов исключая пробел

 [a-z][\s]{2,}]
 [a-z"=-_][\s]{2,}

[\w\S][\s]{2,}

==================================
Настройки editconfig
max_line_length = 100
indent_size = 2

==================================
При работе с плагином Debugger for Chrome
для перезагрузки отладчика можно настроить hot-keys
{
     " key " : " ctrl + r " ,
     " command " : " workbench.action.debug.restart " ,
     " when " : " inDebugMode "
}

по умолчанию для этой команды стоит перезапуск отладки: ctrl + shift + F5

==================================
Настройка launch.json

Переменная workspaceFolder
— это абсолютный путь до корневой директории вашего проекта
(та, где лежит папка .vscode).

{
    "version": "0.1.0",
    "configurations": [
        {
            "name": "Launch localhost",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost/index.html",
            "webRoot": "${workspaceFolder}/wwwroot"

// "url": "http://localhost:8080",
// "url": "http://localhost:4200",
// "url": "http://localhost/mypage.html",
// "url": "http://localhost:8080",
// "url": "http://localhost:3000",

// "webRoot": "${workspaceFolder}/public"

    },
        {
            "name": "Launch index.html",
            "type": "chrome",
            "request": "launch",
            "file": "${workspaceFolder}/index.html"
        },

    ]
}

}
=

 Exclude folders
Быстрый трюк для исключения таких папок, как node_modules или любых других, из дерева проводника

File> Preferences > Settings
Найдите files.exclude в настройках
Выберите добавить шаблон и введите **/node_modules

==================================
Отключить gutter показывающий diff состояния в git

"scm.diffDecorations": "all" | "gutter" | "overview" | "none"
=============================================================

Для того, чтобы работали сниппеты onlySnippets

"editor.tabCompletion": " onlySnippets"

 // Enables tab completions.
 //  - on: Tab complete will insert the best matching suggestion when pressing tab.
 //  - off: Disable tab completions.
 //  - onlySnippets: Tab complete snippets when their prefix match. Works best when 'quickSuggestions' aren't enabled.

  "editor.tabCompletion": "off",

==================================
Для синхронизации настроек

1) Ставим Settings Sync (Shan Khan)
   https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync&ssr=false#qna
2) В git создаем токен:
   https://github.com/settings/tokens
   Запоминаем id токена - это такой длинный набор цифр. Секретный, виден только при создании!
3) Создаем gist (создание gist встроенное в Settings Sync не сработало!):
   плюс около аватарки. Заполняем поле описании, имя файла (как бэ опционально), в текстовом поле поставим любой знак, чтобы появилась возможность сохранения.
   Делаем Create secret gist.
   В поле доменов видим строку:
   https://gist.github.com/AndRomMan/b0c8e82d78329b28b9984df8a3d00124
   это страница нашего gist.
   Запоминаем.
4) В настройках пользователя(ctrl + ,) вводим настройки для Settings Sync:
   Все они хорошо описаны на сайте. Вводим id нашего gist.
   "sync.gist": "b0c8e82d78329b28b9984df8a3d00124",
   "sync.autoDownload": false,
   "sync.autoUpload": false,
   "sync.forceDownload": false,
   "sync.forceUpload": false,
   "sync.quietSync": false,
   "sync.removeExtensions": true,
   "sync.syncExtensions": true
   }
5) В настройках
   syncLocalSettings.json (расположен рядом со всеми пользовательскими настройками) вводим в соответствующей строке токен для доступа к gist:
   "token": "e74839eeac60d692fd9a3f53fc048fb430497f56"
   Доступ к этому файлу можно реализовать так:  Нажимаем Ctrl + Shift + P и в командной строке редактора находим “Sync: Update / Upload Settings”.
6) Дальше все вроде как подхватилось и работает по горячим клавишам:

1. Загрузить настройки В gist: Shift + Alt + U
2. Скачать настройки ИЗ gist : Shift + Alt + D

токен
VS code Settings Sync — gist
e74839eeac60d692fd9a3f53fc048fb430497f56

gist
https://gist.github.com/AndRomMan/b0c8e82d78329b28b9984df8a3d00124
==================================================================

Убрать подсказки в VScode
"editor.hover.enabled": false,
Задержка появления подсказки
   "editor.hover.delay": 100,
=============================

1. ping firstaidgit.ru
   ping htmlacademy.ru
   ping  178.79.181.169
   ping up.htmlacademy.ru

Windows %APPDATA%\Code\User\settings.json

============ Terminal
// Command Prompt
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe"
// PowerShell
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
// Git Bash
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
// Bash on Ubuntu (on Windows)
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\bash.exe"

В настройках через интерфейс VSCode вводить путь без \\

C:\Program Files\PowerShell\6\pwsh.exe

============ Settings

“files.insertFinalNewline”: true,
“files.trimFinalNewlines”: true,
“files.trimTrailingWhitespace”: true,

Таким образом мы автоматизировали проставление пустой строки в конце файла, при этом убрали все пустые строки в конце кроме этой и удалили все пробельные символы на конце строк и на пустых строках. Теперь можно навсегда об этом забыть, всё будет причёсываться само по себе при сохранении файла.

Включаем перенос строк при достижения границ рабочей области экрана, чтобы не возникало прокрутки:

“editor.wordWrap”: “on”,
============================

Убираем алерты с предупреждениями при удалении и перетаскивании файлов и директорий:

“explorer.confirmDelete”: false,
“explorer.confirmDragAndDrop”: false,

============
Убираем кнопку фидбека из нижнего бара:

“workbench.statusBar.feedback.visible”: false,
================================================

активировать ZOOM в настройках:

“editor.mouseWheelZoom”: true,

============
SFTP config
{
    "name": "My Server",
    "host": "localhost",
    "protocol": "sftp",
    "port": 22,
    "username": "username",
    "remotePath": "/",
    "uploadOnSave": true
}

============ Plugins ============
open in browser
use Alt + B shortcut to open current html file in default browser, or Shift + Alt + B to choose a browser

Работает. Можно настраивать. Сейчас установлен на обертку в `<p>`
	htmltagwrap
	ALT+W
======

AutoRenameTag
	Нормально, но возможны сбои. Может не сработать на теге, который уже ранее установлен. Иногда все ок.
=======================================================================================================================================================================================

Indent one space
	Работает.

    Tab, Space -
	сдвигаем выделенную группу строчек на размер TAB или Space.

Shift+Space/Tab -
	сдвигаем в обратную сторону.
=====================================================

AutoCloseTag
	не особо нужен при наличии встроенного Emmet
==============================================================================

LiveServer
	Сохраняет после сохранения или через определенное время установленной задержки автосохранения
	Устанавливаете расширение;
    Перезагружаете VS Code.

    ALT+L+C - отключить сервер
	ALT+L+O - включить сервер

Можно пользоваться. Открываете папку с проектом, нажимаете внизу Go Live или пкм + Open with Live Server.

Преимущества именно сервера объяснять думаю не нужно

==================================== HTMLHint
работает только из терминала, но работает хорошо
см. руководство в директории по HTMLHint
==================================================================

============ settings.json ============

    "editor.tabCompletion": "on",
Включает дополнения по TAB.
on: При использовании дополнения по TAB будет добавляться наилучшее предложение при нажатии клавиши TAB.

    "editor.acceptSuggestionOnEnter": "off",
	сделал автокомплит только по TAB
Определяет, будут ли предложения приниматься клавишей ВВОД в дополнение к клавише TAB. Это помогает избежать неоднозначности между вставкой новых строк и принятием предложений.

    "editor.suggestSelection": "recentlyUsedByPrefix",
Управляет предварительным выбором предложений при отображении списка предложений.
recentlyUsedByPrefix: Выбирать предложения на основе предыдущих префиксов, которые завершали эти предложения, например, выбирать предложение "console" для "co" и предложение "const" для "con".

============ Настройка языка интерфейса ============
Закрыть VSCode
Откройте файл locale.json с помощью текстового редактора (я предлагаю не использовать VSCode).

В Windows файл находится под C:\Users\UserName\AppData\Roaming\Code\User

В Linux он под $HOME/.config/Code/User

На Mac он под $HOME/Library/Application Support/Code/User

Измените содержимое файла на

============
HTML&CSS

1) Bracket Pair Colorizer & Rainbox Brackets Подсветка парных скобок
2) Indent Rainbow,
   Identicator
   Визуально выделяет текущую глубину отступа. С этим плагином, вы легко различите блоки, расположенные на разных уровнях.

   Guides  —  добавление дополнительных направляющих линий в код для большего удобства при поиске открывающих и закрывающих элементов.
3) Color Picker	Позволяет выбирать цвета с палитры и добавляет отображение цветов в коде
   Color Info
   Небольшой плагин, который дает вам различную информацию о цветах, которые вы использовали в своем CSS.
   Colorize — подсветка цветов
4) AutoFileName	Подстановка мен файлов при указании пути
5) CSS Peek
   Переход к CSS-свойствам идентификаторов (id) и классов непосредственно из файлов HTML. Поддерживает переключение и между файлами и быстрый переход из одного в другой.
6) Excel Viewer	Показывает CSV файлы в табличном виде (в панели слева ПКМ --> Open Preview)
7) Image Preview	Показывает иконки вставленных в CS картинок рядом с нумерацией строк
8) Preview			Превью CSS правил (Ctrl + K V)
9) SVG ViewerПросмотр и конвертирование SVG (в панели слева ПКМ --> SVG Preview)
10) code-pdfvscode-pdf
11) minify			Минифицирует JS и CSS (добавить настройки из описания расширения)
12) TabSpacer		Конвертирует табы в пробелы (Ctrl + Space, ранее Ctrl + Shift + T)
13) Better Align	Выравнивает блок кода (добавить настройки из описания расширения)
14) Close HTML/XML tag,
    Auto Complete Tag,
    Auto Close Tag
15) stylelint
16) Bookmarks
    Позволяет запоминать строки и быстро переходить к ним
17) Color Highlighter	Подсвечивает HTML-цвета
18) Auto Rename Tag — расширение для переименования тегов HTML. При изменении открывающего тега автоматически сменится и закрывающий.
19) HTML CSS Support — поддержка CSS для HTML-документов с подсветкой синтаксиса, подключением удалённых CSS-файлов и другими полезными функциями.
20) HTML Snippets  —  готовые фрагменты кода для экономии времени
21) CSS Peek
    Используя это расширение, вы можете отслеживать определения классов CSS и идентификаторов в своих таблицах стилей.
22) HTML Boilerplate
    Расширение HTML-шаблона избавит вас от необходимости вручную записывать теги head и body нового HTML-документа
23) IntelliSense for CSS class names in HTML
    Расширение VSCode, которое автоматически дополняет название CSS-класса для HTML-атрибута class на основе определений, найденных в вашей рабочей области или внешних файлов, на которые ссылается элемент link.
24) SVG Viewer
    Простой способ предпросмотра SVG
25) highlight-matching-tag
    Это расширение предназначено для подсветки парных открывающих или закрывающих тегов — функциональности, отсутствующей в VSCode, но которая должна бы быть встроена в редактор из коробки
26) Trailing Spaces
    Мгновенно выделяет и удаляет конечные пробелы.
27) Beautify — форматирование документа, взято исключительно из-за параметра wrap_attributes, который переносит html аттрибуты на новую строчку
28) Sass
29) Jumpy — прыгает по коду
30) Untabify — замена табов на пробелы и наоборот
    Tabs to Spaces
31) Express — управление экспресс сервером
32) SCSS IntelliSense,
    Sass

    — автодополнение для переменных в SCSS — автокомплит для Sass

==================================
VS Code
	Settings Sync — позволяет сохранять пользовательские настройки, расширения и сочетания клавиш. Такая возможность позволит установить VSCode на другом устройстве в течении нескольких минут, и не потерять конфигурацию;

    Todo Highlighter, Todo+, TODO Parser
	список выделенных комментариев, который выводится в консоли

    Editor Config for VSCode	Поддержка формата .editorconfig

    ftp-sync	Автоматически синхронизирует файлы по ftp протоколу

    Path Intellisense  —  инструмент для автоматического дополнения имён файлов по мере ввода строки.

    File Utils
	Удобный способ создания, дублирования, перемещения, переименования и удаления
  файлов и каталогов.

    EditorConfig for VS Code — поддержка EditorConfig

    Duplicate action — дублирование файла/директории через контекстное меню в боковой панели

==================================
	Java script

1) Quokka.js — это плагин для JavaScript и TypeScript, который отображает результаты выполнения кода в редакторе, непосредственно во время его написания.
2) Code Runner	Позволяет запускать код на различных языках
3) Сниппеты
   JavaScript (ES6) code snippets
   React-Native/React/Redux snippets for es6/es7
   React Standart Style code snippets.
   Babel ES6/ES7 — подсветка es6/es7
4) Import Cost
   Это расширение позволяет увидеть размер импортируемых модулей. Вы сможете понять, в каком месте вы импортируете библиотеку целиком, а в каком конкретную ее часть.
   Это окажет неоценимую помощь со сборкой проекта в Webpack.
5) Другие плагины, которые могут вам пригодиться:
   Live Server — локальный сервер. Включает динамическую перезагрузку для статических и динамических страниц;
6) Multiple clipboards for VSCode — переопределяет стандартные команды «выделить» и «вырезать». Добавляет возможность скопировать несколько блоков текста в единый буфер.
7) Debugger for Chrome
8) Project Manager	Менеджер проектов для VS Code
9) Runner	Позволяет запускать скрипты прямо из редактора
10) Babel ES6/ES7  —  инструмент для подсветки и проверки синтаксиса JavaScript Babel.
11) ESLint  —  интеграция ESLint в Visual Studio Code для проверки качества вашего кода и поиска ошибок
12) JavaScript Console Utils  —  утилита для упрощения создания полезных инструкций console.log(), в том числе быстрой вставки кода для логирования выбранной переменной.
13) Code Spell Checker  —  расширение для быстрой проверки орфографии кода.
14) Change Case
    VSCode имеет ограниченные возможности для преобразования текста. Из коробки он может делать только строчные и прописные преобразования. Этот плагин добавляет намного больше команд для модификации строк, включая camelCase, kebab-case, snake_case, CONST_CASE и другие.
15) Regex Previewer
    Дополнение, позволяющее работать с регулярными выражениями. Regex Previewer применяет шаблон регулярного выражения к любому открытому текстовому файлу, выделяя все совпадения.

==================================
GIT

1) GitLens
   Со слов автора, GitLens расширяет возможности Git, встроенного в Visual Studio Code. Плагин включает удивительное количество функций, таких как указание автора, поиск коммитов, история и проводник.
2) Git History — отображает красивый граф истории коммитов. Рекомендуется.
3) Git Blame — позволяет увидеть информацию о текущей строке. Похожая функция встроена в GitLens.
   Git blame — показывает кто и когда редактировал текущую строку
4) Git Indicators — позволяет увидеть изменения в файлах и количество добавленных и удаленных строк.
5) Open in GitHub / Bitbucket / GitLab / VisualStudio.com — дает возможность, одной командой, открыть репозиторий в браузере.
6) GPM позволяет открыть окно с новым репозиторием напрямую из редактора. Проще говоря, вы можете открыть другой репозиторий не покидая VSCode.
