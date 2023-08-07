// gulp.js
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// команды запуска npm-plugins для тестирования
// npx htmlhint source/**/*.html
// npx eslint source/**/*.js
// npx eslint --fix source/js/*.js
// npx stylelint source/scss/**/*.scss
// npx stylelint public/payment-upgrade/css/**/*.css

// Внимание!
// 1 сжатие html отключено
// 2 нет плагина babel
// 3 отключено сжатие js и css

'use strict';
// подключаем Gulp
const {series, parallel, watch, src, dest} = require('gulp');
const gulp = require('gulp');
const rename = require('gulp-rename'); // переименование файлов
const del = require('del'); // удаление файлов
const plumber = require('gulp-plumber'); // предотвратвращает сбой при сборке, вызванное ошибками из плагинов Gulp
const sourcemap = require('gulp-sourcemaps');
const concat = require('gulp-concat'); // конкатенация файлов

// ========== javascript producing module ==========
const terser = require('gulp-terser');
const rollup = require('rollup');

// ========= css producing module =========
// const sass = require('gulp-sass');
// HINT: новая нотация для подключения SASS компилятора для gulp-sass >= v5.x.x
const sass = require('gulp-sass')(require('sass'));

const csso = require('gulp-csso'); // сжатие и оптимизации CSS
const postcss = require('gulp-postcss'); // PostCSS

// подключаем плагины PostCss
// const autoprefixer = require('autoprefixer');
const gAutoprefixer = require('gulp-autoprefixer');

// ========= html producing module =========
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-html-minifier-terser');

// ========================================================================
// ========= HTML setting  =========
const currentProject = 'slider/';
const source = 'src/';
const build = 'public/' + currentProject;

// ========= PHP setting  =========
// const currentProject = 'php-project/';
// const source = 'source/';
// const build = 'public/' + currentProject;

// ========= paths to files  =========
const path = {
  phpBlocks: {
    source: source + 'blocks/**/*.php',
    watch: source + 'blocks/**/*.php',
    build: build + 'blocks/',
  },
  php: {
    source: source + '*.php',
    watch: source + '*.php',
    build,
  },
  html: {
    source: source + '*.html',
    watch: source + '**/*.html',
    build,
  },
  style: {
    source: source + 'scss/style.scss',
    watch: source + 'scss/**/*.scss',
    build: build + 'css/',
  },
  styleVendor: {
    source: source + 'scss/vendor/*.css',
    watch: source + 'scss/vendor/*.css',
    build: build + 'css/',
  },
  scriptVendor: {
    source: source + 'js/vendor/*.js',
    watch: source + 'js/vendor/*.js',
    build: build + 'js/',
  },
  jsBundle: {
    source: source + 'js/',
    build: build + 'js/',
    watchMain: source + 'js/main.js',
    watchModules: source + 'js/modules/**/*.js',
  },
};

// ========== browser autoreload ==========
const browsersync = require('browser-sync').create();

function refresh(done) {
  browsersync.reload();
  done();
}

// function browserSync() {
//   browsersync.init({
//     server: {
//       baseDir: build,
//       index: 'index.html',
//     },
//     port: 3000,
//     notify: false, // Отключаем уведомления
//     online: false, // false, если работать без подключения к интернету
//     open: true,
//     cors: true,
//     ui: false,
//     browser: ['C:/Program Files/Google/Chrome/Application/chrome.exe'],
//     // browser: ['chrome'],
//     // browser: ['firefox'],
//     // browser: ["chrome", "firefox"]
//   });
// }

// function browserPHPsync() {
//   browsersync.init({
//     server: {
//       baseDir: build,
//       index: 'index.php',
//     },
//     port: 3000,
//     notify: false, // Отключаем уведомления
//     online: false, // false, если работать без подключения к интернету
//     open: true,
//     cors: true,
//     ui: false,
//     browser: ['C:/Program Files/Google/Chrome/Application/chrome.exe'],
//     // browser: ['chrome'],
//     // browser: ['firefox'],
//     // browser: ["chrome", "firefox"]
//   });
// }

function browserHTMLsync() {
  browsersync.init({
    server: {
      baseDir: build,
      index: 'index.html',
    },
    port: 3000,
    notify: false, // Отключаем уведомления
    online: false, // false, если работать без подключения к интернету
    open: true,
    cors: true,
    ui: false,
    browser: ['C:/Program Files/Google/Chrome/Application/chrome.exe'],
    // browser: ['chrome'],
    // browser: ['firefox'],
    // browser: ["chrome", "firefox"]
  });
}

// ========== javascript producing module ==========
function getJSbundle() {
  return rollup
    .rollup({
      input: path.jsBundle.source + 'main.js',
    })
    .then((bundle) => {
      return bundle.write({
        file: path.jsBundle.source + 'bundle.js',
        format: 'es',
        // sourcemap: true,
      });
    });
}

function getMinJSandMap() {
  return src(path.jsBundle.source + 'bundle.js')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(dest(path.jsBundle.build))
    .pipe(browsersync.stream());
}

