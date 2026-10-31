import { CircleAlert, CircleCheck, Loader2, Send } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { buttonClasses } from '../lib/button'

type Status = { state: 'idle' | 'sending' } | { state: 'sent' } | { state: 'error'; message: string }

const field =
  'mt-2 block w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30'

/**
 * Enquiry form. Only rendered when a real delivery endpoint is configured.
 * Success is shown only after the endpoint responds with a 2xx status.
 */
export function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const id = useId()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (data._gotcha) return // honeypot filled: silently ignore bots
    setStatus({ state: 'sending' })
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      })
      if (!res.ok) throw new Error(`The message could not be delivered (HTTP ${res.status}).`)
      form.reset()
      setStatus({ state: 'sent' })
    } catch (err) {
      setStatus({
        state: 'error',
        message: err instanceof Error && err.message.startsWith('The message') ? err.message : 'The message could not be delivered. Please check your connection.',
      })
    }
  }

  const sending = status.state === 'sending'

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" aria-describedby={`${id}-status`} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-fg">
            Name
          </label>
          <input id={`${id}-name`} name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-fg">
            Email
          </label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-medium text-fg">
          Message
        </label>
        <textarea id={`${id}-message`} name="message" required rows={5} minLength={10} className={`${field} resize-y`} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} className={buttonClasses('primary', 'disabled:cursor-wait disabled:opacity-70')}>
          {sending ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <div id={`${id}-status`} role="status" aria-live="polite" className="text-sm">
          {status.state === 'sent' && (
            <p className="flex items-center gap-2 text-emerald-500">
              <CircleCheck size={16} aria-hidden="true" /> Message delivered. Thank you, I’ll reply soon.
            </p>
          )}
          {status.state === 'error' && (
            <p className="flex items-center gap-2 text-red-500">
              <CircleAlert size={16} aria-hidden="true" /> {status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
