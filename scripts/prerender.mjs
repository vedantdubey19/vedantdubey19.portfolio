// Runs after `vite build`: renders the page to static HTML so crawlers and first paint
// get real content, and writes robots.txt / sitemap.xml for the configured site URL.
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadEnv } from 'vite'

const { render } = await import('../dist-ssr/entry-server.js')
const siteUrl = (loadEnv('production', process.cwd()).VITE_SITE_URL || '').replace(/\/$/, '')
// The path everything is served under, matching `base` in vite.config.js
const base = siteUrl ? new URL(siteUrl).pathname.replace(/\/?$/, '/') : '/'

let html = readFileSync('dist/index.html', 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('prerender: placeholder not found in dist/index.html')
html = html.replace('<!--app-html-->', render())

// Preload the one font file the page needs so text does not reflow after load.
const font = readdirSync('dist/assets').find((file) => /^plus-jakarta-sans-.*\.woff2$/.test(file))
if (font) {
  html = html.replace('</head>', `  <link rel="preload" as="font" type="font/woff2" href="${base}assets/${font}" crossorigin />\n  </head>`)
}

// Preload the hero photo the viewport will actually use, at default priority: the largest
// paint is a line of text, so the font must not queue behind the photo. The filenames are hashed at build
// time, so read them back out of the rendered markup rather than hard-coding them.
const mobilePhoto = html.match(/<source[^>]*srcset="([^"]+)"/i)?.[1]
const desktopPhoto = html.match(/<img[^>]*src="([^"]*\/assets\/me-[^"]+)"/i)?.[1]
if (mobilePhoto && desktopPhoto) {
  html = html.replace(
    '</head>',
    `  <link rel="preload" as="image" href="${desktopPhoto}" type="image/webp" media="(min-width: 768px)" />\n` +
      `  <link rel="preload" as="image" href="${mobilePhoto}" type="image/webp" media="(max-width: 767px)" />\n  </head>`,
  )
} else {
  console.warn('prerender: could not find the hero photo in the markup, skipping its preload')
}

// Inline the stylesheet. It is ~7 kB, and fetching it as a separate file costs a whole
// network round trip before the browser can paint anything (~150 ms on a slow connection).
const styleLink = html.match(/<link rel="stylesheet"[^>]*href="[^"]*(\/assets\/[^"]+\.css)"[^>]*>/)
if (styleLink) {
  const cssPath = join('dist', styleLink[1])
  const css = readFileSync(cssPath, 'utf8')
  html = html.replace(styleLink[0], `<style>${css}</style>`)
  rmSync(cssPath)
  // If you ever want style-src locked down without 'unsafe-inline', put this hash in vercel.json.
  const hash = createHash('sha256').update(css).digest('base64')
  console.log(`inlined ${styleLink[1]} (${(css.length / 1024).toFixed(1)} kB) — sha256-${hash}`)
} else {
  console.warn('prerender: no stylesheet link found, leaving the markup alone')
}

// The page is pre-rendered, so the bundle is only needed for hydration (menu, lightbox,
// scroll animations) — never for first paint. Left at default priority it competes with the
// font and hero photo for bandwidth and delays the largest text paint.
const script = html.match(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/)
if (script && !script[0].includes('fetchpriority')) {
  html = html.replace(script[0], script[0].replace('<script type="module"', '<script type="module" fetchpriority="low"'))
} else if (!script) {
  console.warn('prerender: module script not found, leaving its priority alone')
}

// GitHub Pages cannot send response headers, so the security policy travels in the page.
// Only in the build: the dev server needs inline scripts for hot reload. frame-ancestors
// cannot be set from a <meta> tag; vercel.json still sends it (and the rest) as headers.
const csp =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
html = html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`)

writeFileSync('dist/index.html', html)

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
  writeFileSync(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>\n`,
  )
} else {
  console.warn('prerender: VITE_SITE_URL is not set, skipping robots.txt and sitemap.xml')
}

rmSync('dist-ssr', { recursive: true, force: true })
console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB)`)
