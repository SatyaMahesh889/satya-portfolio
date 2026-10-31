import { Info } from 'lucide-react'
import { cn } from '../lib/cn'

export function Disclaimer({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-start gap-2 rounded-lg border border-warn-line bg-warn-bg px-3 py-2 text-xs font-medium leading-snug text-warn-fg',
        className,
      )}
    >
      <Info size={14} className="mt-px shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
