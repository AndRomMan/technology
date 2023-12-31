# Storm — setting

[TOC]

## Fonts setting

```json
    "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace",
    "editor.fontLigatures": true,
```

## Postfix Completion

Preferences > Editor > General > Postfix Completion

## Machine Learning: `Preferences > Editor > General > Code Completion`

`Main Menu | Code | Code Completion | Type-Matching`

### Предложение по завершению строки: `Ctrl + Shift + Space`

## Завернуть длинные строки

`view - active editor - use soft wraps`

`File - Settings - Editor - General — Use Soft wraps in Editor`

## Multi editing

### Добавить курсоры в каждую строку всего текущего документа

* нажмите `Ctrl + Home`, чтобы установить курсор в начале первой строки
* включите режим выбора столбца: `Alt + Shift + Insert`
* нажмите `Ctrl + Shift + End`

### Добавить курсоры в конец каждой строки в выбранном блоке

Выберите блок кода в редакторе и нажмите `Alt + Shift + G` или `Alt + Shift + I`

### Выбор нескольких вхождений слова или диапазона текста

  1. Если вы хотите выделить слова, установите курсор на вхождение нужного слова. В противном случае выберите нужный диапазон мышью или сочетаниями клавиш
  2. Выполните одно из следующих:
      * Последовательно нажимайте `Alt + J`, чтобы найти и выбрать следующее вхождение соответствующего слова или диапазона текста с учетом регистра.
      * Нажмите `Ctrl + Alt + Shift + J`, чтобы выбрать все совпадающие слова или текстовые диапазоны с учетом регистра в документе

  3. Чтобы снять выделение с последнего выбранного экземпляра, нажмите `Alt + Shift + J`
  4. После того, как второй или любой другой последующий выбор был добавлен с помощью `Alt + J`, вы можете пропустить его и выбрать следующее вхождение с помощью `F3`. Чтобы вернуться к последнему пропущенному вхождению, нажмите `Shift + F3`.

### Найти и выбрать несколько вхождений строки

  1. Нажмите `Ctrl + F` или выберите
  Редактировать | Найти | Найдите в главном меню.
  Панель поиска появляется в верхней части активного редактора.
  2. Введите строку, которую вы хотите найти и выберите.
  Справа от строки поиска вы увидите количество вхождений в текущем документе.
     * При желании ограничьте поиск по регистру `Alt + C` или найдите только целые слова  `Alt + W`
  3. Нажмите `Ctrl + Alt + Shift + J` или щелкните Выбрать все вхождения  на панели инструментов.

### Выделение прямоугольных фрагментов текста

  1. Убедитесь, что режим выбора столбца отключен
  2. Чтобы выделить диапазоны в виде одного прямоугольника, выполните одно из следующих действий:
     * Установите курсор в один угол прямоугольника, 
     * затем `Alt + Shift + Middle-Click` в диагонально противоположный угол
     * `Alt + Shift + Click` и перетащите мышь, чтобы сделать выбор

  3. Чтобы выбрать диапазоны в виде нескольких прямоугольных выделений,
        `Ctrl + Alt + Shift + Click`
      перетащите мышь на нужные части кода

  4. В результате у вас будет несколько диапазонов выбора в каждой затронутой строке документа. В строках, которые короче прямоугольника, выделение будет охватывать только последний символ.
