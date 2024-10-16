import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { host: "127.0.0.1", port: 5173 },
  preview: {
    host: '0.0.0.0', // or '127.0.0.1'
    port: 5173, // Use any port that is open
    strictPort: true, // Add this to ensure it uses exactly this port
  },
  build: {
    outDir: 'dist', // Ensure the build goes to dist folder
    emptyOutDir: true,
    sourcemap: true, // Optional: Generate source maps for debugging
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.tsx'), // Your entry file
      external: ['lucide-react', '@tinymce/tinymce-react'], // Add all external modules here
    },
  },
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

