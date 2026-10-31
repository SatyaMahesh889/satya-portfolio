import { AnimatePresence, m } from 'motion/react'
import { Check, ChevronDown, ShieldCheck } from 'lucide-react'
import { useId, useState } from 'react'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { TechIcon } from '../components/TechIcon'
import { aiCapabilities, aiSection } from '../data/ai'
import { cn } from '../lib/cn'
import { ease } from '../lib/motion'

export function EngineeringMeetsAI() {
  const [open, setOpen] = useState(0)
  const baseId = useId()

  return (
    <Section id="ai-assisted" labelledBy="ai-title" className="overflow-hidden">
      <div
        className="pointer-events-none absolute -left-40 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(228_139_216/0.10),transparent)]"
        aria-hidden="true"
      />
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
            {aiSection.eyebrow}
          </p>
          <h2 id="ai-title" className="text-3xl font-semibold leading-tight text-fg sm:text-4xl md:text-[2.75rem]">
            {aiSection.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">{aiSection.description}</p>

          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Tools I use</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {aiSection.tools.map((t) => (
                <li key={t.name} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg">
                  <TechIcon name={t.icon} className="text-fg-muted" />
                  {t.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">What I build this way</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
              {aiSection.builds.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-fg">
                  <Check size={15} className="shrink-0 text-accent" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-fg-muted">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            {aiSection.ownership}
          </p>
        </Reveal>

        <RevealGroup className="space-y-3" gap={0.07}>
          {aiCapabilities.map((cap, i) => {
            const expanded = open === i
            const panelId = `${baseId}-panel-${i}`
            const buttonId = `${baseId}-button-${i}`
            return (
              <RevealItem
                key={cap.title}
                className={cn(
                  'card overflow-hidden transition-[border-color,box-shadow] duration-300',
                  expanded && 'border-line-strong shadow-[0_24px_60px_-34px_var(--glow)]',
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? -1 : i)}
                    className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                  >
                    <span
                      className={cn(
                        'grid size-9 shrink-0 place-items-center rounded-lg border font-mono text-xs transition-colors',
                        expanded ? 'border-accent/60 bg-accent-soft text-accent' : 'border-line text-fg-subtle',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold tracking-tight text-fg sm:text-lg">{cap.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{cap.summary}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={cn('mt-1 shrink-0 text-fg-subtle transition-transform duration-300', expanded && 'rotate-180 text-fg')}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
                        <div className="bg-bg-elevated/60 p-5 sm:p-6">
                          <p className="font-mono text-[11px] uppercase tracking-wider text-accent">What I own</p>
                          <ul className="mt-3 space-y-2 text-sm text-fg">
                            {cap.owner.map((o) => (
                              <li key={o} className="flex gap-2">
                                <Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                                {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-bg-elevated/30 p-5 sm:p-6">
                          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Where AI tools help</p>
                          <ul className="mt-3 space-y-2 text-sm text-fg-muted">
                            {cap.assist.map((a) => (
                              <li key={a} className="flex gap-2">
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-fg-subtle" aria-hidden="true" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>

      <Reveal className="relative mt-16 overflow-hidden rounded-2xl border border-line p-8 text-center sm:p-12 md:mt-20">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000,transparent)]" aria-hidden="true" />
        <p className="mx-auto max-w-3xl text-xl font-medium leading-snug tracking-tight text-fg sm:text-2xl md:text-3xl">
          {aiSection.highlight.split(' — ')[0]} —{' '}
          <span className="text-gradient">{aiSection.highlight.split(' — ')[1]}</span>
        </p>
      </Reveal>
    </Section>
  )
}
