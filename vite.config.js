import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

const isProd = process.env.VERCEL_ENV === 'production';

// Vite configuration
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    build: {
        sourcemap: !isProd,  // You can adjust this to `false` if you want to disable sourcemaps for production
        minify: isProd ? 'esbuild' : false,  // Use 'esbuild' for production minification
        outDir: 'dist',   // Specify where the built files should go
        chunkSizeWarningLimit: 1000,  // Increase chunk size warning limit
    },
    esbuild: {
        drop: ['console', 'debugger'],  // Remove console and debugger statements in production
        treeShaking: true,  // Enable tree shaking to remove unused code
    },
    server: {
        open: true,  // Open browser automatically
    },
});
