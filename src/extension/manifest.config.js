import { defineManifest } from '@crxjs/vite-plugin'
import { version } from '../../package.json'

export default defineManifest({
  manifest_version: 3,
  name: 'Pacific Tab',
  version: version,
  chrome_url_overrides: {
    newtab: 'index.html',
  },
})
