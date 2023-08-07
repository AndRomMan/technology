'use strict';

let gulp = require('gulp');
let nano = require('gulp-cssnano');
let gutil = require('gulp-util');
let watch = require('gulp-watch');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let plumber = require('gulp-plumber');
let postcss = require('gulp-postcss');
let concatCss = require('gulp-concat-css');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync');
let webpack = require('webpack-stream');
let eslint = require('gulp-eslint');
let babel = require('gulp-babel');
let download = require('gulp-download');
let reload = browserSync.reload;

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const stylelint = require('gulp-stylelint');
const sassInlineImage = require('./gulp-modules/sass-inline-image');

let processorsStyles = [
  require('postcss-cssnext'),
  require('precss'),
  // stylelint(),
  require('postcss-assets', {cachebuster: true}),
  require('postcss-each'),
  require('postcss-inline-svg'),
  require('postcss-easings'),
  require('postcss-image-sizes'),
  require('postcss-size'),
  // require('css-mqpacker'),
  require('postcss-discard-comments'),
];

let paths = {
  tmp: '.tmp',
  styles_fundraising: 'www/assets/fundraising/css',
  styles_account_v2: 'www/assets/account2/css',
  styles_charityball: 'www/assets/charityball/css/',
  scripts: 'www/media/fundraising/app/',
  scripts_account_app: 'www/media/account/app/**/*.js',
  scripts_account_app_v2: 'www/media/account2/app/**/*.js',
  scripts_charityball_app: 'www/media/charityball/**/*.js',
  scripts_sluchaem_app: 'www/media/fundraising/app/**/*.js',
  img: 'www/assets/fundraising/img/',
  build: 'www/build/',

  scripts_sluchaem_all: [
    'www/jquery.min.js',
    'node_modules/@nuzhnapomosh/components/build/global.js',
    'node_modules/@utils/header/dist/index.js',
    'node_modules/@utils/cookie-notice/dist/index.js',
    'node_modules/@utils/socials/dist/index.js',
    'node_modules/@utils/form-fieldset/dist/index.js',
    'node_modules/@utils/tooltip/dist/index.js',
    'node_modules/@utils/file-loader/dist/index.js',
    'node_modules/@utils/popup/dist/index.js',
    'node_modules/@utils/js-helper/dist/index.js',

    // Main Style For All Project
    'www/assets/takiedela/theme/js/bootstrap.min.js',
    'www/assets/takiedela/theme/js/bootstrap-formhelpers-phone.js',
    'www/assets/takiedela/theme/js/bootstrap-datepicker.js',
    'www/assets/takiedela/theme/js/bootstrap-datepicker.ru.min.js',
    'www/media/libs/notifyjs/dist/notify.js',
    'www/media/libs/underscore/underscore-min.js',
    'www/media/libs/backbone/backbone.min.js',
    'www/assets/takiedela/theme/js/td.js',
    'www/assets/takiedela/theme/js/alert.js',

    // Fundraising Styles
    'www/assets/fundraising/js/slick.js',
    'www/assets/fundraising/js/selectize.js',
    'www/assets/fundraising/js/zoom.js',
    'www/assets/fundraising/js/load-image.all.min.js',

    'node_modules/guillotine/js/jquery.guillotine.min.js',
    'node_modules/jquery.payment/lib/jquery.payment.min.js',
    'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
    'node_modules/social-likes/dist/social-likes.min.js',
    'node_modules/cropperjs/dist/cropper.min.js',

    '.tmp/sluchaem_app.js',
  ],

  scripts_account_all_v2: [
    'www/jquery.min.js',
    'www/assets/takiedela/theme/js/bootstrap.min.js',
    'www/assets/takiedela/theme/js/bootstrap-datepicker.js',
    'www/assets/takiedela/theme/js/bootstrap-datepicker.ru.min.js',
    'www/assets/takiedela/theme/js/jquery.guillotine.js',
    'www/assets/takiedela/theme/js/selectize.js',
    // 'www/assets/takiedela/theme/js/gallery-slider.js',
    'www/assets/takiedela/theme/js/scripts.js',
    'www/assets/takiedela/theme/js/scroll-up-bar.js',
    'www/assets/takiedela/theme/js/svg.js',
    'www/assets/takiedela/theme/js/icon.js',
    'www/assets/takiedela/theme/js/app2.js',
    'www/media/libs/notifyjs/dist/notify.js',
    'www/media/libs/underscore/underscore-min.js',
    'www/media/libs/backbone/backbone.min.js',
    'www/assets/takiedela/theme/js/td.js',
    'www/assets/takiedela/theme/js/alert.js',

    // 'node_modules/moment/min/moment.min.js',
    'node_modules/jquery.payment/lib/jquery.payment.min.js',
    // 'node_modules/jquery-ui-dist/jquery-ui.min.js',
    'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',

    'www/assets/account2/js/jquery-ui.min.js',
    // 'www/assets/account2/js/jquery.payments.js',
    'www/assets/account2/js/combobox.js',
    'www/assets/account2/js/slick.js',
    // 'www/assets/account2/js/custom.js',

    'node_modules/@nuzhnapomosh/components/build/global.js',
    'node_modules/@utils/header/dist/index.js',
    'node_modules/@utils/file-loader/dist/index.js',
    'node_modules/@utils/popup/dist/index.js',
    'node_modules/@utils/js-helper/dist/index.js',
    'node_modules/cropperjs/dist/cropper.min.js',
    'node_modules/@utils/tooltip/dist/index.js',
    // 'node_modules/@utils/form-fieldset/dist/index.js',
    '.tmp/checkout.js',
    '.tmp/account_app_v2.js',
  ],

  scripts_charityball_all: [
    'www/jquery.min.js',
    // 'node_modules/moment/min/moment.min.js',
    // 'node_modules/moment-timezone/builds/moment-timezone-with-data-2012-2022.min.js',
    'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
    'node_modules/countup.js/dist/countUp.min.js',
    'node_modules/@nuzhnapomosh/components/build/global.js',
    '.tmp/charityball_app.js',
  ],
};

