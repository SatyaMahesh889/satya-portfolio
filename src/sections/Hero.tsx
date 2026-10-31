import { m } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { ButtonLink } from '../components/Button'
import { links } from '../data/links'
import { profile } from '../data/profile'
import { websiteProjects } from '../data/projects'
import { ease } from '../lib/motion'

const highlights = [
  { value: profile.experience, label: 'Professional experience' },
  { value: 'Full-stack', label: 'Backend · frontend · data' },
  { value: `${websiteProjects.length} live`, label: 'Website builds' },
  { value: 'AI-assisted', label: 'Claude & Codex workflows' },
]

export function Hero() {
  const { hero } = profile
  let wordIndex = 0
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-32 md:min-h-svh md:pb-28 md:pt-40">
      {/* Background: fine grid, masked, plus two slow-drifting glows. */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_40%,transparent_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] animate-drift" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-10rem] top-64 -z-10 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgb(94_200_255/0.10),transparent)] animate-drift [animation-delay:-9s]" aria-hidden="true" />

      <div className="container-page">
        <div className="max-w-4xl">
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {hero.eyebrow}
          </m.p>

          <h1 id="hero-title" className="text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-6xl lg:text-7xl">
            {hero.headline.map((line, li) => (
              <span key={line} className={li === 1 ? 'text-gradient block pb-1' : 'block'}>
                {line.split(' ').map((word) => {
                  const i = wordIndex++
                  return (
                    <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
                      <m.span
                        className="inline-block"
                        initial={{ y: '105%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease }}
                      >
                        {word}&nbsp;
                      </m.span>
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {hero.description}
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink to="#projects">
              {hero.primaryCta}
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to="#contact" variant="secondary">
              {hero.secondaryCta}
            </ButtonLink>
            <span className="ml-1 flex items-center gap-1">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="grid size-11 place-items-center rounded-full text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg"
              >
                <GithubIcon />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="grid size-11 place-items-center rounded-full text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg"
              >
                <LinkedinIcon />
              </a>
            </span>
          </m.div>
        </div>

      </div>

      <m.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.95 }}
        className="container-page mt-16 grid grid-cols-2 gap-px overflow-hidden md:mt-20 md:grid-cols-4"
      >
        {highlights.map((h) => (
          <div key={h.label} className="flex flex-col-reverse border-l border-line py-2 pl-4 first:border-l-accent/60 sm:pl-5">
            <dt className="mt-1 text-xs text-fg-subtle sm:text-sm">{h.label}</dt>
            <dd className="text-lg font-semibold tracking-tight text-fg sm:text-xl">{h.value}</dd>
          </div>
        ))}
      </m.dl>

      <m.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle transition-colors hover:text-fg md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <m.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} aria-hidden="true" />
        </m.span>
      </m.a>
    </section>
  )
}
