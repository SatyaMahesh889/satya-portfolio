import { cn } from '../lib/cn'

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] leading-none text-fg-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
