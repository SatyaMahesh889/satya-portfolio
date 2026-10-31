/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_WHATSAPP_NUMBER?: string
  readonly VITE_RESUME_URL?: string
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
