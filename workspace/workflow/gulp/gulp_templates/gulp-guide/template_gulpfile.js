/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// подключаем Gulp
const gulp = require('gulp');
const {series, parallel, watch, src, dest} = require('gulp');

// плагин для переименования файлов
const rename = require('gulp-rename');

// плагин для удаления файлов
const del = require('del');

// плагины для объединения файлов
const concat = require('gulp-concat');
const useref = require('useref');

// кэширование файлов
const cache = require('gulp-cache');

// замена строк
const replace = require('gulp-replace');

// манипуляция с тегами
const cheerio = require('gulp-cheerio');

const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');

// ========= css producing module =========
// подключаем Sass пакет
const sass = require('gulp-sass');
// sass.compiler = require('node-sass');
// сжатие и оптимизации CSS
const csso = require('gulp-csso');
// PostCSS
const postcss = require('gulp-postcss');
// const postcss = require('postcss');
// подключаем плагины PostCss
const autoprefixer = require('autoprefixer');
// const doiuse = require('doiuse')
// const cssnano = require('cssnano'); // CSSO лучше

// ========= html producing module =========
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlmin = require('gulp-htmlmin');
const fileInclude = require('gulp-file-include');

// ========= javascript producing module =========
// gulp-uglify работает со стандартом ES5 (не понимает let и const и др.)
// const uglify = require('gulp-uglify');

// Terser is a modern gulp plugin, compressed es6+ code
let jsTerser = require('gulp-terser');

// ========= browser autoreload =========
const browserSync = require('browser-sync').create();

// ========= css producing module =========
/* функция компилирует css из scss файлов, применяет плагины PostCSS,
  оптимизирует, сжимает, переименовывает и создает map-файл.  */

// function getWorkingCss(cb) {
function workCss() {
  return src('src/scss/style.scss', {sourcemaps: true})
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(dest('build/css'));
}
// exports.workCss = workCss;

function buildCss() {
  return src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(dest('build/css'));
}
// exports.buildCss = buildCss;

function eraseBuildCss() {
  return del('build/css/**');
}
// exports.eraseBuildCss = eraseBuildCss;
// exports.getWorkCss = series(eraseBuildCss, workCss);
// exports.getBuildCss = series(eraseBuildCss, buildCss);

// ========= html producing module =========
// функция модулей html к основному html файл
function includeHtmlModules() {
  return src('src/*.html').pipe(plumber()).pipe(fileInclude()).pipe(dest('build'));
}
// exports.includeHtmlModules = includeHtmlModules;

function compressBuildHtml() {
  return (
    src('build/*.html')
      // return src('src/**/*.html')
      .pipe(plumber())
      .pipe(htmlmin({collapseWhitespace: true}, {collapseInlineTagWhitespace: true}, {removeComments: true}))
      .pipe(dest('build'))
  );
}

// ========= javascript producing module =========
function workJs() {
  return (
    src(['src/js/*.js', '!src/js/*min.js'])
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(
        jsTerser({
          // ecma: 5, // specify one of: 5, 2015, 2016, etc.
          // warnings: true,
          warnings: 'verbose',
          // mangle: false,
        })
      )
      .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
      .pipe(sourcemap.write('.'))
      // .pipe(plumber.stop())
      .pipe(dest('build/js'))
  );
}
// exports.workJs = workJs;

function buildJs() {
  return src(['src/js/**/*.js', '!src/js/**/*min.js'])
    .pipe(plumber())
    .pipe(jsTerser())
    .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
    .pipe(dest('build/js'));
}
// exports.buildJs = buildJs;

// ========== server module ==========
function refresh(done) {
  browserSync.reload();
  done();
}

function startServer() {
  browserSync.init({
    server: 'build/',
    port: 3000,
    notify: false,
    open: true,
    cors: true,
    ui: false,
    // browser: ['firefox', 'chrome'],
  });

  gulp.watch('src/scss/**/*.{sass,scss}', gulp.series(workCss, refresh));
  gulp.watch('src/js/**/*.js', gulp.series(workJs, refresh));
  gulp.watch(
    'src/img/sprite/*.svg',
    gulp.series(
      compressSvgForSprite,
      getSvgSpriteToBuild,
      includeSvgSpriteInHtml,
      copyHtmlToBuild,
      compressBuildHtml,
      refresh
    )
  );
  gulp.watch('src/*.html', gulp.series(includeSvgSpriteInHtml, copyHtmlToBuild, compressBuildHtml, refresh));
}

exports.startServer = startServer;

// ========= build module =========
/*
build сборка тестировочная:
 удаляются лишние файлы map и т.д.,
 проверяется работа сжатия контентных изменяемых изображений

workingBuild сборка отладочная:
 включает map-файлы,
 запускает сервер для отладки
 */
