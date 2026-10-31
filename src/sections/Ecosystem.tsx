import { AnimatePresence, m } from 'motion/react'
import {
  Code2,
  Database,
  FlaskConical,
  Info,
  LayoutTemplate,
  MessagesSquare,
  PenTool,
  Rocket,
  Search,
  Server,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { RevealGroup, RevealItem, Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { TechIcon } from '../components/TechIcon'
import { ecosystem, ecosystemCategories, engineeringApproach, type CategoryIcon, type EcosystemCategory } from '../data/ecosystem'
import { profile } from '../data/profile'
import { cn } from '../lib/cn'
import { ease, inView } from '../lib/motion'

const categoryIcons: Record<CategoryIcon, LucideIcon> = {
  server: Server,
  layout: LayoutTemplate,
  messages: MessagesSquare,
  database: Database,
  sparkle: Sparkles,
}

const stepIcons: LucideIcon[] = [Search, PenTool, Code2, FlaskConical, Rocket]

// Desktop placement around the central card: left column, centre-bottom, right column.
const placement: Record<string, string> = {
  backend: 'lg:col-start-1 lg:row-start-1',
  frontend: 'lg:col-start-3 lg:row-start-1',
  messaging: 'lg:col-start-1 lg:row-start-2',
  cloud: 'lg:col-start-3 lg:row-start-2',
  ai: 'lg:col-start-2 lg:row-start-2',
}

// Purely decorative spokes from the central card to each category (percent coordinates).
// They express "areas of my experience", not any data flow between technologies.
const spokes = [
  [16.7, 25],
  [16.7, 75],
  [50, 75],
  [83.3, 25],
  [83.3, 75],
]

function CategoryCard({
  category,
  index,
  active,
  dimmed,
  pinned,
  onHover,
  onToggle,
}: {
  category: EcosystemCategory
  index: number
  active: boolean
  dimmed: boolean
  pinned: boolean
  onHover: (id: string | null) => void
  onToggle: (id: string) => void
}) {
  const Icon = categoryIcons[category.icon]
  return (
    <RevealItem className={cn('relative z-10', placement[category.id])}>
      <div
        onMouseEnter={() => onHover(category.id)}
        onMouseLeave={() => onHover(null)}
        className="animate-float h-full rounded-[1.25rem] bg-bg"
        style={{ animationDelay: `${index * -1.3}s`, ['--tone' as string]: `var(--cat-${category.tone})` }}
      >
        <div
          className={cn(
            'group card h-full p-5 transition-[transform,border-color,opacity,box-shadow] duration-300 sm:p-6',
            active && '-translate-y-1 border-[var(--tone)] shadow-[0_24px_60px_-30px_var(--tone)]',
            dimmed && 'opacity-55',
          )}
        >
          <span
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--tone)] to-transparent opacity-70"
            aria-hidden="true"
          />
          <h3>
            <button
              type="button"
              aria-pressed={pinned}
              onClick={() => onToggle(category.id)}
              onFocus={() => onHover(category.id)}
              onBlur={() => onHover(null)}
              className="flex w-full min-h-11 items-center gap-3 rounded-lg text-left"
            >
              <span
                className={cn(
                  'grid size-10 shrink-0 place-items-center rounded-xl border bg-surface-strong text-[var(--tone)] transition-colors',
                  active ? 'border-[var(--tone)]' : 'border-line',
                )}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="flex-1 text-base font-semibold tracking-tight text-fg">{category.title}</span>
              <span className="font-mono text-[11px] text-fg-subtle">{String(index + 1).padStart(2, '0')}</span>
            </button>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{category.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${category.title} technologies`}>
            {category.technologies.map((t) => (
              <li
                key={t.name}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2 text-[13px] text-fg transition-colors',
                  active && 'border-line-strong',
                )}
              >
                <TechIcon name={t.icon} className={cn('shrink-0 transition-colors', active ? 'text-[var(--tone)]' : 'text-fg-muted')} />
                <span>
                  {t.name}
                  {t.note && <span className="ml-1.5 whitespace-nowrap font-mono text-[10px] text-fg-subtle">· {t.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </RevealItem>
  )
}

export function Ecosystem() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const activeId = hovered ?? pinned
  const active = ecosystemCategories.find((c) => c.id === activeId)

  return (
    <Section id="ecosystem" labelledBy="ecosystem-title" className="overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_30%,transparent_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-70" aria-hidden="true" />

      <SectionHeading id="ecosystem-title" eyebrow="Ecosystem" title={ecosystem.title} description={ecosystem.subtitle} align="center" />

      <div className="relative">
        {/* Decorative spokes, desktop only. */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="spoke" x1="0" x2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {spokes.map(([x, y], i) => (
            <m.line
              key={`${x}-${y}`}
              x1="50"
              y1="25"
              x2={x}
              y2={y}
              stroke="url(#spoke)"
              strokeWidth="1"
              strokeDasharray="3 5"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inView}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.1, ease }}
            />
          ))}
        </svg>

        <RevealGroup className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-10 lg:gap-y-12">
          {/* Central card: shows details of the hovered / selected category. */}
          <RevealItem className="relative z-10 hidden lg:col-start-2 lg:row-start-1 lg:block lg:self-center">
            <div className="card relative overflow-hidden bg-bg p-6 text-center">
              <div className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-32 w-48 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" aria-hidden="true" />
              <div className="relative mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 font-mono text-lg font-semibold text-accent-fg">
                {profile.initials}
              </div>
              <div aria-live="polite" className="relative mt-4 min-h-[6.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={active?.id ?? 'overview'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    {active ? (
                      <>
                        <p className="text-sm font-semibold text-fg">{active.title}</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{active.description}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-fg">{profile.title}</p>
                        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                          Five areas of hands-on experience. Hover or select a category to see how I use it.
                        </p>
                      </>
                    )}
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </RevealItem>

          {ecosystemCategories.map((c, i) => (
            <CategoryCard
              key={c.id}
              category={c}
              index={i}
              active={activeId === c.id}
              dimmed={activeId !== null && activeId !== c.id}
              pinned={pinned === c.id}
              onHover={setHovered}
              onToggle={(id) => setPinned((p) => (p === id ? null : id))}
            />
          ))}
        </RevealGroup>
      </div>

      <Reveal className="mx-auto mt-10 flex max-w-3xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-fg-subtle">
        <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>{ecosystem.disclaimer}</p>
      </Reveal>

      {/* Engineering approach: a general personal workflow. */}
      <section className="mt-20 md:mt-24" aria-labelledby="approach-title">
        <Reveal className="mb-8 text-center">
          <p className="eyebrow mb-3">Engineering approach</p>
          <h3 id="approach-title" className="text-2xl font-semibold tracking-tight text-fg">
            How I approach software work
          </h3>
        </Reveal>
        <div className="relative">
          <m.span
            className="absolute left-[10%] right-[10%] top-6 hidden h-px origin-left bg-gradient-to-r from-accent/70 via-accent-2/60 to-accent/70 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={inView}
            transition={{ duration: 1.2, ease }}
            aria-hidden="true"
          />
          <span className="absolute bottom-6 left-6 top-6 w-px bg-line md:hidden" aria-hidden="true" />
          <RevealGroup role="list" aria-label="Engineering approach steps" className="relative grid gap-6 md:grid-cols-5 md:gap-4" gap={0.1}>
            {engineeringApproach.map((step, i) => {
              const Icon = stepIcons[i]
              return (
                <RevealItem role="listitem" key={step.title} className="group flex items-start gap-4 md:flex-col md:items-center md:text-center">
                  <span className="relative grid size-12 shrink-0 place-items-center rounded-full border border-line-strong bg-bg-elevated text-fg-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    <Icon size={18} aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent font-mono text-[10px] font-semibold text-accent-fg">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <p className="font-semibold text-fg">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted md:max-w-[13rem]">{step.text}</p>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
        <p className="mt-8 text-center text-xs text-fg-subtle">A general personal approach, not a description of any employer’s process.</p>
      </section>
    </Section>
  )
}