/* /// sluchaem main assets */
const stylesPCSS = (path) => {
  return function () {
    return (
      gulp
        .src(`${path}/styles.pcss`)
        .pipe(plumber())
        // .pipe(sourcemaps.init())
        .pipe(postcss(processorsStyles))
        .pipe(nano({convertValues: {length: false}}))
        .pipe(rename('styles-pcss.css'))
        .pipe(gulp.dest(`${paths.build}/temp/`))
    );
  };
};

gulp.task('styles_fundraising_pcss', stylesPCSS(paths.styles_fundraising));
gulp.task('styles_account_pcss', stylesPCSS(paths.styles_account_v2));

const stylesLinter = (path) => {
  return function () {
    return gulp
      .src(`${path}/styles.scss`)
      .pipe(plumber())
      .pipe(
        stylelint({
          reporters: [{formatter: 'string', console: true}],
        })
      );
  };
};

const stylesSCSS = (path) => {
  return function () {
    return gulp
      .src(`${path}/styles.scss`)
      .pipe(plumber())
      .pipe(
        sass({
          style: 'expanded',
          functions: sassInlineImage(),
        })
      )
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename('styles-scss.css'))
      .pipe(gulp.dest(`${paths.build}/temp/`));
  };
};

gulp.task(
  'styles_fundraising_scss',
  gulp.series(stylesLinter(paths.styles_fundraising), stylesSCSS(paths.styles_fundraising))
);
gulp.task(
  'styles_account_scss',
  gulp.series(stylesLinter(paths.styles_account_v2), stylesSCSS(paths.styles_account_v2))
);

gulp.task(
  'styles_fundraising',
  gulp.series('styles_fundraising_pcss', 'styles_fundraising_scss', function () {
    return gulp
      .src(`${paths.build}/temp/*.css`)
      .pipe(concat('styles.css'))
      .pipe(gulp.dest(paths.build))
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(paths.build));
  })
);

gulp.task(
  'styles_account',
  gulp.series('styles_account_pcss', 'styles_account_scss', function () {
    return gulp
      .src(`${paths.build}/temp/*.css`)
      .pipe(concat('account_v2.css'))
      .pipe(gulp.dest(paths.build))
      .pipe(rename('account_v2.min.css'))
      .pipe(gulp.dest(paths.build));
  })
);

