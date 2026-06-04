import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Pacific Tab',
  version: '1.0.0',
  chrome_url_overrides: {
    newtab: 'index.html',
  },
})
