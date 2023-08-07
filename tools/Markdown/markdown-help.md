# Markdown

  [The Markdown hacks](https://www.markdownguide.org/hacks/)
[Basic syntax](https://www.markdownguide.org/basic-syntax)
[Extended syntax](https://www.markdownguide.org/extended-syntax).

[TOC]

## Syntax

* * *

### Heading

```txt
# H1

## H2

### H3

...

###### H6
```

### Text styles

* `**bold text**` - **bold text**
* `*italicized text*` - *italicized text*
* `***bold italicized text***` - ***bold italicized text***
* `~~Strikethrough text.~~` - ~~Strikethrough text.~~
* `==Highlighted==` - ==Highlighted==

#### Subscript

`H~2~O` - H~2~O

#### Superscript

`X^2^` - X^2^

* * *

### Blockquote - Цитата

```txt
> Это просто цитата
> продолжение цитаты
> > Вложенная цитата
> > > Ещё вложенная цитата
```

> Это просто цитата
> продолжение цитаты
> > Вложенная цитата
> > > Ещё вложенная цитата

* * *

### Code

* **4 space indent makes a code block**
      .promo {
      position: relative;
      overflow: hidden;
      background-color: #1b2d37; }

* **\`**  - **one back tick**: `return;`

* **\`\`\`** - **3 back tick in line**

    ```js
        if (element.classList.contains(MODAL_OVERLAY)) {
          removeModalState();
        } else {
          return;
        }
    ```

    ```css
      .promo {
        position: relative;
        overflow: hidden;
        background-color: #1b2d37; }
    ```

    ```html
        <h2 class="visually-hidden">
        Наши преимущества
        </h2>
    ```

### Lines

**Предпочтительная разметка звёздочками!**
`***` = `* * *` = `---` = `- - -` = `_ _ _`
* * *

### Lists

**Не смешивайте типы маркеров в одном списке!**

* Item 1
  * Item 1.1
    * Item 1.1.1
      * Item 1.1.1.1

* Item 1
* Item 2

* Item 1
* Item 2

1. Item 1
2. Item 2

#### Checkboxes List

* [ ] Checkbox off
* [x] Checkbox on

#### Definition List

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

* * *

### Images

* Картинка в сети:
  `[img]: http://foo.com/img.jpg`

* Локальное расположение картинки:
  `![Альтернативный текст](/путь/к/изображению.jpg "Подсказка")`

* Пример 1:

![Фото пингвины идут](penguins.jpg "penguins")

* Пример 2:
![Image alt text](image.png "Service Device title")

* * *

### Heading ID - My Great Heading {#custom-id}

* * *

### Footnote

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.
    `{ my code }`

Indent paragraphs to include them in the footnote.
Add as many paragraphs as you like.

* * *

### Tables

| Syntax    | Description |   Test Text |
| :-------- | :---------: | ----------: |
| Header    |    Title    | Here's this |
| Paragraph |    Text     |    And more |

| Влево        |        Центр         | Вправо |
| :----------- |  :----------------:  | ----:  |
| столбец 1    |  выровнен по центру  | $1600  |
| столбец 1    | выровнен по центру   |   $12  |
| зебра-строки |     прикольные       |    $1  |

* **Вертикальные линии обозначают столбцы**. Внешние вертикальные линии (|) не обязательны и нужны только, чтобы сам код Markdown выглядел красиво.

* **Выравнивание текста в столбце указывается через двоеточие** в строке, отделяющей заголовок от основной таблицы.

* * *

### Links

* [Google](http://google.com)
* <http://google.com>

* Сложная ссылка: строка "google" привязана к адресу "<http://google.com>"
  
  `[Google][google]`
  `[google]: http://google.com`

* [Google][google]

  [google]: http://google.com

* * *

### Спецсимволы

Если вы хотите отобразить любой из специальных символов Markdown вместо того, чтобы использовать его для форматирования, просто поставьте перед ним символ обратной косой черты
`\\` = \\
Сама косая черта не отображается, однако следующий за ней символ будет показан как есть:
`\*` = \*

* * *

### Emoji

That is so funny! :joy:

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))