gulp.task('script_sluchaem_app', function () {
  return gulp
    .src(paths.scripts_sluchaem_app)
    .pipe(
      eslint({
        globals: [
          'Backbone',
          '_',
          '$',
          'jQuery',
          'moment',
          'cp',
          'VK',
          'gapi',
          'loadImage',
          'Cropper',
          'ApplePaySession',
          'npTooltipJs',
          'NPFileLoaderComponentJs',
          'NPPopupComponentJs',
        ],
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(concat('build.js'))
    .pipe(rename('sluchaem_app.js'))
    .pipe(gulp.dest(paths.tmp));
});
gulp.task(
  'js_sluchaem',
  gulp.series('script_sluchaem_app', function () {
    return gulp
      .src(paths.scripts_sluchaem_all)
      .pipe(concat('build.js'))
      .pipe(rename('sluchaem.js'))
      .pipe(gulp.dest(paths.build))
      .pipe(uglify())
      .pipe(rename('sluchaem.min.js'))
      .pipe(gulp.dest(paths.build));
  })
);

gulp.task('script_account_app_v2', function () {
  return gulp
    .src(paths.scripts_account_app_v2)
    .pipe(
      eslint({
        globals: [
          'Backbone',
          '_',
          '$',
          'moment',
          'cp',
          'Cropper',
          'npTooltipJs',
          'NPPopupComponentJs',
          'NPFileLoaderComponentJs',
          'NPHelperEventDelegate',
        ],
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(concat('build.js'))
    .pipe(rename('account_app_v2.js'))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('cloudpayments_widget', function () {
  return download('https://widget.cloudpayments.ru/bundles/checkout')
    .pipe(rename('checkout.js'))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task(
  'js_account_v2',
  gulp.series('script_account_app_v2', 'cloudpayments_widget', function () {
    return gulp
      .src(paths.scripts_account_all_v2)
      .pipe(concat('build.js'))
      .pipe(rename('account_v2.js'))
      .pipe(gulp.dest(paths.build))
      .pipe(uglify())
      .pipe(rename('account_v2.min.js'))
      .pipe(gulp.dest(paths.build));
  })
);

/* /// automatic fix for linter:
       be aware of `$ ()` autoreplacement in mixin calling, can be fixed by future linter for postcss syntax
*/

gulp.task('stylefmt', function () {
  let stylefmt = require('stylefmt');

  gulp
    .src(paths.styles_fundraising + '/**/*')
    .pipe(postcss([stylefmt]))
    .pipe(gulp.dest(paths.styles_fundraising + ''));
});

/* /// sluchaem images */

gulp.task('images', function () {
  let imagemin = require('gulp-imagemin');

  return gulp
    .src(paths.img + '**/*.{png,jpg,gif,svg}')
    .pipe(imagemin(imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()))
    .pipe(gulp.dest(paths.img));
});

/* /// watchers:
    sluchaem: gulp watch;
    account: gulp watch_account;
*/

gulp.task('watch_sluchaem', function () {
  gulp.watch(paths.styles_fundraising + '/**/*', ['styles_fundraising']);
  gulp.watch(paths.scripts_sluchaem_app, ['js_sluchaem']);
});

gulp.task('watch_account', function () {
  gulp.watch(paths.styles_account + '**/*', ['styles_account']);
  gulp.watch(paths.scripts_account_app, ['js_account']);
});

/* /// autoupdate assets by local server */

gulp.task('server', function () {
  browserSync({
    proxy: 'sluchaem.local',
    host: 'sluchaem.local',
    port: 80,
    open: 'external',
  });
});

/* /// build:
    all: gulp build;
    sluchaem: gulp build_sluchaem;
    account: gulp build_account;
*/

gulp.task('build_account', gulp.series('styles_account', 'js_account_v2'));
gulp.task('build_sluchaem', gulp.series('styles_fundraising', 'js_sluchaem'));
gulp.task('build', gulp.series('build_account', 'build_sluchaem'));

// Ошибки
let onError = function (error) {
  gutil.log([(error.name + ' in ' + error.plugin).bold.red, '', error.message, ''].join('\n'));
  gutil.beep();
  this.emit('end');
};

// gulp.task('script_charityball_app', function () {
//   return gulp.src(paths.scripts_charityball_app)
//     .pipe(eslint({
//       globals: [
//         '$',
//         'moment',
//         'CountUp',
//       ]
//     }))
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError())
//     .pipe(babel({
//       presets: ['env']
//     }))
//     // .pipe(sourcemaps.init())
//     .pipe(concat('build.js'))
//     .pipe(rename('charityball_app.js'))
//     // .pipe(sourcemaps.write())
//     .pipe(gulp.dest(paths.tmp));
// });
// gulp.task('js_charityball', ['script_charityball_app'], function () {
//   return gulp.src(paths.scripts_charityball_all)
//     .pipe(concat('build.js'))
//     .pipe(rename('charityball.js'))
//     .pipe(gulp.dest(paths.build))
//     .pipe(uglify())
//     .pipe(rename('charityball.min.js'))
//     .pipe(gulp.dest(paths.build));
// });
// gulp.task('styles_charityball', function () {
//   return gulp.src(paths.styles_charityball + 'styles.pcss')
//     .pipe(plumber())
//     .pipe(postcss(processorsStyles))
//     .pipe(nano({
//       zindex: false,
//       convertValues: {
//         length: false,
//       },
//     }))
//     .pipe(rename('charityball.min.css'))
//     .pipe(gulp.dest(paths.build))
// });

// gulp.task('watch_charityball', function () {
//     gulp.watch(paths.styles_charityball + '**/*', ['styles_charityball']);
//     gulp.watch(paths.scripts_charityball_app, ['js_charityball']);
// });
