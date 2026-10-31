import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'

type State = 'idle' | 'copied' | 'failed'

/** Copies text to the clipboard and announces the result to screen readers. */
export function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const [state, setState] = useState<State>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const t = window.setTimeout(() => setState('idle'), 2200)
    return () => window.clearTimeout(t)
  }, [state])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-fg transition-colors hover:border-accent hover:bg-accent-soft active:scale-[0.97]',
        className,
      )}
    >
      {state === 'copied' ? <Check size={16} className="text-emerald-500" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span aria-live="polite">{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy'}</span>
    </button>
  )
}
