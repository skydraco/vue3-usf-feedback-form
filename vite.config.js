const path = require('path');
const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
const svg = require('vite-svg-loader');

const { viteStaticCopy } = require('vite-plugin-static-copy');

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'FeedbackForm',
      fileName: (format) => `vue3-usf-feedback-form.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          return `css/[name][extname]`;
        },
      },
    },
    commonjsOptions: {
      esmExternals: true 
    },
  },
  plugins: [
    vue(), 
    svg(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'src/locales'),
          dest: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ],
});