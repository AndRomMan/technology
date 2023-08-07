==================== Creating Tasks ====================
const { series } = require('gulp');
function transpile(cb) {
  // body omitted
  cb();
}

function bundle(cb) {
  // body omitted
  cb();
}
exports.build = series(transpile, bundle);

====================
const { parallel } = require('gulp');
function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}
exports.build = parallel(javascript, css);


const { series, parallel } = require('gulp');

====================
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

exports.build = series(clean, parallel(css, javascript));

==================== Signal task completion ====================
 - Если из вашей задачи ничего не возвращается, вы должны использовать callback. Callback будет передан вашей задаче в качестве единственного аргумента - с именем cb () в приведенных ниже примерах.
 
function callbackTask(cb) {
  // `cb()` should be called by some async work
  cb();
}
exports.default = callbackTask;

Чтобы указать gulp, что произошла ошибка в задаче с использованием callback, вызовите ее с ошибкой в качестве единственного аргумента.

function callbackError(cb) {
  // `cb()` should be called by some async work
  cb(new Error('kaboom'));
}
exports.default = callbackError;

==================== Working with Files ====================
Методы src() и dest ()
предоставляются gulp для взаимодействия с файлами на вашем компьютере.

Поток, создаваемый src (), должен быть возвращен из задачи для сигнала асинхронного завершения.

const { src, dest } = require('gulp');

exports.default = function() {
  return src('src/*.js')
    .pipe(dest('output/'));
}

Основным API потока является метод .pipe () для объединения потоков.
Чаще всего плагины размещаются между src () и dest () с помощью метода .pipe () и преобразуют файлы в потоке.

Возможные комбинации с точкой входа src ( директория, где файлы берутся в поток преобразования) и точкой выхода dest - директории для помещения результата.
Эта особенность может быть полезна для создания разных видов преобразованных файлов. Например, минифицированный и неминифицированный.

const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('src/*.js')
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(dest('output/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}
==================== Glob ====================
Для выбора/фильтрации файлов используется система Globe

==================== Using Plugins ====================
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('src/*.js')
    // The gulp-uglify plugin won't update the filename
    .pipe(uglify())
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}

const del = require('delete');

exports.default = function(cb) {
  // Use the `delete` module directly, instead of using gulp-rimraf
  del(['output/*.js'], cb);
}

==================== Watching Files ====================
const { watch, series } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.default = function() {
  // You can use a single task
  watch('src/*.css', css);
  // Or a composed task
  watch('src/*.js', series(clean, javascript));
};

==================== Watched events ====================
По умолчанию наблюдатель выполняет задачи при каждом создании, изменении или удалении файла.
Если вам нужно использовать различные события, вы можете использовать опцию события при вызове функции watch().
'add', 
'addDir',
'change',
'unlink',
'unlinkDir',
'ready',
'error'.
'all' - это все события кроме 'ready' and 'error'. 

const { watch } = require('gulp');

exports.default = function() {
  // All events will be watched
  watch('src/*.js', { events: 'all' }, function(cb) {
    // body omitted
    cb();
  });
};
==================== Initial execution ====================
При вызове функции watch () задачи не будут выполняться, а будут ждать первого изменения файла.

Чтобы выполнить задачи до первого изменения файла, установите для параметра ignoreInitial значение false.
.
const { watch } = require('gulp');

exports.default = function() {
  // The task will be executed upon startup
  watch('src/*.js', { ignoreInitial: false }, function(cb) {
    // body omitted
    cb();
  });
};

==================== Queueing ====================
Когда изменение файла происходит во время выполнения задачи watcher, другое выполнение будет поставлено в очередь для запуска после завершения задачи.
Чтобы отключить очередь, установите для параметра очереди значение false.

const { watch } = require('gulp');

exports.default = function() {
  // The task will be run (concurrently - одновременно) for every change made
  watch('src/*.js', { queue: false }, function(cb) {
    // body omitted
    cb();
  });
};

==================== Delay ====================
После изменения файла задача watcher не будет запущена, пока не истечет задержка в 200 мс.
Это сделано для того, чтобы избежать слишком раннего запуска задачи, когда многие файлы изменяются одновременно - например, поиск и замена.

Чтобы настроить длительность задержки, установите для параметра задержки положительное целое число.

const { watch } = require('gulp');

exports.default = function() {
  // The task won't be run until 500ms have elapsed since the first change
  watch('src/*.js', { delay: 500 }, function(cb) {
    // body omitted
    cb();
  });
};

==================== API ====================
Документация Gulp на русском
https://webdesign-master.ru/blog/docs/gulp-documentation.html#quick-start

====================  ====================



====================  ====================

====================  ====================

====================  ====================

====================  ====================

====================  ====================

====================  ====================


====================  ====================

====================  ====================

====================  ====================

====================  ====================

====================  ====================

====================  ====================


====================  ====================

====================  ====================

====================  ====================

====================  ====================

====================  ====================

====================  ====================















