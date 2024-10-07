import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

console.log(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, './postcss.config.js'), // Ensure PostCSS config is referenced
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared-components'), // Adjust this path
      '@public-client': path.resolve(__dirname, '../public-client/src'), // Alias to src folder
    },
  },
});
