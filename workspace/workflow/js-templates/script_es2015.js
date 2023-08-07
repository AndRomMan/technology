/* eslint-disable no-alert */
/* eslint-disable no-console*/
'use strict';
// ============================= let & var ========================================
// for (var i = 0; i < 5; i++) {
//   console.log('i in loop = ' + i);
//   setTimeout(function () {
//     console.log('i in settimeout = ' + i);
//   }, 1);
// }

// for (let i = 0; i < 5; i++) {
  //   console.log('i in loop = ' + i);

  //   setTimeout(function () {
    //     console.log('i in setTimeout = ' + i);
    //   }, 1);
    // }

// ============================= деструктуризация ========================================
// const myVeryLovelyAnimal = {
//   nickname: 'Keks',
//   age: 5,
//   kind: 'The Cat'
// };

// const nickname = myVeryLovelyAnimal.nickname;
// const age = myVeryLovelyAnimal.age;
// const kind = myVeryLovelyAnimal.kind;
//  Мы получили запись, равнозначную предыдущей,
// но вместо трёх строк объявили три переменных за раз.
// const {nickname, age, kind} = myVeryLovelyAnimal;
// console.log(
//   'My name is ' +
//   nickname +
//   '. I\'m ' +
//   age +
//   ' age old. I\'m ' +
//   kind
// );


// Не обязательно деструктурировать все свойства разом или вообще все свойства.
// Можно сначала деструктурировать свойства nickname и kind, а потом age.

// const {nickname, kind} = myVeryLovelyAnimal;
// let {age} = myVeryLovelyAnimal; Если мы будем переопределять age


// Деструктурировать можно и массив, только скобки в этом случае будут квадратные.
// А ещё в массиве порядок элементов важен.
// Поэтому, чтобы деструктурировать только второе свойство, нужно первое оставить пустым.
// const [first, second] = ['My name is', 'Keks'];
// console.log(first);
// console.log(second);

// const [, nickname] = ['My name is', 'Keks'];
// console.log(nickname);

// Кстати, строка (и многое другое) тоже может быть представлена
// в виде массива символов
// const [firstLetter, secondLetter] = 'My name is Keks';
// console.log(firstLetter, secondLetter);


// ============================= параметры по умолчанию ========================================
// В обновлении 2015 года стандарта ECMAScript
// появился новый синтаксис указания значения параметров по умолчанию.
// Он очень похож на присвоение значения переменной,
// а работает как вариант с проверкой на undefined.

// const fn = function (greeting = 'Hello', username = 'User') {
//   console.log(
//     greeting +
//     ', ' +
//     username +
//     '!'
//   );
// };
// fn();

// То есть если мы передадим любое значение, отличное от undefined, будет взято оно.
// Даже falsy-значение, например null.
// fn(undefined, null);

// А если аргументы будут переданы, будут взяты они.
// fn('Hi', 'Sasha');

// Новый синтаксис можно использовать и вместе с деструктуризацией.
// const mySuperLovelyAnimal = {
//   nick: 'Keks',
//   ageAnimal: 5,
//   kindAnimal: 'The Cat'
// };

// Для не существующего свойства sex мы можем задать значение по умолчанию.
// Синтаксис тот же, похожий на присвоение.
// const {nick, ageAnimal, kindAnimal, sex = 'male'} = mySuperLovelyAnimal;

// console.log(
//   'My name is ' +
//   nick +
//   '. I\'m ' +
//   ageAnimal +
//   ' age old. I\'m ' +
//   kindAnimal
// );

// console.log(sex);

// С массивами тоже работает.
// const [firstA, secondA, thirdA = '!'] = ['My name is', 'Keks'];
// console.log(firstA, secondA, thirdA);

// ============================= шаблонные строки ========================================
// Кстати, на месте переменной
// может быть практически любой валидный JavaScript код,
//  который возвращает какое-то значение:
//     преобразователь,
//     тернарный оператор,
//     вызов функции

const myVeryLovelyAnimal = {
  nickname: 'Keks',
  age: 5,
  kind: 'The Cat',
  getKind: function () {
    return this.kind;
  }
};

const {nickname, age} = myVeryLovelyAnimal;

const message = `My name is ${nickname.toUpperCase()}.
I'm ${age > 5 ? `more than five` : `five`} years old.
I'm ${myVeryLovelyAnimal.getKind()}`;

console.log(message);

// ============================= стрелочные функции ========================================
const fn = value => value += 1;
console.log(
  'Результат ',
  fn(0)
);

// Чтобы вернуть стрелочной функции объект его нужно обернуть в круглые скобки.
let fNew = value => ({ value: value += 1 });

console.log(
  'Результат',
  fNew(0)
);

// У стрелочных функций есть определённая задача, они запоминают контекст родителя.
//  Есть обычная функция arrowFunc и объект obj.
//  С помощью функции мы хотим получить поле username объекта.

// Контекст функции определяется в момент выполнения, и в записи obj.getName() контекстом будет obj.
// Поэтому в консоль выведется 'Keks'.

let arrowFunc = function () {
  return this.username;
};

let obj = {
  username: 'Keks',
  getName: arrowFunc,
};

console.log(
  obj.getName()
);

// Но стоит нам заменить обычную функцию на стрелочную, мы получим undefined.
// Дело в том, что у стрелочной функции нет своего контекста,
// она запоминает контекст родителя.
// Поэтому в записи obj.getName() контекстом стрелочной функции не будет obj.
// Контекстом fn будет контекст родителя.

const arrowNewFunc = () => {
  return this.username;
  // return this;
};

const obj1 = {
  username: 'Keks',
  getName: arrowNewFunc,
};

console.log(
  obj1.getName()
);

// arrowNewFunc - объявлена в глобальной области видимости,
//  поэтому её контекстом будет window.
//   Давайте в этом убедимся, вернув просто this.
//    Понятное дело, у window никакого username нет, отсюда undefined.

// Что бы мы не делали, у стрелочной функции контекст не изменить.
// bind, call, apply не меняют поведение

console.log(
  obj1.getName.call(obj)
);

// Заведём объект app, который описывает наш интерфейс, наше приложение.
// У него есть метод init, задача которого добавить обработчик клика по кнопке,
// что в свою очередь приведёт к отображению данных в консоль.

const app = {
  data: ['Очень', 'нужные', 'данные'],
  init: function () {
    // 2
    document.querySelector('button')
      .addEventListener('click', () => {
          // 3
          console.log(this);
        }
      );
  }
};

app.init(); // 1

    // 1 - Контекст функции init определяется в момент выполнения. Он будет app;
    // 2 - init — родитель для стрелочной функции-обработчика;
    // 3 - стрелочная функция берёт контекст родителя.
