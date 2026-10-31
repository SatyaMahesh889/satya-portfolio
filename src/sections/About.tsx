import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About me"
            title={
              <>
                Engineer first. <span className="text-fg-muted">Product-minded always.</span>
              </>
            }
            className="mb-10 md:mb-12"
          />
          <Reveal className="card p-6">
            <div className="flex items-center gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 font-mono text-lg font-semibold text-accent-fg">
                {profile.initials}
              </div>
              <div>
                <p className="font-semibold text-fg">{profile.name}</p>
                <p className="text-sm text-fg-muted">{profile.title}</p>
              </div>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Experience</dt>
                <dd className="mt-1 text-fg">{profile.experience}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Focus</dt>
                <dd className="mt-1 text-fg">Backend &amp; frontend</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Builds</dt>
                <dd className="mt-1 text-fg">Backend services, web apps &amp; digital experiences</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="lg:pt-24">
          <RevealGroup className="space-y-5 text-base leading-relaxed text-fg-muted md:text-lg">
            {profile.about.paragraphs.map((p) => (
              <RevealItem key={p.slice(0, 24)}>
                <p>{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3">
            {profile.about.principles.map((pr, i) => (
              <RevealItem key={pr.title} className="rounded-2xl border border-line p-5">
                <p className="font-mono text-[11px] text-accent">0{i + 1}</p>
                <h3 className="mt-3 text-sm font-semibold text-fg">{pr.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{pr.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}
