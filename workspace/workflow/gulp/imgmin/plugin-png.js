
// npm i imagemin -D
// npm i imagemin-optipng -D
// npm i imagemin-pngquant -D

// ========= gulp-imagemin PNG losless modules =========
// https://github.com/imagemin/imagemin-optipng
// optipng - сжимает PNG без потерь

// optimizationLevel
// Default: 3 [0 .. 7]

const imagemin = require('gulp-imagemin');
const optipng = require('imagemin-optipng');

function optiPng() {
  return gulp
    .src(path.img.source + '*.png')
    .pipe(
      imagemin([
        optipng({ optimizationLevel: 1 }),
       ]),
    )
    .pipe(gulp.dest(path.img.compressed + 'png/optiPng'));
};
exports.optiPng = optiPng;

let getCompressedLosslessPng = gulp.parallel(optiPng);

function eraseCompressedPng() {
  return del(path.img.compressed + 'png');
}
exports.eraseCompressedPng = eraseCompressedPng;

let getPngImg = gulp.series(eraseCompressedPng, getCompressedLosslessPng);
exports.getPngImg = getPngImg;


// ========= gulp-imagemin PNG modules =========
// speed
// Default: 4 - [1 (brute-force) to 11 (fastest)]

// Speed 10 has 5% lower quality, but is about 8 times faster than the default.
// Speed 11 disables dithering and lowers compression level.

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

function pngquant() {
  return gulp
    .src(path.img.source + '*.png')
    .pipe(imagemin([pngquant({ speed: 4 })]))
    .pipe(gulp.dest(path.img.compressed + 'pngquant'));
};
exports.pngquant = pngquant;

let getCompressedPng = gulp.parallel(pngquant);


function eraseCompressedPng() {
  return del(path.img.compressed + 'pngquant');
}
exports.eraseCompressedPng = eraseCompressedPng;

let getPngImg = gulp.series(eraseCompressedPng, getCompressedPng);
exports.getPngImg = getPngImg;
