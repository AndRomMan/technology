'use strict';

const gulp = require('gulp');
const {series, parallel, watch, src, dest} = require('gulp');
const plumber = require('gulp-plumber'); // предотвратвращает сбой при сборке, вызванное ошибками из плагинов Gulp

const uglify = require('gulp-uglify-es').default; // Минификация JS
const concat = require('gulp-concat'); // Склейка файлов
const rename = require('gulp-rename'); // Переименовать файл
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const nano = require('gulp-cssnano');
// let watch = require('gulp-watch');

const paths = {
  utils: './node_modules/@utils',
  styles: './catalog/view/theme/default/stylesheet',
  scripts: './catalog/view/javascript',
};

// css tasks
gulp.task('styles', function (done) {
  gulp
    .src(paths.styles + '/shop/shop.less')
    .pipe(less())
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
        level: {
          1: {specialComments: 0},
          2: {mergeMedia: true},
        },
      })
    )
    // .pipe(nano({convertValues: {length: false}}))
    .pipe(gulp.dest(paths.styles + '/shop'));

  gulp
    .src(paths.styles + '/publishing-landing/publishing-landing.less')
    .pipe(less())
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
        level: {
          1: {specialComments: 0},
          2: {mergeMedia: true},
        },
      })
    )
    // .pipe(nano({convertValues: {length: false}}))
    .pipe(gulp.dest(paths.styles + '/publishing-landing'));

  done();
});


// styles: './catalog/view/theme/default/stylesheet',
// scripts: './catalog/view/javascript',
// подключение js модулей
gulp.task('watch', function () {
  gulp.watch(paths.styles + '/shop/shop.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/**/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/common/modal/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/product-merch/*/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/search/*/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/business/**/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/layouts/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/form/**/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/form/cdek_layout/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/publishing-landing/**/*.less', gulp.series('styles'));
  gulp.watch(paths.scripts + '/publishing/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/business/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/common/header_new/open-navigation.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/common/header_new/major-navigation-banners.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/common/form_new/help_us/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/checkout/cart/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/basket/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/contacts/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/libs/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/main/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/footer/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/product-merch/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/order/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/shipping/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/new-main/ready.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/search/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/server-request/request-error.js', gulp.series('build_js'));
});

gulp.task('checkjs', function (done) {
  gulp
    // .src(paths.scripts + '/order/cdek/cdek-widget-init.js')
    // .src(paths.scripts + '/order/cdek/cdek-shipping-methods.js')
    // .src(paths.scripts + '/order/order.js')
    // .src(paths.scripts + '/order/cdek/cdek-city-suggest.js')
    // .src(paths.scripts + '/order/cdek/cdek-city.js')
    // .src(paths.scripts + '/order/cdek/cdek-generate-server-data.js')
    // .src(paths.scripts + '/order/cdek/cdek-form-storage.js')
    // .src(paths.scripts + '/order/cdek/cdek-price-rendering.js')
    // .src(paths.scripts + '/order/cdek/cdek-server-request.js')
    // .src(paths.scripts + '/order/cdek/cdek-save-form.js')
    // .src(paths.scripts + '/order/---------------------------------')
    // .src(paths.scripts + '/order/order-city-error.js')
    // .src(paths.scripts + '/order/order-delivery-type-error.js')
    // .src(paths.scripts + '/order/order.js')
    .pipe(concat('check.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/gulp-check-js'));

  done();
});

// ========== javascript rollup bundling module ==========
const rollup = require('rollup');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('rollup-plugin-terser');
const eslint = require('@rollup/plugin-eslint');
// plugins: [nodeResolve.nodeResolve(), terser.terser(), eslint()],

gulp.task('bundleSentry', function (done) {
  rollupBundleSentry();
  done();
});

function rollupBundleSentry() {
  return rollup
    .rollup({
      input: paths.scripts + '/error-logging/sentry-index.js',
      plugins: [nodeResolve.nodeResolve(), commonjs()],
    })
    .then((bundle) => {
      return bundle.write({
        file: paths.scripts + '/error-logging/' + 'sentry.js',
        format: 'es',
        // sourcemap: true,
      });
    });
}

// ========== ==========

// js tasks
gulp.task('build_js', function (done) {
  gulp
    .src(paths.scripts + '/basket/**/*.js')
    .pipe(concat('basket.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  gulp
    .src(paths.scripts + '/order/**/*.js')
    .pipe(concat('order.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  gulp
    .src(paths.scripts + '/contacts/**/*.js')
    .pipe(concat('contacts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  // catalog/view/javascript/server-request/request-error.js
  gulp
    .src([
      // paths.scripts + '/search/search-get-result.js',
      paths.utils + '/tooltip/dist/index.js',
      paths.utils + '/cookie-notice/dist/index.js',
      paths.utils + '/donate-form/dist/index.js',
      paths.scripts + '/error-logging/sentry.js',
      paths.scripts + '/main/ready.js',
      paths.scripts + '/footer/**/*.js',
      paths.scripts + '/search/common-functions.js',
      paths.scripts + '/search/nav-menu-expand.js',
      paths.scripts + '/search/search-suggest-rendering.js',
      paths.scripts + '/search/search-header-form.js',
      paths.scripts + '/search/search-header-suggest.js',
      paths.scripts + '/search/search-header.js',
      paths.scripts + '/search/search-main-form.js',
      paths.scripts + '/search/search-main-suggest.js',
      paths.scripts + '/search/search-server-request.js',
      paths.scripts + '/checkout/cart/gift-package.js',
      paths.scripts + '/checkout/cart/save-user-info.js',
      paths.scripts + '/product-merch/*.js',
      paths.scripts + '/business/business.js',
      paths.scripts + '/business/business-form-validating.js',
      paths.scripts + '/business/business-scroll.js',
      paths.scripts + '/business/business-server-request.js',
      paths.scripts + '/common/header_new/open-navigation.js',
      paths.scripts + '/common/header_new/major-navigation-banners.js',
      paths.scripts + '/common/form_new/help_us/*.js',
      paths.scripts + '/main/inputLabel.js',
      paths.scripts + '/main/productSlider.js',
      paths.scripts + '/main/selectDesktop.js',
      paths.scripts + '/main/selectCard.js',
      paths.scripts + '/main/tabs.js',
      paths.scripts + '/product/selectPrint.js',
      paths.scripts + '/server-request/request-error.js',
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  // for publishing
  gulp
    .src([
      paths.scripts + '/main/inputLabel.js',
      paths.scripts + '/publishing/orderForm.js',
      paths.scripts + '/publishing/ready.js',
    ])
    .pipe(concat('publishing.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/publishing'));

  gulp
    .src([
      paths.utils + '/cookie-notice/dist/index.js',
      paths.scripts + '/new-main/ready.js',
      paths.scripts + '/publishing/subscribe-form/**/*.js',
    ])
    .pipe(concat('ready.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/new-main'));

  gulp
    .src(paths.scripts + '/analytics/*.js')
    .pipe(concat('analytics.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  done();
});

// После обновления Sentry пересобрать sentry.js командой: gulp bundleSentry
// Вариант сборки: npm run build
gulp.task('build', gulp.series('styles', 'build_js'));
