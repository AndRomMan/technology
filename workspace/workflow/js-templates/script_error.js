/* eslint-disable no-alert */
/* eslint-disable no-console*/
'use strict';

function isPositiveNum (num) {
  if (typeof num === 'undefined') {
    throw new Error('Function error: number is not defines');
  }
  num = parseInt(num);

  return num > 0;
}

console.log(isPositiveNum(-15));
console.log(isPositiveNum(30));
console.log(isPositiveNum());
