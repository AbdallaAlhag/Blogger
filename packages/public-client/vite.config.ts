import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173 
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    strictPort: false, // Changed to false for Railway
  },
  

    // rollupOptions: {
    //   input: path.resolve(__dirname, 'src/main.tsx'), // Your entry file
    //   // external: ['lucide-react', '@tinymce/tinymce-react'], // Add all external modules here
    // },
  css: {
    postcss: path.resolve(__dirname, './postcss.config.js'), // Ensure PostCSS config is referenced
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared-components'), // Adjust this path
    },
  },
});

