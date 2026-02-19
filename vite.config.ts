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