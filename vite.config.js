import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE_URL } from './site.config.mjs'

// Подставляет адрес сайта в index.html, чтобы не дублировать его в разметке.
const siteUrlPlugin = () => ({
  name: 'site-url',
  transformIndexHtml(html) {
    return html.replaceAll('__SITE_URL__', SITE_URL)
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
})
