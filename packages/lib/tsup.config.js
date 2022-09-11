"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var tsup_1 = require("tsup");
exports.default = (0, tsup_1.defineConfig)({
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
    esbuildOptions: function (options) {
        options.inject = [path.join(__dirname, 'react-shim.js')];
    },
});
