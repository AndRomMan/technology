// npm install -g gulp-cli
// npm i gulp -D
// npm i del -D
// npm i gulp-plumber -D
// npm i gulp-rename -D
// npm i gulp-changed -D

// npm i gulp-imagemin -D
// npm i imagemin-avif -D
// npm i imagemin-mozjpeg -D
// npm i imagemin-webp -D
// npm i imagemin-svgo -D
// npm i imagemin-jpegtran -D
// npm i imagemin-optipng -D
// npm i imagemin-pngquant -D

// npm i imagemin -D
// npm i sharp -D
// npm i svgo -D

'use strict';

const gulp = require('gulp');
const {series, parallel, watch, src, dest} = require('gulp');

// плагин для переименования файлов
const rename = require('gulp-rename');
// плагин для перехвата ошибок в потоке
const plumber = require('gulp-plumber');
// плагин для удаления файлов
const del = require('del');


// Для gulp-imagemin v8.0.0
// gulp-imagemin включает плагины:
// mozjpeg
// svgo
// optipng - сжимает PNG без потерь

// 'imagemin': '^8.0.1',
// 'imagemin-pngquant': '^9.0.2', // lossy
// 'imagemin-gifsicle': '^7.0.0',
// 'imagemin-mozjpeg': '^9.0.0',
// 'imagemin-optipng': '^8.0.0', // losless
// 'imagemin-svgo': '^9.0.0'

// Для imagemin v8.0.1
// 'imagemin-jpegtran': '^7.0.0', // losless
// 'imagemin-svgo': '^9.0.0',
// 'imagemin-webp': '^6.0.0',

// ========= img producing module =========
// To solve the gulp error '[ERR_REQUIRE_ESM]: require() not supported',
// downgrade the version of the gulp-imagemin package to 7.1.0:
// npm install --save-dev gulp-imagemin@7.1.0
// This is the last version of gulp-imagemin that is built with CommonJS.

const imagemin = require('gulp-imagemin');
const imageminNodeWebp = require('imagemin-webp'); // imagemin-webp не ставит расширения файла - требуется переименование!
// плагин для отслеживания файлов без изменения - для них компрессия не запускается
const changed = require('gulp-changed');

// function imageMin(){
//     return gulp.src(path.src.image)
//         .pipe(newer(path.dist.image))
//         .pipe(imagemin([...

// ========= file path =========
const source = 'source/';
const compressed = 'compressed/';
const build = 'build/';

const path = {
  img: {
    source: source + 'img/',
    watch: source + 'img/',
    compressed: compressed,
    build: build + 'img/',
  },
};

//  фильтр по расширениям файлов:
//  src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
// !./input/test.js — исключает файл test.js из выборки
// *.{jpg,jpeg,png}',


// ========= copy module =========
function copyImgToBuild() {
  return src(path.img.compressed + '*.{jpg,png,svg,webp}').pipe(dest(path.img.build));
}
