import { useEffect } from 'react'
import { applyPageMeta, type PageMeta } from '../lib/seo'

export function usePageMeta(meta: PageMeta) {
  const { title, description, path, image } = meta
  useEffect(() => {
    applyPageMeta({ title, description, path, image })
  }, [title, description, path, image])
}
