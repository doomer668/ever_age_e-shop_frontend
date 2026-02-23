import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '/api')
      }
    }
  },
  plugins: [
      react(),
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
      })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
