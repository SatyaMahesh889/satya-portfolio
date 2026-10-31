/**
 * Runs after `vite build`:
 *  - writes a static HTML entry per case-study route with route-specific
 *    <title>, description, Open Graph and Twitter tags (for crawlers and link previews)
 *  - writes 404.html so unknown URLs return a real 404 on Cloudflare Pages
 *  - writes robots.txt, and sitemap.xml + canonical URLs when VITE_SITE_URL is set
 *  - preloads the Latin web-font files to avoid layout shift
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { projects } from '../src/data/projects.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const env = loadEnv('production', root, 'VITE_')
const siteUrl = (process.env.VITE_SITE_URL ?? env.VITE_SITE_URL ?? '').trim().replace(/\/$/, '')
const NAME = 'Satya Mahesh Indugula'

// Preload the Latin subsets of the two variable fonts so text doesn't reflow (layout shift) when they swap in.
const fontPreloads = readdirSync(join(dist, 'assets'))
  .filter((f) => /^(inter|jetbrains-mono)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `    <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n')

const template = readFileSync(join(dist, 'index.html'), 'utf8').replace('</head>', `${fontPreloads}\n  </head>`)

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setTag(html: string, attr: 'name' | 'property', key: string, value: string) {
  const re = new RegExp(`<meta ${attr}="${key}"[^>]*>`)
  return html.replace(re, `<meta ${attr}="${key}" content="${escape(value)}" />`)
}

interface Page {
  path: string
  title?: string
  description?: string
  image?: string
  noindex?: boolean
}

function render(page: Page) {
  let html = template
  const abs = (p: string) => (siteUrl ? `${siteUrl}${p}` : p)
  if (page.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(page.title)}</title>`)
    html = setTag(html, 'property', 'og:title', page.title)
    html = setTag(html, 'name', 'twitter:title', page.title)
  }
  if (page.description) {
    html = setTag(html, 'name', 'description', page.description)
    html = setTag(html, 'property', 'og:description', page.description)
    html = setTag(html, 'name', 'twitter:description', page.description)
  }
  const image = abs(page.image ?? '/og-image.png')
  html = setTag(html, 'property', 'og:image', image)
  html = setTag(html, 'name', 'twitter:image', image)
  if (page.image) {
    // Project screenshots are 1440×900, not the default 1200×630 card.
    html = setTag(html, 'property', 'og:image:width', '1440')
    html = setTag(html, 'property', 'og:image:height', '900')
  }

  if (siteUrl && !page.noindex) {
    html = setTag(html, 'property', 'og:url', abs(page.path))
    html = html.replace('</head>', `    <link rel="canonical" href="${abs(page.path)}" />\n  </head>`)
    html = html.replace('"@type": "Person",', `"@type": "Person",\n        "url": "${siteUrl}/",`)
  } else {
    html = html.replace(/\s*<meta property="og:url"[^>]*>/, '')
  }
  if (page.noindex) html = html.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>')
  return html
}

function write(file: string, contents: string) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

write(join(dist, 'index.html'), render({ path: '/' }))

for (const p of projects) {
  write(
    join(dist, 'projects', `${p.slug}.html`),
    render({
      path: `/projects/${p.slug}`,
      title: `${p.title}: Case Study | ${NAME}`,
      description: p.summary,
      image: p.cover?.src,
    }),
  )
}

write(join(dist, '404.html'), render({ path: '/404', title: `Page not found | ${NAME}`, noindex: true }))

const robots = ['User-agent: *', 'Allow: /']
if (siteUrl) {
  const urls = ['/', ...projects.map((p) => `/projects/${p.slug}`)]
  const today = new Date().toISOString().slice(0, 10)
  write(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${siteUrl}${u}</loc><lastmod>${today}</lastmod></url>`)
      .join('\n')}\n</urlset>\n`,
  )
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
}
write(join(dist, 'robots.txt'), robots.join('\n') + '\n')

console.log(
  `postbuild: ${projects.length} case-study pages, 404.html, robots.txt` +
    (siteUrl ? `, sitemap.xml (${siteUrl})` : ' (no VITE_SITE_URL: sitemap and canonical URLs skipped)'),
)
