// npx rollup --config
// npx rollup -c

// import {rollup} from 'rollup';
// import eslint from '@rollup/plugin-eslint';
// import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: './catalog/view/javascript/error-logging/sentry-index.js',
  output: {
    file: './catalog/view/javascript/error-logging/sentry.js',
    format: 'es',
    // format: 'iife',
    // sourcemap: true,
    // plugins: [terser()],
  },
  plugins: [nodeResolve(), commonjs()],
};
