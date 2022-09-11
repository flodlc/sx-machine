import * as path from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  // inject: ["react-shim.js"],
  target: 'es2015',
  platform: 'browser',
  format: ['esm'],
  splitting: false,
  shims: true,
  jsxFactory: 'jsx',
  minify: false,
  sourcemap: true,
  esbuildPlugins: [],
  esbuildOptions(options) {
    options.inject = [path.join(__dirname, 'react-shim.js')];
  },
});