function getVendorMinJS() {
  return src(path.scriptVendor.source).pipe(plumber()).pipe(dest(path.scriptVendor.build)).pipe(browsersync.stream());
}

let buildJS = gulp.series(getJSbundle, getMinJSandMap, getVendorMinJS);
exports.buildJS = buildJS;

// ========= css producing module =========
function getMinCSSandMap() {
  return src(path.style.source)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(gAutoprefixer())
    .pipe(dest(path.style.build))
    .pipe(browsersync.stream());
}

function getVendorMinCSS() {
  return src(path.styleVendor.source)
    .pipe(plumber())
    .pipe(gAutoprefixer())
    .pipe(dest(path.styleVendor.build))
    .pipe(browsersync.stream());
}

let buildCSS = gulp.series(getMinCSSandMap, getVendorMinCSS);
exports.buildCSS = buildCSS;

function getHTML() {
  return src(path.html.source)
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: '@@',
      })
    )
    .pipe(dest(path.html.build))
    .pipe(browsersync.stream());
}

exports.buildHTML = getHTML;

// ========= PHP module =========
// function getPHP() {
//   return src(path.php.source)
//     .pipe(plumber())
//     .pipe(
//       fileinclude({
//         prefix: '@@',
//       })
//     )
//     .pipe(dest(path.php.build))
//     .pipe(browsersync.stream());
// }

// function getPHPblocks() {
//   return src(path.phpBlocks.source).pipe(plumber()).pipe(dest(path.phpBlocks.build)).pipe(browsersync.stream());
// }

// ========= watch module =========
// #HINT: слежение за HTML файлами
function watchHTMLfiles() {
  gulp.watch(path.style.watch, buildCSS);
  gulp.watch(path.styleVendor.watch, buildCSS);
  gulp.watch(path.scriptVendor.watch, buildJS);
  gulp.watch(path.jsBundle.watchMain, buildJS);
  gulp.watch(path.jsBundle.watchModules, buildJS);
  gulp.watch(path.html.watch, getHTML);
}

// #HINT: слежение за PHP файлами
// function watchPHPfiles() {
//   gulp.watch(path.style.watch, buildCSS);
//   gulp.watch(path.styleVendor.watch, buildCSS);
//   gulp.watch(path.scriptVendor.watch, buildJS);
//   gulp.watch(path.jsBundle.watchMain, buildJS);
//   gulp.watch(path.jsBundle.watchModules, buildJS);
//   gulp.watch(path.php.watch, getPHP);
//   gulp.watch(path.phpBlocks.watch, getPHPblocks);
// }

// ========= build module =========
// let eraseHTMLbuildFiles = gulp.series(eraseCSS, eraseJSbundle, eraseHTML);
// let erasePHPbuildFiles = gulp.series(eraseCSS, eraseJSbundle, erasePHP, erasePHPblocks);

// let getPHPlayout = gulp.series(buildCSS, buildJS, getPHP, getPHPblocks);
// let getPHPlayoutAndWatch = gulp.series(getPHPlayout, watchPHPfiles);

let getHTMLlayout = gulp.series(buildCSS, buildJS, getHTML);
let getHTMLlayoutAndWatch = gulp.series(getHTMLlayout, watchHTMLfiles);

// ========= // #HINT: map файлы не формируются

// #HINT: полная сборка PHP страницы
// let productionPHPbuild = gulp.series(erasePHPbuildFiles, buildCSS, buildJS, getPHP, getPHPblocks);

// #HINT: полная сборка HTML страницы
let productionHTMLbuild = gulp.series(eraseHTMLbuildFiles, buildCSS, buildJS, getHTML);

// ========= erase module =========
// #HINT: не удаляем fonts и img!

function eraseAllBuild() {
  return del(build);
}
// exports.eraseAllBuild = eraseAllBuild;

// function erasePHP() {
//   return del(path.php.build + '*.php');
// }

function erasePHPblocks() {
  return del(path.phpBlocks.build + '**/*.php');
}

function eraseHTML() {
  return del(path.html.build + '*.html');
}

function eraseCSS() {
  return del(path.style.build);
}

function eraseJSbundle() {
  return del(path.jsBundle.build);
}

// ========= HTML сборка  =========
exports.browserHTMLsync = browserHTMLsync;
exports.eraseHTMLbuildFiles = eraseHTMLbuildFiles;
exports.getHTMLlayout = getHTMLlayout;
exports.getHTMLlayoutAndWatch = getHTMLlayoutAndWatch;
// exports.productionHTMLbuild = productionHTMLbuild;

// ========= PHP сборка  =========
// exports.browserPHPsync = browserPHPsync;
// exports.erasePHPbuildFiles = erasePHPbuildFiles;
// exports.getPHPlayout = getPHPlayout;
// exports.getPHPlayoutAndWatch = getPHPlayoutAndWatch;
// exports.productionPHPbuild = productionPHPbuild;
