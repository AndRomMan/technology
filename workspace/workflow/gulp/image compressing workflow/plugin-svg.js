'use strict';

// npm i imagemin -D
// npm i imagemin-svgo -D
// npm i gulp-svgstore -D

const imagemin = require('gulp-imagemin');
const imageminSvgo = require('imagemin-svgo');
const svgstore = require("gulp-svgstore");

// ========= gulp-imagemin SVG modules =========
// https://www.npmjs.com/package/gulp-svgstore
// настройки компрессии https://github.com/svg/svgo

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


// ========= сжатие для создания SVG-спрайта =========

function compressSvgForSprite() {
  return src(['src/img/sprite/*.svg', '!src/img/compressed/'])
    .pipe(plumber())
    .pipe(
      imagemin([
        imageminSvgo({
          plugins: [
            {removeViewBox: false},
            {removeXMLNS: true},
            {cleanupListOfValues: true},
            {removeDimensions: true},
            {removeUselessStrokeAndFill: true},
            {removeStyleElement: true},
          ],
        }),
      ]),
    )
    .pipe(dest('src/img/compressed/sprite'));
}

exports.compressSvgForSprite = compressSvgForSprite;

function getSvgSpriteToBuild() {
  return src('src/img/compressed/sprite/*.svg')
    .pipe(plumber())
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(dest('build/img'));
}
exports.getSvgSpriteToBuild = getSvgSpriteToBuild;
