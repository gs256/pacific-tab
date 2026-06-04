import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    outDir: 'dist/web',
  },
  base: process.env.DEPLOY ? '/pacific-tab/' : '/',
  define: {
    __IS_EXTENSION__: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
