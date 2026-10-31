import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface Props {
  id: string
  labelledBy: string
  children: ReactNode
  className?: string
}

export function Section({ id, labelledBy, children, className }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative scroll-mt-20 py-24 md:py-32', className)}>
      <div className="container-page">{children}</div>
    </section>
  )
}
