let gulp = require('gulp'); // Gulp JS
let uglify = require('gulp-uglify-es').default; // Минификация JS
let concat = require('gulp-concat'); // Склейка файлов
let rename = require('gulp-rename'); // Переименовать файл
let less = require('gulp-less');
let cleanCSS = require('gulp-clean-css');
let nano = require('gulp-cssnano');
let watch = require('gulp-watch');

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
// BM: подключение js модулей
gulp.task('watch', function () {
  gulp.watch(paths.styles + '/shop/shop.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/*/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/product-merch/*/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/blocks/search/*/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/layouts/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/shop/form/*', gulp.series('styles'));
  gulp.watch(paths.styles + '/publishing-landing/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/publishing-landing/*/*.less', gulp.series('styles'));
  gulp.watch(paths.styles + '/publishing-landing/*/*/*.less', gulp.series('styles'));
  gulp.watch(paths.scripts + '/basket/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/contacts/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/libs/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/main/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/product-merch/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/order/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/shipping/*', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/new-main/ready.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/*', gulp.series('build_js'));

  gulp.watch(paths.scripts + '/search/*.js', gulp.series('build_js'));
  gulp.watch(paths.scripts + '/basket/*', gulp.series('build_js'));
});

// js tasks
gulp.task('build_js', function (done) {
  gulp
    .src(paths.scripts + '/basket/*.js')
    .pipe(concat('basket.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  gulp
    .src(paths.scripts + '/order/*.js')
    .pipe(concat('order.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  gulp
    .src(paths.scripts + '/contacts/*.js')
    .pipe(concat('contacts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/min'));

  gulp
    .src([
      paths.utils + '/tooltip/dist/index.js',
      paths.utils + '/cookie-notice/dist/index.js',
      paths.scripts + '/main/ready.js',
      paths.scripts + '/search/common-functions.js',
      paths.scripts + '/search/nav-menu-expand.js',
      paths.scripts + '/search/search-suggest-rendering.js',
      paths.scripts + '/search/search-header-form.js',
      paths.scripts + '/search/search-header-suggest.js',
      paths.scripts + '/search/search-header.js',
      paths.scripts + '/search/search-main-form.js',
      paths.scripts + '/search/search-main-suggest.js',
      // paths.scripts + '/search/search-get-result.js',
      paths.scripts + '/search/search-server-request.js',
      paths.scripts + '/product-merch/*.js',
      paths.scripts + '/main/inputLabel.js',
      paths.scripts + '/main/productSlider.js',
      paths.scripts + '/main/selectDesktop.js',
      paths.scripts + '/main/selectCard.js',
      paths.scripts + '/main/tabs.js',
      paths.scripts + '/product/selectPrint.js',
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
    .src([paths.utils + '/cookie-notice/dist/index.js', paths.scripts + '/new-main/ready.js'])
    .pipe(concat('ready.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts + '/new-main'));

  done();
});
