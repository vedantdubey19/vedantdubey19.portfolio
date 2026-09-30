import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Bundle dependencies into the one-off server build used by scripts/prerender.mjs
  ssr: { noExternal: true },
  // Never inline assets as data: URIs, so the Content-Security-Policy can stay strict
  build: { assetsInlineLimit: 0 },
})
