/* eslint-disable no-unused-vars */
// npx htmlhint **/*.html
// npx eslint yourfile.js
// npx stylelint "**/*.css

// npx htmlhint projectFolder/**/*.html
// npx eslint projectFolder/**/*.js
// npx stylelint projectFolder/**/*.css

'use strict';
// подключаем Gulp
const gulp = require('gulp');
const {series, parallel, watch, src, dest} = require('gulp');

// переименование файлов
const rename = require('gulp-rename');
// удаление файлов
const del = require('del');

const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');

// ========= css producing module =========
const sass = require('gulp-sass');
// сжатие и оптимизации CSS
const csso = require('gulp-csso');
// PostCSS
const postcss = require('gulp-postcss');

// подключаем плагины PostCss
// const autoprefixer = require('autoprefixer');
const autoprefixer = require('gulp-autoprefixer');

// ========== javascript producing module ==========
const terser = require('gulp-terser');
// const babel = require('gulp-babel');

// ========= html producing module =========
// const htmlhint = require('gulp-htmlhint');

const htmlmin = require('gulp-html-minifier-terser');
const fileinclude = require('gulp-file-include');

// ========= img producing module =========
// gulp-imagemin includes the plugins:
// mozjpeg
// svgo
// optipng сжимает PNG без потерь

const imagemin = require('gulp-imagemin');

// imagemin-webp doesn't set a file extension "webp" - it need to rename
const imageminWebp = require('imagemin-webp');
// const imageminJpegRecompress = require('imagemin-jpeg-recompress');
// const imageminJpegTran = require('imagemin-jpegtran');
// const imageminMozJpeg = require('imagemin-mozjpeg');
let svgmin = require('gulp-svgmin');

// plugin for making svg-sprite
const svgstore = require('gulp-svgstore');

// ========= file path =========
const source = 'source/';
const build = 'build/';

const path = {
  html: {
    source: source + '*.html',
    watch: source + '**/*.html',
    exSource: '!' + source + '_*.html',
    build,
    // buildpath: build,
  },
  style: {
    source: source + 'sass/style.scss',
    watch: source + 'sass/**/*.scss',
    build: build + 'css/',
  },
  script: {
    source: source + 'js/*.js',
    watch: source + 'js/**/*.js',
    exSource: '!' + source + 'js/*.min.js',
    dest: source + 'js/',
    build: build + 'js/',
  },
  img: {
    sourceFolder: source + 'img/',
    source: source + 'img/*.{jpg,png,svg}',
    watch: source + 'img/**/*.{jpg,jpeg,png,svg}',
    compressedFolder: source + 'img/compressed/',
    build: build + 'img/',
  },
  spriteSVG: {
    source: source + 'img/sprite_svg/*.svg',
    watch: source + 'img/sprite_svg/*.svg',
    compressedFolder: source + 'img/sprite_svg/compressed/',
    build: build + 'img/',
  },
  iconSVG: {
    source: source + 'img/*.svg',
    compressedFolder: source + 'img/compressed/',
    build: build + 'img/',
  },
  favicon: {
    source: source + 'favicon/**/*.*',
    build,
  },
  font: {
    source: source + 'fonts/*.{woff,woff2}',
    build: build + 'fonts/',
  },
};

// ============================== tasks ==============================

// ========== browser autoreload ==========
const browsersync = require('browser-sync').create();

function refresh(done) {
  browsersync.reload();
  done();
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: build,
      index: 'index.html',
    },
    port: 3000,
    notify: false, // Отключаем уведомления
    online: false, // false, если хотите работать без подключения к интернету
    // open: true,
    // cors: true,
    // ui: false,
    // browser: ["google chrome", "firefox"]
  });
}

// ========== javascript producing module ==========
function getJS() {
  return (
    src(path.script.source)
      // src([path.script.source, path.script.exSource])
      .pipe(plumber())
      .pipe(sourcemap.init())
      // .pipe(
      //   babel({
      //     presets: ['@babel/preset-env'],
      //   })
      // )
      .pipe(
        terser({
          ecma: 2015,
          // ecma: 5,
          // ecma: 2015, // specify one of: 5, 2015, 2016, etc.
        })
      )
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemap.write('.'))
      .pipe(dest(path.script.build))
      .pipe(browsersync.stream())
  );
}

