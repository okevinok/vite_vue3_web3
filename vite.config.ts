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
  define: {
    'process.env': process.env
  },
  plugins: [
    globals(),
    vue(),
    nodePolyfills(),

  //   builtinsPlugin
  //   NodeGlobalsPolyfillPlugin({
  //     process: true,
  //     buffer: true,
  //     define: { 'process.env.NODE_ENV': '"production"' }, // https://github.com/evanw/esbuild/issues/660
  // }),
  ],
  optimizeDeps: { 
    // exclude: ['web3']
    include:['web3']
  },
  build: {
    rollupOptions: {
      plugins: [
        // nodePolyfills()
        ],
    },
  },
}