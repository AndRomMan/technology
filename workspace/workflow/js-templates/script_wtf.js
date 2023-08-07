/* eslint-disable no-alert */
/* eslint-disable no-console*/
'use strict';

let arr0 = [];
let arr1 = [1, 2, 3]; // [object Object] - строковое представление объекта
let arr2 = [4, 5, 6];
let obj1 = {};
let obj2 = {};

console.log(arr1 + arr2);
console.log(arr0 + obj1);
console.log(obj1 + arr0);
console.log(obj1 + obj2);

let arr3 = new Array(3);
console.log(arr3);
console.log(Array(4).join('what' - 1));
