
// ========== javascript rollup bundling module ==========
const rollup = require("rollup");
const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("rollup-plugin-terser");
const eslint = require("@rollup/plugin-eslint");
// plugins: [nodeResolve.nodeResolve(), terser.terser(), eslint()],

gulp.task("bundleSentry", function(done) {
  rollupBundleSentry();
  done();
});

function rollupBundleSentry() {
  return rollup
    .rollup({
      input: paths.scripts + "/error-logging/sentry-index.js",
      plugins: [nodeResolve.nodeResolve(), commonjs()],
    })
    .then((bundle) => {
      return bundle.write({
        file: paths.scripts + "/error-logging/" + "sentry.js",
        format: "es",
        // sourcemap: true,
      });
    });
}
