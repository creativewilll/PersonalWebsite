import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Copy _headers to dist after build
const copyHeadersPlugin = () => {
  return {
    name: 'copy-headers-plugin',
    closeBundle: async () => {
      try {
        const headersSrc = resolve(process.cwd(), '_headers');
        const headersDst = resolve(process.cwd(), 'dist', '_headers');
        
        if (fs.existsSync(headersSrc)) {
          fs.copyFileSync(headersSrc, headersDst);
          console.log('Successfully copied _headers to dist/');
        } else {
          console.warn('_headers file not found, skipping copy operation');
        }
      } catch (err) {
        console.error('Error copying _headers file:', err);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copyHeadersPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging production issues
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    strictPort: true,
    cors: true, // Enable CORS in development
  },
  preview: {
    port: 4173,
    strictPort: true,
    cors: true,
  },
});
