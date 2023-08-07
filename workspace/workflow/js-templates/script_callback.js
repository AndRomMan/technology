/* eslint-disable no-invalid-this */
/* eslint-disable no-console, no-console*/

'use strict';

// console.log('________________ callback module start');
// В случае использования колбека в качестве обработчика события,
//  нужно дать ему имя по шаблону
//   on + ElementName + EventName
// Есть еще один шаблон
//  elementName + EventName + Handler

/* let logOutPrint = function (printIncomeData) {
  console.log(printIncomeData);
};
let documentClickHandler = function (evt) {
  logOutPrint(evt);
};
document.addEventListener('mousedown', logOutPrint);

document.addEventListener('mouseup', documentClickHandler);
// Сначала выведется сообщение 'Any function'
// let anyFunction = function (logOut) {
//   logOut('hi there');
// };
let anyFunction = function (logOut) {
  logOut('hi there');
};

// Через 3 сек. выводится сообщение 'Timeout'
setTimeout(function () {
  logOutPrint('Timeout');
}, 3000);
anyFunction(logOutPrint); */

console.log('________________ bind');

let logPrint = function (printIncomeData) {
  console.log(printIncomeData);
};

let clickHandler = logPrint.bind(null, 'click detected', 2, 3);
document.addEventListener('mousedown', clickHandler);