// ========= css producing module =========
// function getCSS() {
//   return src(path.style.source)
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([autoprefixer()]))
//     .pipe(csso())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(sourcemap.write('.'))
//     .pipe(dest(path.style.build))
//     .pipe(browsersync.stream());
// }

function getCSS() {
  return (
    src(path.style.source)
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      // here we use gulp-autoprefixer
      .pipe(autoprefixer())
      .pipe(dest(path.style.build))
      .pipe(csso())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemap.write('.'))
      .pipe(dest(path.style.build))
      .pipe(browsersync.stream())
  );
}

function getHTML() {
  return src([path.html.source, path.html.exSource])
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: '@@',
      })
    )
    .pipe(htmlmin({collapseWhitespace: true, collapseInlineTagWhitespace: true, removeComments: true}))
    .pipe(dest(path.html.build))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch(path.style.watch, getCSS);
  gulp.watch(path.script.watch, getJS);
  gulp.watch(path.html.watch, getHTML);
  gulp.watch(path.spriteSVG.watch, gulp.series(getSvgSprite, getHTML));

  // gulp.watch(path.spriteSVG.watch, gulp.series(compressSvgForSprite, getSvgSprite, workHTML, refresh));
  // gulp.watch(path.style.watch, gulp.series(workCSS, refresh));
  // gulp.watch(path.script.watch, gulp.series(workJS, refresh));
  // gulp.watch(path.html.watch, gulp.series(workHTML, refresh));
}

// ========= svg sprite module =========
function compressSvgForSprite() {
  return gulp
    .src(path.spriteSVG.source)
    .pipe(
      svgmin({
        plugins: [
          {removeDimensions: true},
          {removeViewBox: false},
          {cleanupNumericValues: {floatPrecision: 1}},
          {cleanupListOfValues: {floatPrecision: 1}},
          {removeXMLNS: true},
          {removeStyleElement: true},
          {removeScriptElement: true},
          {removeOffCanvasPaths: true},
          {reusePaths: true},
        ],
      })
    )
    .pipe(gulp.dest(path.spriteSVG.compressedFolder));
}

function createSvgSprite() {
  return src(path.spriteSVG.compressedFolder + '*.svg')
    .pipe(plumber())
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(dest(path.spriteSVG.compressedFolder))
    .pipe(dest(path.img.compressedFolder));
}

// ========= JPEG rename to JPG module =========
function jpegToJpg() {
  return src(path.img.sourceFolder + '*.jpeg')
    .pipe(plumber())
    .pipe(rename({extname: '.jpg'}))
    .pipe(gulp.dest(path.img.sourceFolder));
}

function eraseJpeg() {
  return del(path.img.sourceFolder + '*.jpeg');
}

let renameJpegToJpg = series(jpegToJpg, eraseJpeg);

// ========= img compressing module =========
/* method - trade off between encoding speed and the file size and quality.
Default: 4 - 0 (fastest) .. 6 (slowest)
quality - Default: 75
*/
function convertImgToWebp() {
  return (
    src(path.img.sourceFolder + '{*.png, *.jpg}')
      .pipe(plumber())
      .pipe(imagemin([imageminWebp({quality: 70})]))
      // .pipe(imagemin([imageminWebp({quality: 75, method: 4})]))
      .pipe(rename({extname: '.webp'}))
      .pipe(dest(path.img.compressedFolder))
  );
}

function compressSvg() {
  return gulp
    .src(path.iconSVG.source)
    .pipe(
      svgmin({
        plugins: [
          {removeDimensions: true},
          {removeViewBox: false},
          {cleanupNumericValues: {floatPrecision: 1}},
          {cleanupListOfValues: {floatPrecision: 1}},
          // {removeXMLNS: true},
          {removeStyleElement: true},
          {removeScriptElement: true},
          {removeOffCanvasPaths: true},
          {reusePaths: true},
        ],
      })
    )
    .pipe(gulp.dest(path.iconSVG.compressedFolder));
}

// function compressSvg() {
//   return src(path.iconSVG.source)
//     .pipe(plumber())
//     .pipe(
//       imagemin([
//         imagemin.svgo({
//           plugins: [{removeViewBox: false}, {removeMetadata: true}],
//         }),
//       ])
//     )
//     .pipe(gulp.dest(path.iconSVG.compressedFolder));
// }

