import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/extension/manifest.config'
import defaultConfig from './vite.config'

export default defineConfig({
  ...defaultConfig,
  plugins: [...(defaultConfig.plugins ?? []), crx({ manifest })],
  build: {
    outDir: 'dist/ext',
  },
  define: {
    __IS_EXTENSION__: true,
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
})
