# Storm — hotkeys

[TOC]

## Working applications hotkeys

### Capture2Text —

#### Start OCR Capture: `Shift+Win+C`

#### Re-Capture Last: `Shift+Win+R`

### QTranslate: `Alt+Shift+Q`

### Deepl translator

- перевод в приложении `Alt+Shift+W`
- перевод со снимков экрана `Alt+Shift+E`

### Tools

---

## ==VSCode in Storm==

### Delete line at caret: `Ctrl+Shift+K` — было `Ctrl+Y`

`Editor Actions | Delete Line`

Удалено в настройках:

```bash
Main Menu | Git | VCS Group | Git | Push...
Main Menu | Git | VCS Group | Mercurial | Push...

Version Control Systems | Git | Push...
Version Control Systems | Mercurial | Push...
```

### Insert / remove cursor: `Alt+Click`

### Insert cursor above / below: `Ctrl+Alt+Up / Down`

```bash
Editor Actions | Clone Caret Above
Editor Actions | Clone Caret Below
```

### Copy line down: `Alt+Shift+Down` — было `Ctrl+D`

```bash
Main Menu | Edit | Edit Code Actions | Duplicate Line or Selection

Editor Actions | Duplicate Line or Selection
```

### Move line up / down: `Alt+Up / Down` — было `Alt+Shift+Up / Down`

`В JetBrains строки и блоки копируются только вниз`

```bash
Main Menu | Code | Move Line Up
Main Menu | Code | Move Line Down
```

```bash
Plugins | Data Editor Support | Ascending
lugins | Data Editor Support | Descending
```

```bash
Other | Move Watch Up
her | Move Watch Down
```

### Insert cursor at end of each line selected: `Shift+Alt+I` — было `Alt+Shift+G`

```bash
Main Menu | Edit | Editor Select Actions | Add Carets to Ends of Selected Lines

```

### Close tab: `Ctrl+W` — было `Ctrl+F4` 

```bash
Main Menu | Window | Editor Tabs | Editor Close Actions | Close Tab

```

### Reopen closed tab: `Ctrl+Shift+T`

```bash
Main Menu | Window | Editor Tabs | Reopen Closed Tab
Other | Tabs | Reopen Closed Tab
```

---

## General

### General — Блок поиска

#### Find Action: `Ctrl+Shift+A`

#### Search everywhere: `Double Shift`

#### Go to class: `Ctrl+N`

#### Go to file: `Ctrl+Shift+N`

#### Go to symbol: `Ctrl+Alt+Shift+N`

---

### General — Setting

#### Open Settings dialog: `Ctrl+Alt+S`

#### Quick switch current scheme: `Ctrl+``

---

## Interface tools

### Open file in Right Split: `Shift+Enter / Alt+DoubleClick`

### Add to Favorites: `Alt+Shift+F` — ==it doesn't work==

### Scratch File — вспомогательный файл: `Ctrl+Alt+Shift+Insert`

Вспомогательные файлы позволяют быстро создавать образцы кода или делать заметки по ходу работы в IDE, не затрагивая рабочие файлы проекта.
Вспомогательные файлы сохраняются в IDE и доступны из любого проекта.

### Step through all the windows and tools: `Ctrl+Tab`

### Run npm / gulp task: `Alt+F11`

### Terminal STORM open: `Alt+F12`

### Terminal CMDER open: `Ctrl+Alt+F12`

### Recent files popup: `Ctrl+E`

`View | Recent Files` to view the list of recently opened files.

### Recent Locations: `Ctrl+Shift+E`

`Main Menu | View | View Recent Actions Group | Recent Locations`

### Recent Changes: `Alt+Shift+C`

### Hide Active Tool Window: `Shift+Escape`

### Open corresponding tool window: `Alt+0 .. 9`

### Hide All Tool Windows: `Ctrl+Shift+F12`

  `Main Menu | Window | Active Tool Window | Hide All Tool Windows`

  Скрывает / показывает активные вкладки инструментов (Project, Bookmarks, Debug etc.) но только если они не в плавающем режиме!

### Switch between tool and tabs: `Ctrl+Tab`

---

## Git

### Open Git: `Alt+F9`

### VCS operation popup: `Alt+``

---

## Editing

### Close active editor tab: `Ctrl+F4  ←→  Ctrl+W`

`Ctrl+W` — Close active editor tab (VSCode)

---

### Editing — Lines

#### Add carets to ends of selected lines: `Alt+Shift+I`

#### Join lines: `Ctrl+Shift+J`

#### Split lines: `Ctrl+Enter`

После первого деления курсор остаётся на исходной строке, добавляются кавычки если исходная строка в кавычках.

