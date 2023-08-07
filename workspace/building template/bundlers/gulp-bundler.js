// gulp.js
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Внимание!
// 1 сжатие html отключено
// 2 нет плагина babel
// 3 изменен путь с сборке build = 'public/payment-upgrade';

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

// ==================
const csso = require('gulp-csso'); // сжатие и оптимизации CSS
const postcss = require('gulp-postcss'); // PostCSS

// подключаем плагины PostCss
// const autoprefixer = require('autoprefixer');
const gAutoprefixer = require('gulp-autoprefixer');

// ========= html producing module =========
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-html-minifier-terser');

// ========= paths to files  =========
const currentProject = 'payment-upgrade/';
const source = 'source/';
const build = 'public/' + currentProject;

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
    source: source + 'css/vendor/*.css',
    build: build + 'css/',
  },
  scriptVendor: {
    source: source + 'js/vendor/*.js',
    build: build + 'js/',
  },
  script: {
    source: source + 'js/**/*.js',
    watch: source + 'js/**/*.js',
    build: build + 'js/',
  },
  jsBundle: {
    source: source + 'js/',
    build: build + 'js/',
    watchIndex: source + 'js/index.js',
    watchModules: source + 'js/modules/**/*.js',
  },
};

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

function browserPHPsync() {
  browsersync.init({
    server: {
      baseDir: path.php.build,
      // directory: true,
      index: 'index.php',
      // https: true
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
      input: path.jsBundle.source + 'index.js',
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
    .pipe(
      terser({
        ecma: 2015,
        // ecma: 5, // specify one of: 5, 2015, 2016, etc.
      })
    )
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemap.write('.'))
    .pipe(dest(path.jsBundle.build))
    .pipe(browsersync.stream());
}

function getMinJS() {
  return src(path.jsBundle.source + 'bundle.js')
    .pipe(plumber())
    .pipe(
      terser({
        ecma: 2015,
        // ecma: 5, // specify one of: 5, 2015, 2016, etc.
      })
    )
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(path.jsBundle.build))
    .pipe(browsersync.stream());
}

// ========= css producing module =========
function getMinCSSandMap() {
  return (
    src(path.style.source)
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      // будем использовать gulp-autoprefixer,
      // поскольку возникли проблемы с совместимостью
      // после полного обновления post-css
      .pipe(gAutoprefixer())
      // .pipe(dest(path.style.build))
      .pipe(csso())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemap.write('.'))
      .pipe(dest(path.style.build))
      .pipe(browsersync.stream())
  );
}

function getMinCSS() {
  return (
    src(path.style.source)
      .pipe(plumber())
      .pipe(sass())
      // применяем gulp-autoprefixer,
      // поскольку возникли проблемы с совместимостью
      // после полного обновления post-css
      .pipe(gAutoprefixer())
      .pipe(csso())
      .pipe(rename({suffix: '.min'}))
      .pipe(dest(path.style.build))
      .pipe(browsersync.stream())
  );
}

function getHTML() {
  return (
    src(path.html.source)
      .pipe(plumber())
      .pipe(
        fileinclude({
          prefix: '@@',
        })
      )
      // .pipe(
      //   htmlmin({
      //     collapseWhitespace: true,
      //     collapseInlineTagWhitespace: true,
      //     removeComments: true,
      //   })
      // )
      .pipe(dest(path.html.build))
      .pipe(browsersync.stream())
  );
}

// ========= PHP module =========
function getPHP() {
  return src(path.php.source)
    .pipe(plumber())
    .pipe(
      fileinclude({
        prefix: '@@',
      })
    )
    .pipe(dest(path.php.build))
    .pipe(browsersync.stream());
}

function getPHPblocks() {
  return src(path.phpBlocks.source).pipe(plumber()).pipe(dest(path.phpBlocks.build)).pipe(browsersync.stream());
}

// ========= watch module =========
function watchFiles() {
  gulp.watch(path.style.watch, buildCSS);
  gulp.watch(path.jsBundle.watchIndex, buildJS);
  gulp.watch(path.jsBundle.watchModules, buildJS);
  gulp.watch(path.php.watch, buildPHP);
  gulp.watch(path.phpBlocks.watch, buildPHPblocks);
}

function watchHTMLfiles() {
  gulp.watch(path.style.watch, buildCSS);
  gulp.watch(path.jsBundle.watchIndex, buildJS);
  gulp.watch(path.jsBundle.watchModules, buildJS);
  gulp.watch(path.html.watch, getHTML);
}

// exports.watchFiles = watchFiles;

// ========= build module =========
let eraseBuildFiles = gulp.series(eraseCSS, eraseJSbundle, erasePHP, erasePHPblocks);

exports.eraseBuildFiles = eraseBuildFiles;

// ========= =========
let buildCSS = gulp.series(eraseCSS, getMinCSSandMap);
let buildJS = gulp.series(getJSbundle, getMinJSandMap);
let getCompressedJS = gulp.series(getJSbundle, getMinJS);
let buildPHP = gulp.series(getPHP);
let buildPHPblocks = gulp.series(getPHPblocks);

exports.buildCSS = buildCSS;
exports.buildJS = buildJS;
exports.buildPHP = buildPHP;
exports.buildPHPblocks = buildPHPblocks;

// ========= =========
let startServer = gulp.parallel(watchFiles, browserSync);
// let startPHPserver = gulp.parallel(watchFiles, browserPHPsync);

//  HINT: сборка и запуск PHP страницы
let getPHPlayout = gulp.series(buildCSS, buildJS, buildPHP, buildPHPblocks);
let getPHPlayoutAndWatch = gulp.series(getPHPlayout, watchFiles);

exports.getPHPlayout = getPHPlayout;
exports.getPHPlayoutAndWatch = getPHPlayoutAndWatch;

// let rebuildPHPlayoutAndWatch = gulp.series(eraseBuildFiles, getPHPlayout, watchFiles);
// exports.rebuildPHPlayoutAndWatch = rebuildPHPlayoutAndWatch;
// let getPHPandStart = gulp.series(getPHPlayout, startPHPserver);
// exports.getPHPandStart = getPHPandStart;

//  HINT: сборка и запуск PHP страницы: map файлы не формируются
let productionBuild = gulp.series(eraseBuildFiles, getPHP, getPHPblocks, getMinCSS, getCompressedJS);

exports.productionBuild = productionBuild;

// ========= =========
//  #TIP: сборка и запуск HTML страницы

// let buildHTML = gulp.series(getHTML);
// exports.buildHTML = buildHTML;

// ========= erase module =========
// #TIP: не удаляем fonts, img!

function eraseAllBuild() {
  return del(build);
}

function erasePHP() {
  return del(path.php.build + '*.php');
}

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
