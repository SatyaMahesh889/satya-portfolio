import { m, useScroll, useSpring } from 'motion/react'
import { Briefcase } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { Tag } from '../components/Tag'
import { experienceTracks, role } from '../data/experience'
import { ease, inView } from '../lib/motion'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="experience" labelledBy="experience-title" className="bg-gradient-to-b from-transparent via-surface to-transparent">
      <SectionHeading
        id="experience-title"
        eyebrow="Professional experience"
        title="Backend engineering across services, streaming and analytics."
        description={role.summary}
      />

      <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-surface-strong text-accent">
                <Briefcase size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-fg">{role.title}</h3>
                {role.company && <p className="text-sm text-fg-muted">{role.company}</p>}
                <p className="mt-1 font-mono text-xs text-fg-subtle">{role.period ?? role.duration}</p>
              </div>
            </div>
            <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-fg-muted">
              Core areas: Java services, Kafka messaging, Flink stream processing, Apache Pinot analytics, and Cloudflare edge
              infrastructure.
            </p>
          </div>
        </Reveal>

        <ol ref={listRef} className="relative space-y-6 pl-8 sm:pl-10" aria-label="Areas of engineering responsibility">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line sm:left-[11px]" aria-hidden="true" />
          <m.span
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent-2 sm:left-[11px]"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />
          {experienceTracks.map((track, i) => (
            <m.li
              key={track.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, ease, delay: 0.05 }}
              className="relative"
            >
              <span
                className="absolute -left-8 top-6 grid size-[15px] place-items-center rounded-full border border-accent/60 bg-bg sm:-left-10 sm:size-[23px]"
                aria-hidden="true"
              >
                <span className="size-1.5 rounded-full bg-accent sm:size-2" />
              </span>
              <div className="group rounded-2xl border border-line bg-bg-elevated/40 p-5 transition-colors hover:border-line-strong sm:p-6">
                <p className="font-mono text-[11px] text-fg-subtle">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">{track.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-[15px]">{track.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {track.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </m.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
