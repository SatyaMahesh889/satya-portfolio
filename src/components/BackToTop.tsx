import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

export function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 700))

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-line-strong bg-bg-elevated/90 text-fg shadow-card backdrop-blur md:bottom-8 md:right-8"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
            <m.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp size={18} aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  )
}
