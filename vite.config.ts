import vue from '@vitejs/plugin-vue'

export default {
  define: {
    'process.env': process.env
  },
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
  ],
  optimizeDeps: { 
    include:['web3']
  },
  build: {
    rollupOptions: {
      plugins: [
        ],
    },
  },
}