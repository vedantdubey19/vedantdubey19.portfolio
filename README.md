# Portfolio

Personal portfolio for Vedant Dubey (AI Engineer). React + Vite + Tailwind CSS.

## Run

```bash
npm install
npm run dev
```

`npm run build` outputs a static site to `dist/`, ready for Vercel, Netlify or GitHub Pages.

## Edit the content

All text, projects, skills, experience and social links live in `src/content.js`.
It is filled in from the résumé and the public GitHub profile.

- **Photo**: `src/assets/me.webp`, the hero background.
- **Résumé**: `public/Vedant-Dubey-Resume.pdf` (path set by `profile.resumeUrl`).
- **Project screenshots**: put images in `src/assets/`, import them at the top of `src/content.js` and set each project's `image`.

## Deploying

Hosted on GitHub Pages: `.github/workflows/deploy.yml` builds and publishes on every push
to `main`. The repo is named `vedantdubey19.github.io` so the site is served from the root.

To use a custom domain (e.g. `vedantdubey.in`): add it under the repo's Settings → Pages →
Custom domain, create the DNS records GitHub lists there at your registrar, tick Enforce
HTTPS, then set `VITE_SITE_URL` in `.env` to the new address and push.

It also deploys on Vercel as is (import the repo, keep the defaults), where `vercel.json`
adds the security headers GitHub Pages cannot send.

- `.env` holds `VITE_SITE_URL`, the public address used for the canonical URL, share image,
  `robots.txt` and `sitemap.xml`. Change it if the site lives at a different address.
- `npm run build` also pre-renders the page to static HTML (`scripts/prerender.mjs`).
- `vercel.json` sets the security headers (Content-Security-Policy, HSTS and others) and cache
  rules. The policy only allows files from the site itself, so adding an external script,
  font or analytics service means adding its domain there. `style-src` allows `'unsafe-inline'`
  because the build inlines the stylesheet; the build prints that stylesheet's sha256 if you
  would rather pin the hash (but then every CSS change needs the hash updating, or the page
  loads unstyled).

## The font

`src/assets/plus-jakarta-sans.woff2` is Plus Jakarta Sans cut down to what the site uses:
the Latin characters plus common punctuation, and the 400-800 weight range. 17 kB instead
of 27 kB, and it is what the largest text paint waits on. To regenerate it after adding
characters outside that set (a non-Latin name, an unusual symbol):

```bash
npm i -D @fontsource-variable/plus-jakarta-sans
python3 -m pip install --user fonttools brotli
SRC=node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2
python3 -m fontTools.varLib.instancer "$SRC" wght=400:800 --output=/tmp/narrow.ttf
python3 -m fontTools.subset /tmp/narrow.ttf --flavor=woff2 --layout-features='*' \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0152-0153,U+2013-2014,U+2018-2019,U+201C-201D,U+2022,U+2026,U+00B7,U+00A9,U+20B9,U+2192" \
  --output-file=src/assets/plus-jakarta-sans.woff2
```

## Note

`package.json` pins `source-map-js` to 1.2.1 through `overrides`, because the 1.2.2
tarball was missing from the npm registry when this was set up. The override can be
removed once a plain `npm install` works without it.
