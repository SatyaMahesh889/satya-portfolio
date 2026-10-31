import { cn } from './cn'

export type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group/btn relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-200 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100'

const variants: Record<Variant, string> = {
  primary:
    'bg-fg text-bg hover:bg-accent-strong hover:text-accent-fg shadow-[0_8px_30px_-12px_var(--glow)] hover:shadow-[0_10px_40px_-10px_var(--glow)]',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-accent hover:bg-accent-soft',
  ghost: 'text-fg-muted hover:text-fg',
}

export const buttonClasses = (variant: Variant = 'primary', className?: string) => cn(base, variants[variant], className)
