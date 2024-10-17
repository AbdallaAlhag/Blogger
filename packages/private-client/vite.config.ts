import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

console.log(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    },
    copyPublicDir: true,
  },
  publicDir: 'public',  // Make sure this is set
  css: {
    postcss: path.resolve(__dirname, './postcss.config.js'), // Ensure PostCSS config is referenced
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'shared-components'), // Adjust this path
      '@public-client': path.resolve(__dirname, 'public-client/src'), // Alias to src folder
    },
  },
});
