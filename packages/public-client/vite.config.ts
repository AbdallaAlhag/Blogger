import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 5173, // Use any port that is open
  },
  build: {
    outDir: 'dist', // Ensure the build goes to dist folder
    emptyOutDir: true,
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
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared-components'), // Adjust this path
    },
  },
});
