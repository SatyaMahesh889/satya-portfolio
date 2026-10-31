import { AnimatePresence, m, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, sectionIds } from '../data/navigation'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { cn } from '../lib/cn'
import { spring } from '../lib/motion'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(sectionIds, isHome)
  // The menu remembers the path it was opened on; navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null)
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, close on Escape, keep focus inside, restore focus on close.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const button = menuButton.current
    panel.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenOn(null)
      if (e.key === 'Tab' && panel.current) {
        const focusable = [button, ...panel.current.querySelectorAll<HTMLElement>('a,button')].filter(Boolean) as HTMLElement[]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      button?.focus({ preventScroll: true })
    }
  }, [open])

  const href = (id: string) => ({ pathname: '/', hash: `#${id}` })

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-fg px-4 py-2 text-bg focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="grid size-9 place-items-center rounded-xl border border-line-strong bg-surface-strong font-mono text-xs font-semibold tracking-tight text-fg transition-colors group-hover:border-accent group-hover:text-accent">
            {profile.initials}
          </span>
          <span className="hidden text-sm font-medium text-fg sm:block">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-surface-strong ring-1 ring-line-strong"
                      transition={spring}
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    to={href(item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors',
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to={href('contact')}
            className="hidden min-h-11 items-center rounded-full bg-fg px-4 text-[13px] font-medium text-bg transition-colors hover:bg-accent-strong hover:text-accent-fg md:inline-flex"
          >
            Get in touch
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <m.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {open && (
          <m.div
            ref={panel}
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-6">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      to={href(item.id)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight',
                        active === item.id ? 'text-fg' : 'text-fg-muted',
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
