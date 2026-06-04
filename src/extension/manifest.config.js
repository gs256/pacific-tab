import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Pacific Tab',
  version: '1.0.0',
  options_page: 'index.html',
  action: {
    // default_popup: 'index.html',
  },
})
