import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://46.224.54.95:8080',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '/api')
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
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
