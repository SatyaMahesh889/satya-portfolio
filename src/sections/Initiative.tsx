import { ArrowUpRight, Check } from 'lucide-react'
import { BrowserFrame } from '../components/BrowserFrame'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { getProject } from '../data/projects'

export function Initiative() {
  const ismool = getProject('ismool')!
  const live = ismool.links[0]
  return (
    <Section id="ismool" labelledBy="ismool-title">
      <div className="card relative overflow-hidden p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" aria-hidden="true" />
        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow mb-4">Independent initiative</p>
            <h2 id="ismool-title" className="text-3xl font-semibold leading-tight text-fg sm:text-4xl">
              ismool
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">{ismool.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
              ismool is separate from my engineering career and this personal portfolio. It is where I apply the same habits
              of clear scope, maintainable code and testing before launch to digital products for businesses.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-fg-muted sm:grid-cols-2">
              {ismool.caseStudy.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={live.href} external>
                {live.label}
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
              <ButtonLink to={`/projects/${ismool.slug}`} variant="secondary">
                About the initiative
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {ismool.cover && <BrowserFrame image={ismool.cover} url={live.href} className="rotate-0 transition-transform duration-700 lg:hover:-rotate-1" />}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