#### Start new line —  empty: `Shift+Enter`

Исходная строка не делится.

#### Start New Line Before Current —  empty: `Ctrl+Alt+Enter`

#### Delete line at caret: `Ctrl+Y  ←→  Ctrl+Shift+K`

`Ctrl+Shift+K` — Delete line at caret (VSCode)

#### Duplicate current line or selected block: `Ctrl+D  ←→  Alt+Shift+Down`
  
#### Move line Up / Down: `Alt+Up / Down`

- `Alt+Up` — Move line up (VSCode)
- `Alt+Down` — Move line down (VSCode)
  
#### Toggle case: `Ctrl+Shift+U`

##### Change case in VSCode UpperCase / LowerCase : `Shift+Alt+U* / Win+Alt+U**

```js
  editor.action.transformToLowercase
  editor.action.transformToUppercase
```

---
---

### Editing — Code

#### Show intention actions — Quick fixes: `Alt+Enter` ←→ `Ctrl .`

`Show Context Actions`

#### Brief info: `Ctrl+mouse over`

#### Context info: `Alt+Q`

---

### ==VSCode Editing — Code==

#### Quick fixes: `Ctrl .`

---
---

#### Insert Live template: `Ctrl+J`

#### Code completion: `Ctrl+Space`

#### Code parameter info: `Ctrl+P`

`Main Menu | View | Code Editor View Actions | Code View Actions | Parameter Info`

показать информацию о параметрах: подсказка порядка передаваемых аргументов во встроенных функциях.

Поместите курсор в круглые скобки вызова функции и нажмите, `Ctrl+P` чтобы отобразить параметры функции.

---

#### Parameter info: `Ctrl+P`

#### Quick documentation: `Ctrl+Q`

---

#### Move Statement Up / Down: `Ctrl+Shift+Up / Down`

Перемещает выделенный блок кода.

#### Error description at caret: `Ctrl+F1`

#### Generate code: `Alt+Insert`

#### Select successively increasing code blocks: `Ctrl+W`

#### Decrease current selection to previous state: `Ctrl+Shift+W`

#### Select till code block end / start: `Ctrl+Shift+]  /  [`

#### Paste from history buffers: `Ctrl+Shift+V`

`Main Menu | Edit | Cut/Copy/Paste Actions | Paste | Paste from History`

---

#### Comment / uncomment with line: `Ctrl+/`

#### Comment / uncomment with block: `Ctrl+Shift /`

---

### Editing — Formatting

#### Reformat code: `Ctrl+Alt+L`

#### Auto-indent lines: `Ctrl+Alt+I`

#### Вызов окна Refactor this: `Ctrl+Alt+Shift+P`

`Plugins | Prettier | Reformat with Prettier`

---

### Editing — Разворачивание и удаление утверждений

#### Surround With — окружение кода конструкциями языка

#### Surround with: `Ctrl+Alt+T`

#### Unwrap — удалить конструкции кода вокруг элемента

#### Unwrap / Remove: `Ctrl+Shift+Delete`

---

### Editing — Indent

#### Indent selected lines: `Tab`

#### Unindent selected lines: `Shift+Tab`

---
---

### Editing — Folding

#### Collapse code block: `Ctrl+'minus'`

#### Collapse all: `Ctrl+Shift+'minus`

#### Expand code block: `Ctrl+'plus'`

#### Expand all: `Ctrl+Shift+'plus'`

### ==VSCode Editing — Folding==

#### Fold (collapse) region: `Ctrl+Shift+[`

#### Unfold (uncollapse) region: `Ctrl+Shift+]`

#### Fold (collapse) all subregions: `Ctrl+K Ctrl+[`

#### Unfold (uncollapse) all subregions: `Ctrl+K Ctrl+]`

#### Fold (collapse) all regions: `Ctrl+K Ctrl+0`

#### Unfold (uncollapse) all regions: `Ctrl+K Ctrl+J`

---
---

### Editing — Selection
  
Editor Action

Отключены: `Ctrl+W` - expand, `Ctrl+Shift+W` - shrink.

#### Extend Selection: `Alt+Shift+PgUp`

VSCode

#### Shrink Selection: `Alt+Shift+PgDown`

VSCode

---
  
## Multiple carets and selections

### Add or remove caret: `Alt+Click`

### Select next occurrence: `Alt+J`

### Unselect occurrence: `Shift+Alt+J`

### Select all occurrences: `Shift+Ctrl+Alt+J`

### Unselect all occurrences or carets: `Esc`

---

## Running code

### Run: `Shift+F10`

### Stop: `Ctrl+F2`

