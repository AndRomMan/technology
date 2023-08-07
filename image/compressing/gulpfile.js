'use strict';

// Задаём качество изображения от 0 до 100
let quality = 80;
// ========= Установка рабочих модулей =========
// npm install -g gulp-cli
// npm i gulp -D

// ========= gulp-imagemin fault =========
// npm install -D gulp-imagemin@7.1.0
// This is the last version of gulp-imagemin that is built with CommonJS.

// =========  =========

// npm i gulp-rename -D
// npm i gulp-plumber -D
// npm i del -D
// npm i imagemin-mozjpeg -D
// npm i imagemin-webp -D
// npm i gulp-svgstore -D

const gulp = require('gulp');
const {series, parallel, watch, src, dest} = require('gulp');
const rename = require('gulp-rename'); // плагин для переименования файлов
const plumber = require('gulp-plumber'); // плагин для перехвата ошибок в потоке
const del = require('del'); // плагин для удаления файлов

// ========= img producing module =========
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const imageminSvgo = require('imagemin-svgo');
// imagemin-webp не ставит расширения файла - требуется переименование посредством плагина gulp-rename!

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

// =========================== gulp-imagemin JPG modules ===========================
// https://github.com/sindresorhus/gulp-imagemin

function renameJpeg() {
  return src(path.img.source + '*.jpeg')
    .pipe(plumber())
    .pipe(rename({ extname: '.jpg' }))
    .pipe(gulp.dest(path.img.source));
}
// exports.renameJpeg = renameJpeg;

function eraseJpeg() {
  return del(path.img.source + '*.jpeg');
}
// exports.eraseJpeg = eraseJpeg;
let renameJpegToJpg = gulp.series(renameJpeg, eraseJpeg);

function mozJpgX() {
  return gulp
    .src(path.img.source + '*.jpg')
    .pipe(
      imagemin(
         [
          imagemin.mozjpeg({
            quality: quality,
            progressive: true,
          }),
        ]
      ),
    )
    .pipe(gulp.dest(path.img.compressed + `/jpg/mozJpg-${quality}`));
};
// exports.mozJpgX = mozJpgX;

function eraseCompressedJpg() {
  return del(path.img.compressed + '/jpg');
}
exports.eraseCompressedJpg = eraseCompressedJpg;

let getCompressedJpg = gulp.series(renameJpegToJpg, mozJpgX);
exports.getCompressedJpg = getCompressedJpg;

// =========================== gulp-imagemin Webp modules ===========================
// https://github.com/imagemin/imagemin-webp

// quality
// Default: 75 [between 0 and 100]

// method - parameter controls the trade off between encoding speed and the compressed file size and quality.
// Default: 4 [0 (fastest) - 6 (slowest)]

// lossless
// Default: false

// crop
// Type: object { x: number, y: number, width: number, height: number }

// resize - happens after crop
// Type: object { width: number, height: number }


function jpgToWebpX() {
    return src([path.img.source + '*.jpg'])
      .pipe(plumber())
      .pipe(imagemin([imageminWebp({ quality: quality })]))
      .pipe(rename({ extname: '.webp' }))
      .pipe(dest(path.img.compressed + `/webp/webp-${quality}`));
  }

  function getCompressedWebp() {
    return jpgToWebpX();
  }

exports.getCompressedWebp = getCompressedWebp;

function eraseCompressedWebp() {
  return del(path.img.compressed + '/webp');
}
exports.eraseCompressedWebp = eraseCompressedWebp;


// ========= Get all the compressed images =========
let getImgs = gulp.parallel(eraseCompressedJpg, getCompressedWebp, getCompressedJpg, getCompressedWebp);
exports.getImgs = getImgs;


// ========= gulp-imagemin SVG modules =========
// https://www.npmjs.com/package/gulp-svgstore

function getCompressedSvg() {
  return src([path.img.source + '*.svg'])
    .pipe(plumber())
    .pipe(
      imagemin([
        imageminSvgo({
          plugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false },
            { removeUnusedNS: false },
            { cleanupIDs: false },
            { removeMetadata: true },
            { removeComments: true },
            { removeEmptyAttrs: true },
            { removeEmptyText: true },
          ],
        }),
      ]),
    )
    .pipe(gulp.dest(path.img.compressed + `/svg`));
}
exports.getCompressedSvg = getCompressedSvg;

function eraseCompressedSvg() {
  return del(path.img.compressed + 'svg');
}
exports.eraseCompressedSvg = eraseCompressedSvg;

let getSvgImgs = gulp.series(eraseCompressedSvg, getCompressedSvg);
exports.getSvgImgs = getSvgImgs;
