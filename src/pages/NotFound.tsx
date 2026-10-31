import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { usePageMeta } from '../hooks/usePageMeta'
import { profile } from '../data/profile'

export default function NotFound() {
  usePageMeta({ title: `Page not found | ${profile.name}`, description: 'The page you were looking for does not exist.', path: '/404' })
  return (
    <section className="container-page grid min-h-[70vh] place-items-center pt-24 text-center">
      <div>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-fg-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <ButtonLink to="/" className="mt-8">
          <ArrowLeft size={16} aria-hidden="true" /> Back home
        </ButtonLink>
      </div>
    </section>
  )
}