function compressJpgPng() {
  return src(path.img.source)
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.mozjpeg({
          quality: 75,
          progressive: true,
        }),
        imagemin.optipng({optimizationLevel: 5}),
        // imagemin.svgo({
        //   plugins: [{removeViewBox: false},
        //     {cleanupIDs: false}],
        // }),
      ])
    )
    .pipe(gulp.dest(path.img.compressedFolder));
}

// ========= erase module =========
function eraseCompressedImg() {
  return del(path.img.compressedFolder);
}

function eraseBuild() {
  return del(build);
}

function eraseCSS() {
  return del(path.style.build);
}

function eraseHTML() {
  return del(path.html.build + '*.html');
}

function eraseJS() {
  return del(path.script.build);
}

function eraseFonts() {
  return del(path.font.build);
}

function eraseImg() {
  return del(path.img.build);
}

function eraseSpriteSvg() {
  return del(path.spriteSVG.compressedFolder + '*.svg');
}

function eraseMap() {
  return del(build + '/**/*.map');
}

// ========= copy module =========
function copyImgToBuild() {
  return src(path.img.compressedFolder + '/*.{jpg,png,svg,webp}').pipe(dest(path.img.build));
}

function copyFontToBuild() {
  return src(path.font.source).pipe(dest(path.font.build));
}

function copyFaviconToBuild() {
  return src(path.favicon.source).pipe(dest(path.favicon.build));
}

// ========= build module =========
// function checkHtml() {
//   return src(path.html.source).pipe(plumber()).pipe(htmlhint('.htmlhintrc')).pipe(htmlhint.reporter());
// }

let getSvgSprite = gulp.series(eraseSpriteSvg, compressSvgForSprite, createSvgSprite);

let getImg = gulp.series(
  eraseCompressedImg,
  renameJpegToJpg,
  compressSvg,
  compressJpgPng,
  convertImgToWebp,
  getSvgSprite,
  copyImgToBuild
);

let startServer = gulp.parallel(watchFiles, browserSync);
let getWorkFiles = gulp.series(getCSS, getJS, getHTML);
let start = gulp.series(getWorkFiles, startServer);
let buildProject = gulp.series(eraseBuild, getImg, getWorkFiles, copyFaviconToBuild, copyFontToBuild, eraseMap);
let buildAndStart = gulp.series(eraseBuild, getImg, getWorkFiles, copyFaviconToBuild, copyFontToBuild, startServer);

// ========= exports =========
let getSvgToBuild = gulp.series(compressSvg, copyImgToBuild);
exports.getSvgToBuild = getSvgToBuild;
// ========= exports =========
exports.getSvgSprite = getSvgSprite;
// exports.eraseBuild = eraseBuild;
exports.getImg = getImg;
exports.buildProject = buildProject;
exports.startServer = startServer;
exports.buildAndStart = buildAndStart;
exports.start = start;
exports.getWorkFiles = getWorkFiles;

// exports.watchFiles = watchFiles;
// exports.browserSync = browserSync;
exports.getHTML = getHTML;
exports.getJS = getJS;
exports.getCSS = getCSS;
// exports.checkHtml = checkHtml;

// exports.jpegToJpg = jpegToJpg;
// exports.eraseJpeg = eraseJpeg;
// exports.renameJpegToJpg = renameJpegToJpg;

// exports.convertImgToWebp = convertImgToWebp;
// exports.compressJpgPng = compressJpgPng;

// exports.compressSvgForSprite = compressSvgForSprite;
// exports.compressSvg = compressSvg;
// exports.createSvgSprite = createSvgSprite;

// exports.copyImgToBuild = copyImgToBuild;
// exports.copyFontToBuild = copyFontToBuild;
// exports.copyFaviconToBuild = copyFaviconToBuild;

// exports.eraseCompressedImg = eraseCompressedImg;
// exports.eraseCSS = eraseCSS;
// exports.eraseHTML = eraseHTML;
// exports.eraseJS = eraseJS;
// exports.eraseFonts = eraseFonts;
// exports.eraseImg = eraseImg;
// exports.eraseSpriteSvg = eraseSpriteSvg;
// exports.eraseMap = eraseMap;
