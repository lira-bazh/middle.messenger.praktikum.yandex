import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    handlebars(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    roollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
