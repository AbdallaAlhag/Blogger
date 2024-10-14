import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

console.log(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173, // Use any port that is open
  },
  build: {
    outDir: 'dist', // Ensure the build goes to dist folder
    sourcemap: true, // Optional: Generate source maps for debugging
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'), // Your entry file
    },
  },
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
