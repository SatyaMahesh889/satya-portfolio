import { useEffect, useState } from 'react'

/** Returns the id of the section currently nearest the top of the viewport. */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top)
          else visible.delete(entry.target.id)
        }
        const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0]?.[0] ?? null
        setActive(next)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids, enabled])

  return enabled ? active : null
}
