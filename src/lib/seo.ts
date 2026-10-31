import { contactConfig } from '../data/links'
import { profile } from '../data/profile'

export interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
}

function setMeta(selector: string, attr: 'content' | 'href', value: string | undefined) {
  const el = document.head.querySelector(selector)
  if (!el) return
  if (value === undefined) el.removeAttribute(attr)
  else el.setAttribute(attr, value)
}

export function absoluteUrl(path: string) {
  return contactConfig.siteUrl ? `${contactConfig.siteUrl}${path}` : undefined
}

/** Updates the static meta tags shipped in index.html for client-side navigation. */
export function applyPageMeta({ title, description, path, image = '/og-image.png' }: PageMeta) {
  document.title = title
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  const imageUrl = absoluteUrl(image) ?? image
  setMeta('meta[property="og:image"]', 'content', imageUrl)
  setMeta('meta[name="twitter:image"]', 'content', imageUrl)

  const url = absoluteUrl(path)
  setMeta('meta[property="og:url"]', 'content', url)
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (url) {
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  } else {
    canonical?.remove()
  }
}

export const defaultMeta: PageMeta = {
  title: profile.seo.title,
  description: profile.seo.description,
  path: '/',
}
