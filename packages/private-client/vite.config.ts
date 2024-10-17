import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

console.log(__dirname);
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
  build: {
    outDir: 'dist', // Ensure the build goes to dist folder
    sourcemap: true, // Optional: Generate source maps for debugging
    emptyOutDir: true,
    assetsDir: 'assets',
    // rollupOptions: {
    //   input: path.resolve(__dirname, 'src/main.tsx'), // Your entry file
    //   external: ['lucide-react',
    //     '@tinymce/tinymce-react',
    //     'react-content-loader',
    //     'html-react-parser',
    //     'axios',
    //     'date-fns',
    //     'js-cookie',
    //     'json',
    //     'jwt-decode',
    //     'prop-types',
    //     'react',
    //     'react-dom',
    //     'react-dropzone',
    //     'react-router',
    //     'react-router-dom'], // Add all external modules here
    // },
  },
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
