import { LazyMotion, MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BackToTop } from './BackToTop'
import { Footer } from './Footer'
import { Header } from './Header'

const loadFeatures = () => import('../lib/motion-features').then((mod) => mod.default)

/** Scrolls to the hash target after navigation, or to the top on a new page. */
function useScrollOnNavigate() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a frame so the target section is rendered when arriving from another route.
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (!el) return
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        el.focus({ preventScroll: true })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash, key])
}

export function Layout() {
  useScrollOnNavigate()
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </LazyMotion>
    </MotionConfig>
  )
}
