import { defineConfig } from 'vite';
import VitePluginAngular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [VitePluginAngular()],
  server: {
    proxy: {
      '/api': {
        target: 'https://reqres.in',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
