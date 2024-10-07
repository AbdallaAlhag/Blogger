import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
        },
    },
});
