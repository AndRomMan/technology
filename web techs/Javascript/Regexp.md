
Регулярные выражения VS Code
Regexp  шт VSCode

\d	[0-9]	Цифровой символ
\D	[^0-9]	Нецифровой символ
\s	[ \f\n\r\t\v]	Пробельный символ
\S	[^ \f\n\r\t\v]	Непробельный символ
\w	[[:word:]]	Буквенный или цифровой символ или знак подчёркивания

\W	[^[:word:]]	Любой символ, кроме буквенного или цифрового символа или знака подчёркивания


^: соответствие должно начинаться в начале строки (например, выражение @"^пр\w*" соответствует слову "привет" в строке "привет мир")

$: конец строки (например, выражение @"\w*ир$" соответствует слову "мир" в строке "привет мир", так как часть "ир" находится в самом конце)

.: знак точки определяет любой одиночный символ (например, выражение "м.р" соответствует слову "мир" или "мор")

*: предыдущий символ повторяется 0 и более раз

+: предыдущий символ повторяется 1 и более раз

?: предыдущий символ повторяется 0 или 1 раз

\s: соответствует любому пробельному символу

\S: соответствует любому символу, не являющемуся пробелом

\w: соответствует любому алфавитно-цифровому символу

\W: соответствует любому не алфавитно-цифровому символу

\d: соответствует любой десятичной цифре

\D : соответствует любому символу, не являющемуся десятичной цифрой

√  . — Точка представляет один любой символ

√  ^ — Начало строки

√  $ — Конец строки

√  \s — Пробел

√  \S — Не Пробел

√  \w — буква, цифра или подчёркивание _

√  \d — Любая цифра

√  \D — Любой символ, но не цифра

√  [0-9] — Любая цифра

√  [a-z] — Любая буква от a до z (весь латинский набор символов) в нижнем регистре

√  [A-Z] — Любая буква от a до z в ВЕРХНЕМ регистре

√  [a-zA-Z] — Любая буква от a до z в любом регистре

√  [a-Z] — То же самое

√  * — «Повторитель». Означает, что предшествующий символ может повторяться (0 или более раз)

√  .* — Абсолютно любой набор символов. Например, условие <p> .*</p> — найдет все что между тегами <p> </p>

√  (^.*$) — Любой текст между началом и концом строки

√  ([0-9][0-9]*.) — ищет любые двухзначные в данном случае цифры

√  \n\r — Ищет пустые строки. Вроде как если оставить пустым окно "Заменить" то удаляет пустые строки, но можно поставить вот это \0

√  ^\s*$ — Ищет пустые строки содержащие пробел.

√  ^[ ]*$ — Ищет пустые строки содержащие пробел.


