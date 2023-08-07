/* eslint-disable no-alert */
/* eslint-disable no-console*/
'use strict';

// =================== File loading ===================
// Константа с допустимыми расширениями
  let FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

let inputFileElement = document.querySelector('.file_input');
let loadedImg = document.querySelector('.loaded_img');
console.log(inputFileElement);
console.log(loadedImg);

  inputFileElement.addEventListener('change', function () {
// У DOM-узла поля для выбора файла есть свойство
// files — это структура, похожая на массив.
// В этом свойстве хранится список файлов.
    let file = inputFileElement.files[0];
    console.log(file);

// А чтобы не думать о том, выбрал пользователь image.JPG или image.jpg,
// приведём название файла к строчным буквам с помощью метода строки toLowerCase.
    let fileName = file.name.toLowerCase();
    console.log('fileName =  ' + fileName);

// Нужно проверить, оканчивается ли имя файла одним из допустимых расширений.
// Для этого мы с помощью метода some пройдём по массиву FILE_TYPES
// и для каждого элемента — допустимого расширения — проверим,
// оканчивается ли название файла на него.

// Метод endsWith() определяет, заканчивается ли строка символами другой строки,
// возвращая, соответственно, true или false.

// Метод SOME возвращает true,
// если хотя бы для одного элемента массива переданная функция вернет true,
// в противном случае метод возвращает false.
    var matches = FILE_TYPES.some(function (arrayElem) {
     return fileName.endsWith(arrayElem);
    });
    console.log('matches = ' + matches);

        // Теперь условие matches можно использовать
        if (matches) {
          //  заведём себе свой собственный «ридер».
          var reader = new FileReader();
          console.log(reader);

          // Добавим ему обработчик события load,
          // которое можно читать как «чтение завершено».
          // В обработчике результат чтения файла — изображение — мы положим
          // в атрибут src DOM-узла с превью картинки.
          reader.addEventListener('load', function () {
          loadedImg.src = reader.result;
          });

          // После того, как произойдет событие 'load' - то есть reader прочитает file
          // c помощью метода readAsDataURL, в обработчике события 'load' в атрибут src
          // изображения записывается код Base64 загруженной картинки.
          reader.readAsDataURL(file);
        }

        console.log(loadedImg);

  });
