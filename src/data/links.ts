/**
 * External links and contact configuration.
 *
 * Verified links are hard-coded. Optional details (email, WhatsApp, resume,
 * form endpoint, site URL) come from environment variables so nothing is
 * displayed until it has actually been supplied. See .env.example.
 */
const env = import.meta.env

function clean(value: string | undefined): string | undefined {
  const v = value?.trim()
  return v ? v : undefined
}

export const links = {
  github: 'https://github.com/SatyaMahesh889',
  githubUser: 'SatyaMahesh889',
  linkedin: 'https://www.linkedin.com/in/satya-mahesh-indugula93921/',
  ismool: 'https://ismool-website.ismool.workers.dev/',
} as const

const whatsapp = clean(env.VITE_WHATSAPP_NUMBER)?.replace(/[^\d]/g, '')

export const contactConfig = {
  /** Public email supplied by the owner; VITE_CONTACT_EMAIL can override it. */
  email: clean(env.VITE_CONTACT_EMAIL) ?? 'maheshindugula@gmail.com',
  /** Digits only, international format without "+", e.g. 919999999999. */
  whatsapp: whatsapp || undefined,
  /** Path under /public (e.g. /resume/satya-mahesh-indugula.pdf) or an absolute URL. */
  resumeUrl: clean(env.VITE_RESUME_URL),
  /**
   * A POST endpoint that accepts JSON and returns 2xx on delivery
   * (e.g. Formspree, Web3Forms, or your own Cloudflare Worker).
   * When unset, the enquiry form is not rendered.
   */
  formEndpoint: clean(env.VITE_FORM_ENDPOINT),
  /** Public site origin, e.g. https://satyamahesh.dev. Enables canonical URLs. */
  siteUrl: clean(env.VITE_SITE_URL)?.replace(/\/$/, ''),
}
