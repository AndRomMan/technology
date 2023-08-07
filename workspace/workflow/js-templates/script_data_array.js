/* eslint-disable no-alert */
/* eslint-disable no-console*/
'use strict';

var wizards = [
  {
    name: 'Пендальф',
    eyesColor: 'blue',
    coatColor: 'green'
  },
  {
    name: 'Баба Яга',
    eyesColor: 'black',
    coatColor: 'gray'
  },
  {
    name: 'Сарумян',
    eyesColor: 'white',
    coatColor: 'yellow'
  },
  {
    name: 'Радагаст',
    eyesColor: 'red',
    coatColor: 'blue'
  }
];

//  создать новый массив и записать туда имена
var wizardNames = [];
for (var i = 0; i < wizards.length; i++) {
  wizardNames[i] = wizards[i].name;
}
console.log(wizardNames);
// Метод pop вынимает последний элемент из массива.
wizardNames.pop();
console.log(wizardNames);
// Для того чтобы добавить или убрать элемент из начала массива,
//  можно воспользоваться методами unshift (добавляет элемент в начало),
for (var i = 0; i < wizards.length; i++) {
  wizardNames.unshift(wizards[i].name);
}
console.log(wizardNames);
//   shift (убирает первый элемент).
wizardNames.shift();
console.log(wizardNames);

// ================================================================================
// Например, метод map позволяет превратить один массив в другой по заданному правилу.
// Правило задаётся в функции обратного вызова, которую принимает метод map.
// Эта функция на вход принимает 3 параметра:

//     wizard — текущий элемент массива

//     index — текущий индекс массива

//     array — исходный массив

// И возвращает объект, в который нужно превратить исходный объект.
//  В нашем случае это строка с именем мага.

var wizardNames = wizards.map(function (wizard, index, array) {
    // return wizard.name;
      return wizard.name + ' - ' + index;
  });

console.log('MAP: wizard names array');
console.log(wizardNames);

// ================================================================================
// Метод filter,
// который позволяет отфильтровать элементы по нужному признаку.
// Этот метод принимает на вход такую же функцию как и метод map,
// только эта функция возвращает boolean, который говорит, нужно ли оставить элемент или нет.

var blueEyesWizards = wizards.filter(function (wizard) {
  return wizard.eyesColor === 'blue';
});
console.log('FILTER: eyesColor');
console.log(blueEyesWizards);
console.log(wizards);

// Методы массива можно вызывать цепочкой.
// Например можно отфильтровать только голубоглазых магов и вывести их имена
// при помощи методов filter и map.

// Важно! Фильтровать необходимо в первую очередь, иначе получим долгий цикл работы!
var wizardNames = wizards.filter(function (wizard) {
    return wizard.eyesColor === 'blue';
  }).map(function (wizard) {
    return wizard.name;
  });
console.log('methods chaining');
console.log(wizardNames);

// ================================================================================
// Методу forEach можно передать вторым параметром объект,
// который будет использоваться как контекст (this) в функции обратного вызова.

// arr.forEach(function callback(currentValue, index, array) {
//     //your iterator
// }[, thisArg]);

// thisArg
// Необязательный параметр.
// Значение, используемое в качестве this при вызове функции callback.

wizards.forEach(function (wizard) {
  console.log('forEach this context');

  console.log(wizard.name + ', цвет: ' + wizard[this + 'Color']);
}, 'eyes');

var allWizards = '';
wizards.forEach(function (wizard, index, array) {
  allWizards += wizard.name;
  if(index !== (array.length - 1)) {
    allWizards += ', ';
  }
});

console.log(allWizards);
// ================================================================================
// Например, метод sort позволяет отсортировать массив,
// но изменяет порядок в исходном массиве.

// Для того чтобы сохранить исходный порядок,
// можно скопировать массив при помощи метода slice:
// этот метод возвращает копию исходного массива.
// Аргументы метода slice позволяют вырезать часть массива.


var wizardNames = wizards.map(function (it) {
  return it.name;
});
console.log('wizard names');
console.log(wizardNames);

console.log('SLICE + SORT');
var wizardNamesCopy = wizardNames.slice();
console.log('wizard names sliced');
console.log(wizardNamesCopy);
console.log('wizard names sorted');
console.log(wizardNamesCopy.sort());

// Чтобы указать правило сортировки, надо передать функцию обратного вызова,
// которая задаёт соответствие между двумя элементами.

wizards.sort(function (first, second) {
  if(first.name > second.name) {
    return 1;
  } else if (first.name < second.name) {
    return -1;
  } else {
    return 0;
  }
});

console.log(wizards);
// ================================================================================
// Свёртка. Она реализуется методом reduce,
// если нам нужно свернуть все элементы слева направо,
// или reduceRight, если справа налево.

// Вторым параметром метода reduce указывается начальное значение
// промежуточного результата. Если его не указать,
// то оно будет равно первому элементу массива,
// а обработка элементов начнется со второго элемента.

var party = 'Саурон пригласил на вечеринку: ';

var result = wizards.reduce(function (accumulator, it, i, array) {
  var message = accumulator + it.name;

  if (i !== (array.length - 1)) {
    message += ', ';
  }

  return message;
}, party);

console.log(result);

// ================================================================================
// Метод join, который соберёт все элементы в строку через разделитель.
// Разделитель указывается первым аргументом метода join.

var party = 'Саурон пригласил на вечеринку: ';
var result = wizards.map(function (it) {
    return it.name;
  }).join(', ');

console.log(party + result);

// ================================================================================
// т.к. объект, который возвращает querySelectorAll,
// является лишь псевдомассивом, то операции над ним как над массивом невозможны.
// Для того чтобы обойти это ограничение,
// мы можем вызвать метод массива, подсунув вместо настоящего массива псевдомассив.

// Метод call позволяет вызвать функцию с заданным контекстом.
// Первым параметром метода следует указывать контекст функции,
// а остальными параметрами - параметры функции.
// функция.call(контекст, параметр1, параметр2...);

var headers = document.querySelectorAll('h1');

console.log([].map.call(headers, function (it) {
  return it.textContent;
}));

// Array.from превращает в массив все, что похоже на массив.
var headers = document.querySelectorAll('h1');

console.log(Array.from(headers).map(function (it) {
  return it.textContent;
}));
