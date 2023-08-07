
// npm i imagemin -D
// npm i imagemin-avif -D

// ========= gulp-imagemin Avif modules =========
// https://github.com/delfimov/imagemin-avif

// quality
// Default: 90 [0 and 100]

// lossless
// Default: false

// speed
// Default: 5`

const imagemin = require('gulp-imagemin');
const imageminNodeAvif = require('imagemin-avif');

function avif() {
  return (
    src([path.img.source + '*.jpg'])
      .pipe(plumber())
      .pipe(imagemin([imageminNodeAvif({ quality: 70 })]))
      .pipe(dest(path.img.compressed + 'avif'))
  );
}
exports.avif = avif;
