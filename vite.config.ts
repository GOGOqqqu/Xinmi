import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';   //自动引入组件库
import { fileURLToPath, URL } from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/one': {
        target: 'https://apis.netstart.cn',
        changeOrigin: true,  //允许跨域
        rewrite: path => path.replace(/^\/one/, '')
      },
      '/global': {
        target: 'https://idaily-cdn.appcloudcdn.com',
        changeOrigin: true,  //允许跨域
        rewrite: path => path.replace(/^\/global/, '')
      },
      '/nest': {
        target: 'http://localhost:3000',
        changeOrigin: true,  //允许跨域
        rewrite: path => path.replace(/^\/nest/, '')
      }
    }
  }

})
