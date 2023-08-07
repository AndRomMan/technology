// ========== browser autoreload ==========
function browserSync() {
  browsersync.init({
    server: {
      baseDir: build,
      directory: true,

    },
  });
}
