import { AnimatePresence, m } from 'motion/react'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { skillGroups } from '../data/skills'
import { cn } from '../lib/cn'
import { ease, spring } from '../lib/motion'

const tabs = [{ id: 'all', title: 'All' }, ...skillGroups.map((g) => ({ id: g.id, title: g.short }))]

function SkillChips({ skills }: { skills: (typeof skillGroups)[number]['skills'] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <li
          key={s.name}
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-line-strong"
        >
          {s.name}
          {s.note && <span className="whitespace-nowrap font-mono text-[10.5px] text-fg-subtle">· {s.note}</span>}
        </li>
      ))}
    </ul>
  )
}

export function Skills() {
  const [active, setActive] = useState('all')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const group = skillGroups.find((g) => g.id === active)

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next: number | undefined
    if (e.key in keys) next = (index + keys[e.key] + tabs.length) % tabs.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = tabs.length - 1
    if (next === undefined) return
    e.preventDefault()
    setActive(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="Technical skills"
        title="A backend core, with full-stack reach."
        description="Grouped by how I use them. No percentages or ratings, just where each tool fits in my work."
      />

      <Reveal>
        <div
          role="tablist"
          aria-label="Skill categories"
          className="-mx-4 mb-8 flex gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {tabs.map((t, i) => {
            const selected = active === t.id
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls="skills-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'relative min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 text-sm transition-colors',
                  selected ? 'text-accent-fg' : 'text-fg-muted hover:text-fg',
                )}
              >
                {selected && (
                  <m.span layoutId="skill-tab" className="absolute inset-0 rounded-full bg-accent" transition={spring} aria-hidden="true" />
                )}
                <span className="relative">{t.title}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <div id="skills-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0} className="rounded-2xl outline-offset-4">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
          >
            {group ? (
              <div className="card p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-fg">{group.title}</h3>
                <p className="mt-2 text-fg-muted">{group.blurb}</p>
                <div className="mt-6">
                  <SkillChips skills={group.skills} />
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skillGroups.map((g, i) => (
                  <m.div
                    key={g.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease }}
                    className={cn('card p-5 sm:p-6', (i === 0 || i === skillGroups.length - 1) && 'lg:col-span-2')}
                  >
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                      <h3 className="font-semibold text-fg">{g.title}</h3>
                      <span className="font-mono text-[11px] text-fg-subtle">{String(g.skills.length).padStart(2, '0')}</span>
                    </div>
                    <SkillChips skills={g.skills} />
                  </m.div>
                ))}
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
