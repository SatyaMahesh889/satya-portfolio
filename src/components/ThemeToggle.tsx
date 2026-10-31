import { AnimatePresence, m } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="relative grid size-11 place-items-center overflow-hidden rounded-full border border-line bg-surface text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {theme === 'dark' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  )
}
