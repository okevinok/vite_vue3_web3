import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'rollup-plugin-polyfill-node';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import globals from 'rollup-plugin-node-globals';
// import commonjs from '@rollup/plugin-commonjs'

// import builtins from 'rollup-plugin-node-builtins';
// const builtinsPlugin = builtins({ buffer: true });
// builtinsPlugin.name = 'builtins';

export default {
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  plugins: [
    vue(),
  ]
}