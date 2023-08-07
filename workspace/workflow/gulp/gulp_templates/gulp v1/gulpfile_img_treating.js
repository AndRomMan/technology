// `npm i gulp-responsive sharp imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp imagemin-svgo imagemin-jpegtran imagemin-optipng imagemin-jpeg-recompress -D`

const gulp = require('gulp');
const {series, parallel, watch, src, dest} = require('gulp');

// плагин для переименования файлов
const rename = require('gulp-rename');

// плагин для удаления файлов
const del = require('del');

const plumber = require('gulp-plumber');

// ========= img producing module =========
const svgstore = require('gulp-svgstore');
const imagemin = require('gulp-imagemin');
const responsive = require('gulp-responsive');

// const imageMin = require('imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminJpegTran = require('imagemin-jpegtran');
const imageminMozJpeg = require('imagemin-mozjpeg');

// optipng 	сжимает PNG без потерь
const imageminOptiPng = require('imagemin-optipng');

// pngquant 	сжимает PNG с потерями
const imageminPngQuant = require('imagemin-pngquant');

const imageminSvgo = require('imagemin-svgo');

// imagemin-webp не ставит расширения файла - требуется переименование!
// imagemin-webp и gulp-webp сжимают одинаково
const imageminWebp = require('imagemin-webp');

// ========= html producing module =========
function compressSvgForSprite() {
  return src(['src/img/sprite/*.svg', '!src/img/compressed/'])
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            {removeViewBox: false},
            {removeXMLNS: true},
            {cleanupListOfValues: true},
            {removeDimensions: true},
            {removeUselessStrokeAndFill: true},
            {removeStyleElement: true},
          ],
        }),
      ])
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

function includeSvgSpriteInHtml() {
  return (
    src('src/*.html')
      .pipe(plumber())
      .pipe(posthtml([include()]))
      // .pipe(fileInclude())
      .pipe(dest('build'))
  );
}
exports.includeSvgSpriteInHtml = includeSvgSpriteInHtml;

// ========= img producing module =========
function renameJpegJpg() {
  return src('src/img/**/*.jpeg')
    .pipe(plumber())
    .pipe(rename({extname: '.jpg'}))
    .pipe(gulp.dest('src/img/'));
}
exports.renameJpegJpg = renameJpegJpg;

function eraseJpeg() {
  return del('src/img/**/*.jpeg');
}
exports.eraseJpeg = eraseJpeg;
exports.JpegToJpg = series(renameJpegJpg, eraseJpeg);

/* method - parameter controls the trade off between
encoding speed and the compressed file size and quality.
Default: 4
0 (fastest) - 6 (slowest) */
function imgWebpConverter() {
  return (
    src(['src/img/*.{png,jpg}', '!src/img/resized/*.{png,jpg}', '!src/img/compressed'])
      .pipe(plumber())
      .pipe(imagemin([imageminWebp({quality: 70})]))
      // .pipe(imagemin([imageminWebp({quality: 75, method: 4})]))
      .pipe(rename({extname: '.webp'}))
      // .pipe(dest('src/img/compressed/imagemin-webp /'))
      .pipe(dest('src/img/compressed/webp'))
  );
}
exports.imgWebpConverter = imgWebpConverter;

function imgJpgReCompressor() {
  return src('src/img/*.jpg)')
    .pipe(plumber())
    .pipe(
      imagemin([
        imageminJpegRecompress({
          loops: 4,
          min: 70,
          max: 80,
          // quality: 'medium',
          quality: 'high',
        }),
      ])
    )
    .pipe(dest('src/img/compressed/jpgRecompress'));
}
exports.imgJpgReCompressor = imgJpgReCompressor;

function imgMozJpegCompressor() {
  // return src('src/img/*.+(jpg|jpeg)')
  return src('src/img/*.jpg')
    .pipe(plumber())
    .pipe(
      imagemin([
        imageminMozJpeg({
          quality: 75,
          progressive: true,
        }),
      ])
    )
    .pipe(gulp.dest('src/img/compressed/jpg-Moz'));
}
exports.imgMozJpegCompressor = imgMozJpegCompressor;

/*  jpegtran, обеспечивают сжатие без потерь,
  перестраивая сжатые данные без ухудшения качества изображения */
function imgJpegTranCompressor() {
  return src('src/img/*.jpg')
    .pipe(plumber())
    .pipe(
      imagemin([
        imageminJpegTran({
          progressive: true,
          // buffer: true,
        }),
      ])
    )
    .pipe(gulp.dest('src/img/compressed/jpg-Tran'));
}
exports.imgJpegTranCompressor = imgJpegTranCompressor;

// optipng 	сжимает PNG без потерь
function imgOptiPngCompressor() {
  return src('src/img/*.png')
    .pipe(plumber())
    .pipe(imagemin([imageminOptiPng({optimizationLevel: 4})]))
    .pipe(gulp.dest('src/img/compressed/png-OptiPngLossless'));
}
exports.imgOptiPngCompressor = imgOptiPngCompressor;

// pngquant сжимает PNG с потерями
// strip
// явно укажите очистку от метаданных

// speed
// Default: 4
// Values: 1 (brute-force) to 11 (fastest)
// Скорость 10 имеет на 5% более низкое качество,
//  но примерно в 8 раз быстрее, чем по умолчанию.
//  Скорость 11 отключает сглаживание и снижает уровень сжатия.

// quality
// Type: Array<min: number, max: number>
// Values: Array<0...1, 0...1>
// Example: [0.3, 0.5]


function compressPngQuant() {
  return src(path.img.source)
    .pipe(plumber())
    .pipe(
      imagemin([
        imageminPngQuant({
          quality: [0.6, 0.7],
          speed: 6,
          strip: true,
        }),
      ])
    )
    .pipe(gulp.dest(path.img.compressedFolder + 'pngQuant'));
}
exports.compressPngQuant = compressPngQuant;

function imgSvgoCompressor() {
  return src('src/img/*.svg')
    .pipe(plumber())
    .pipe(
      imagemin([
        imageminSvgo({
          plugins: [{removeViewBox: false}, {removeMetadata: true}],
        }),
      ])
    )
    .pipe(gulp.dest('src/img/compressed/svg-Svgo'));
}
exports.imgSvgoCompressor = imgSvgoCompressor;

// Изменение размеров изображения делать до применения сжатия
function imgResizer() {
  return src('src/img/resize/*.+(jpg|png)')
    .pipe(plumber())
    .pipe(
      responsive(
        {
          '*.jpg': {
            // Resize all JPG images to 200 pixels wide
            width: '50%',
          },
          '*.png': {
            // Resize all PNG images to 50% of original pixels wide
            width: '50%',
          },
          // Resize all images to 100 pixels wide and add suffix -thumbnail
          '*': {
            width: '50%',
            rename: {suffix: '-resized'},
          },
        },
        {
          // Global configuration for all images
          // The output quality for JPEG, WebP and TIFF output formats
          quality: 75,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // Zlib compression level of PNG output format
          compressionLevel: 6,
          // Strip all metadata
          withMetadata: false,
        }
      )
    )
    .pipe(dest('src/img/resized'));
}
exports.imgResizer = imgResizer;

function imgCompressor() {
  return gulp
    .src('src/img/*.{png,jpg,svg}')
    .pipe(
      imagemin([
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [{removeViewBox: false}, {cleanupIDs: false}],
        }),
      ])
    )
    .pipe(gulp.dest('build/img'));
}
exports.imgCompressor = imgCompressor;
