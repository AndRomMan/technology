let gulp = require('gulp'); // Gulp JS
let mergeStream = require('merge-stream');
let uglify = require('gulp-uglify-es').default; // Минификация JS
let concat = require('gulp-concat'); // Склейка файлов
let rename = require('gulp-rename'); // Переименовать файл
let less = require('gulp-less');
let cleanCSS = require('gulp-clean-css');
let nano = require('gulp-cssnano');
let watch = require('gulp-watch');
let penthouse = require('penthouse');
let fs = require('fs');

const paths = {
  utils: './node_modules/@utils',
  stylesTD: './wp-content/themes/td-edu/assets/css',
  scriptsTD: './wp-content/themes/td-edu/assets/js',
};

gulp.task('build_js', function (done) {
  // js
  gulp
    .src([
      paths.scriptsTD + '/education/education.js',
      paths.scriptsTD + '/education/course/exercise-filter.js',
      paths.scriptsTD + '/education/course/course-filter.js',
      paths.scriptsTD + '/education/course/course-add-favorites.js',
      paths.scriptsTD + '/education/course/course-comment-modal.js',
      paths.scriptsTD + '/education/course/collapse-text.js',
      paths.scriptsTD + '/education/course/person-list.js',
      paths.scriptsTD + '/education/course/order-course.js',
      paths.scriptsTD + '/education/consultation/expert.js',
      paths.scriptsTD + '/education/consultation/review.js',
      paths.scriptsTD + '/education/main/scroll-to-element.js',
      paths.scriptsTD + '/education/main/partners-slider.js',
      paths.scriptsTD + '/education/main/gallery-slider.js',
      paths.scriptsTD + '/education/main/features-slider.js',
      paths.scriptsTD + '/education/main/reviews-slider.js',
      paths.scriptsTD + '/education/teachers/teachers-filter.js',
      paths.scriptsTD + '/education/my-studies/my-studies-favorites.js',
      paths.scriptsTD + '/education/my-studies/my-studies-nav-functions.js',
      paths.scriptsTD + '/education/my-studies/my-studies-nav-init.js',
      paths.scriptsTD + '/education/my-studies/my-studies-buttons-init.js',
      paths.scriptsTD + '/education/my-studies/my-studies-scroll-prevention.js',
      paths.scriptsTD + '/education/my-studies/my-studies-modal.js',
      paths.scriptsTD + '/education/my-studies/my-studies-progress-bar.js',
      paths.scriptsTD + '/education/my-studies/my-studies-main.js',

      paths.utils + '/header/dist/index.js',
      paths.utils + '/cookie-notice/dist/index.js',
      paths.utils + '/tooltip/dist/index.js',
    ])
    .pipe(concat('education.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([
      paths.scriptsTD + '/education/our-courses/navigation/navigation.js',
      paths.scriptsTD + '/education/our-courses/pagination/pagination-component.js',
      paths.scriptsTD + '/education/our-courses/pagination/pagination.js',
      paths.scriptsTD + '/education/our-courses/server-request/ajax-request.js',
      paths.scriptsTD + '/education/our-courses/server-request/request-error.js',
      paths.scriptsTD + '/education/our-courses/catalog/catalog-rendering.js',

      paths.scriptsTD + '/education/our-courses/forms/user-form.js',
      paths.scriptsTD + '/education/our-courses/forms/user-form-init.js',
      paths.scriptsTD + '/education/our-courses/forms/user-form-submit.js',
      paths.scriptsTD + '/education/our-courses/forms/user-form-personal.js',
      paths.scriptsTD + '/education/our-courses/forms/user-form-submit.js',
      paths.scriptsTD + '/education/our-courses/forms/libs/jquery.mask.min.js',
    ])
    .pipe(concat('education-our-courses.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([
      paths.scriptsTD + '/footer/subscribe-form/subscribe-request-error.js',
      paths.scriptsTD + '/footer/subscribe-form/subscribe-form.js',
      paths.scriptsTD + '/footer/subscribe-form/subscribe-form-init.js',
      paths.scriptsTD + '/footer/subscribe-form/subscribe-form-personal.js',
      paths.scriptsTD + '/footer/subscribe-form/subscribe-form-submit.js',
      paths.scriptsTD + '/footer/subscribe-form/libs/jquery.mask.min.js',
    ])
    .pipe(concat('footer.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([paths.scriptsTD + '/education/education-essay.js'])
    .pipe(concat('education-essay.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([paths.scriptsTD + '/education/purchase-course.js'])
    .pipe(concat('purchase-course.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([paths.scriptsTD + '/education/webinar-registration.js'])
    .pipe(concat('webinar-registration.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([paths.scriptsTD + '/education/training-discuss.js'])
    .pipe(concat('training-discuss.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([paths.scriptsTD + '/education/order-consultation.js'])
    .pipe(concat('order-consultation.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  gulp
    .src([paths.scriptsTD + '/education/homework-check-rules.js'])
    .pipe(concat('homework-check-rules.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  // components for WP_DEBUG
  gulp
    .src([
      paths.utils + '/header/dist/index.js',
      paths.utils + '/cookie-notice/dist/index.js',
      paths.utils + '/tooltip/dist/index.js',
    ])
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./wp-content/themes/td-edu/assets/js/components'));

  gulp
    .src([
      paths.scriptsTD + '/main/jquery.scrolldepth.min.js',
      paths.scriptsTD + '/main/jquery.radio.js',
      paths.scriptsTD + '/main/jquery.checkbox.js',
      paths.scriptsTD + '/main/jquery.cookie.js',
      paths.scriptsTD + '/main/raphael-min.js',
      paths.scriptsTD + '/main/svg.js',
      paths.scriptsTD + '/main/truncate-label.js',
      paths.scriptsTD + '/main/slick.js',
      paths.scriptsTD + '/main/check-cookie.js',
      paths.scriptsTD + '/main/jquery.core-ui-select.js',
      paths.scriptsTD + '/main/jquery.scrollpane.js',
      paths.scriptsTD + '/main/jquery.mousewheel.js',
      paths.scriptsTD + '/main/jquery.arcticmodal-0.3.min.js',
      paths.scriptsTD + '/main/social-likes-add.js',
      paths.scriptsTD + '/main/social-likes.min.js',
      paths.scriptsTD + '/main/subscribe_class.js',
      paths.scriptsTD + '/main/news_main_class.js',
      paths.scriptsTD + '/main/one-fund.js',
      paths.scriptsTD + '/main/jquery.sticky-sidebar.js',
      paths.scriptsTD + '/main/donate_class.js',
      paths.scriptsTD + '/main/donate_ready.js',
      paths.scriptsTD + '/main/ready.js',
      paths.scriptsTD + '/main/ready_desktop.js',
      paths.scriptsTD + '/main/ready_mobile.js',
      paths.scriptsTD + '/main/ajax-load-content_class.js',
      paths.scriptsTD + '/main/bgsrcset.js',
      paths.scriptsTD + '/main/zoom.min.js',
      paths.scriptsTD + '/main/help_utils.js',
      paths.scriptsTD + '/main/accordion-np.js',
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scriptsTD + '/min'));

  done();
});

// css tasks
gulp.task('styles_edu', function (done) {
  return mergeStream(
    gulp
      .src(paths.stylesTD + '/education/education.less')
      .pipe(less())
      .pipe(
        cleanCSS({
          compatibility: 'ie8',
          level: {
            1: {specialComments: 0},
            2: {mergeMedia: true},
          },
        })
      ),
    gulp.src([
      paths.utils + '/css-variables/dist/styles.css',
      paths.utils + '/header/dist/styles.css',
      paths.utils + '/cookie-notice/dist/styles.css',
      paths.utils + '/tooltip/dist/styles.css',
      paths.utils + '/typography/dist/styles.css',
    ])
  )
    .pipe(concat('education.css'))
    .pipe(gulp.dest(paths.stylesTD + '/education'));
});

gulp.task('styles_td', function () {
  return (
    gulp
      .src(paths.stylesTD + '/main.less')
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
      .pipe(gulp.dest(paths.stylesTD))
  );
});

// criticalCss
gulp.task('criticalCss', function (done) {
  penthouse({
    url: 'http://edu.npmsh.local/education/', // путь к главной на локалке
    css: paths.stylesTD + '/education/education.css',
    propertiesToRemove: ['@font-face', 'src'],
  }).then((criticalCss) => {
    fs.writeFileSync(paths.stylesTD + '/critical/styles.css', criticalCss);
  });

  done();
});

gulp.task('watch_styles', function () {
  gulp.watch(paths.stylesTD + '/education/**/*.less', gulp.parallel('styles_edu'));
});

gulp.task('watch', function () {
  gulp.watch(paths.stylesTD + '/education/**/*.less', gulp.parallel('styles_td', 'styles_edu'));
  gulp.watch(paths.stylesTD + '/blocks/**/*.less', gulp.parallel('styles_td', 'styles_edu'));

  gulp.watch(paths.scriptsTD + '/education/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scriptsTD + '/main/**/*.js', gulp.series('build_js'));
  gulp.watch(paths.scriptsTD + '/footer/**/*.js', gulp.series('build_js'));
});

gulp.task('build', gulp.series('styles_edu', 'styles_td', 'build_js'));
gulp.task('build-c', gulp.series('styles_edu', 'styles_td', 'build_js', 'criticalCss',));
