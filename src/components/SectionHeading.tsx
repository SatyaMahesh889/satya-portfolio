import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

interface Props {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  id?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, id, align = 'left', className }: Props) {
  return (
    <Reveal className={cn('mb-12 max-w-2xl md:mb-16', align === 'center' && 'mx-auto text-center', className)}>
      <p className={cn('eyebrow mb-4 flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span className={cn('h-px w-8 bg-accent/60', align === 'center' && 'hidden')} aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold leading-tight text-fg sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">{description}</p>}
    </Reveal>
  )
}
