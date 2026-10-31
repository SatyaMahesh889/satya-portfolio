import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'
const STORAGE_KEY = 'theme'

function read(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

const listeners = new Set<() => void>()
function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export function setTheme(theme: Theme) {
  const root = document.documentElement
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 400)
  }
  root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07080c' : '#f7f7f9')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage unavailable (private mode) — theme still applies for this visit */
  }
  listeners.forEach((l) => l())
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
  const toggle = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme])
  return { theme, toggle }
}