### Select configuration and run: `Alt+Shift+F10`

### Run context configuration from editor: `Ctrl+Shift+F10`

### Debug: `Shift+F9`

### Select configuration and debug: `Alt+Shift+F9`

### Rerun tests: `Alt+Shift+R`

### Run Gulp/Grunt/npm tasks: `Alt+F11`

---

## Debugging code

### Step over: `F8`

### Step into: `F7`

### Smart step into: `Shift+F7`

### Step out: `Shift+F8`

### Run to cursor: `Alt+F9`

### Evaluate expression: `Alt+F8`

### Resume program: `F9`

### Toggle breakpoint: `Ctrl+F8`

### View breakpoints: `Ctrl+Shift+F8`

---

## Navigate

### Navigate — files and structure

### Копировать абс путь: `Ctrl+ShiftC`

### Копировать относительный путь вместе с номером строки: `Ctrl+ShiftAlt+C`

---

### File structure popup: `Ctrl+F12`

### Jump to source: `F4 / Ctrl+Enter`

### Jump to navigation bar: `Alt+Home`

### Select In: `Alt+F1`

Select current file or symbol in any view

---

### Navigation — Goto

#### — declaration or usages: `Ctrl+B`

#### — implementation: `Ctrl+Alt+B`

#### — type declaration: `Ctrl+Shift+B`

#### — class: `Ctrl+N`

#### — line: `Ctrl+G`

#### — file: `Ctrl+Shift+N`

#### — symbol: `Ctrl+Shift+Alt+N`

#### — super-method / super-class: `Ctrl+U`

---

### Next / previous editor tab: `Alt+Right / Left`

### Navigate forward / back: `Ctrl+Alt+Right / Left`

### Go back to previous tool window: `F12`

### Navigate to last edit location: `Ctrl+Shift+Backspace`

### Open quick definition lookup: `Ctrl+Shift+I`

---

### Navigation — Code block

#### Move to code block end / start: `Ctrl+] / [`

#### Move caret to matching brace: `Ctrl+Shift+M`

#### Goto methode — next method / previous method: `Alt+Up / Down`

---

### Navigation — Hierarchy

#### Type hierarchy: **Ctrl+H**

#### Call hierarchy: **Ctrl+Alt H**

---

### Navigation — Bookmarks

#### Toggle bookmark: `F11`

#### Show bookmarks: `Shift+F11`

#### Toggle bookmark with mnemonic: `Ctrl+Shift+F11`

#### Go to numbered bookmark: `Ctrl+0 .. 9`

---

### Navigation — Error

#### Next / previous highlighted error: `F2 / Shift F2`

---

### Navigation — Move Caret to Matching Brace: `Ctrl+Shift+M`

Поместите курсор в любое место внутри блока кода и нажмите, `Ctrl+Shift+M` чтобы переместить курсор к соответствующей скобке.

Работает с {}, [], () и теги HTML.

---

## Search / Replace

### Find next: `F3`

### Find: `Ctrl+F`

### Find previous: `Shift+F3`

### Find in path: `Ctrl+Shift F`

### Replace: `Ctrl+R`

### Replace in path: `Ctrl+Shift+R`

---

## Usage

### Usage Search — In all places

#### Find usages: `Alt+F7`

#### Show usages: `Ctrl+Alt+F7`

---

### Usage Search — In file

#### Find usages in file: `Ctrl+F7`

#### Highlight usages in file: `Ctrl+Shift+F7`

---

## Refactor

### Вызов окна Refactor this: `Ctrl+Alt+Shift+T`

### Inline Variable: `Ctrl+Alt+N`

### Extract Method: `Ctrl+Alt+M`

### Introduce Variable: `Ctrl+Alt+V`

### Introduce Constant: `Ctrl+Alt+C`

### Introduce Parameter: `Ctrl+Alt+P`

### Introduce Field: `Ctrl+Alt+F`

### Change function signature: `Ctrl+F6`

`Main Menu | Refactor | Extract/Introduce | Introduce Field`

### Copy / Move: `F5 / F6`

### Safe Delete: `Alt+Delete`

### Rename: `Shift+F6`

---

## VCS / Local History

### VCS quick popup: `Alt+``

### Commit project to VCS: `Ctrl+K`

### Update project from VCS: `Ctrl+T`

### View recent changes: `Alt+Shift+C`

---

## Cancelled hotkeys

### Conflict with QTranslate and Deepl translators

`Plugins | FTP/SFTP/WebDAV Connectivity | Upload Current Remote File`

`Alt+Shift+Q`

   New hotkeys
   QTranslate set: `Alt+Shift+Q`
   Deepl set: `Alt+Shift+E`
