import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Serve everything under the site URL's path, e.g. /vedantdubey19.portfolio/ on
  // GitHub Pages, or / on a custom domain. Set VITE_SITE_URL in .env.
  const siteUrl = loadEnv(mode, process.cwd()).VITE_SITE_URL || ''
  const path = siteUrl ? new URL(siteUrl).pathname.replace(/\/?$/, '/') : '/'

  return {
    base: mode === 'production' ? path : '/',
    plugins: [react(), tailwindcss()],
    // Bundle dependencies into the one-off server build used by scripts/prerender.mjs
    ssr: { noExternal: true },
    // Never inline assets as data: URIs, so the Content-Security-Policy can stay strict
    build: { assetsInlineLimit: 0 },
  }
})
