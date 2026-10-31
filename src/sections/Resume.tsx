import { Download, FileText } from 'lucide-react'
import { LinkedinIcon } from '../components/BrandIcons'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { role } from '../data/experience'
import { contactConfig, links } from '../data/links'
import { profile } from '../data/profile'

export function Resume({ resumeUrl = contactConfig.resumeUrl }: { resumeUrl?: string }) {
  return (
    <Section id="resume" labelledBy="resume-title" className="py-16 md:py-20">
      <Reveal className="grid gap-8 rounded-2xl border border-line bg-bg-elevated/50 p-6 sm:p-10 md:grid-cols-[auto_1fr_auto] md:items-center">
        <span className="grid size-14 place-items-center rounded-2xl border border-line-strong bg-surface-strong text-accent">
          <FileText size={24} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow mb-2">Resume</p>
          <h2 id="resume-title" className="text-2xl font-semibold tracking-tight text-fg">
            {profile.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {role.title} · {role.duration} · Java backend, event-driven systems, real-time analytics, and web development.
          </p>
          {!resumeUrl && (
            <p className="mt-3 text-sm text-fg-subtle">
              A downloadable resume is not published yet. It is available on request via LinkedIn.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {resumeUrl ? (
            <ButtonLink to={resumeUrl} external download>
              <Download size={16} aria-hidden="true" />
              Download resume (PDF)
            </ButtonLink>
          ) : (
            <ButtonLink to={links.linkedin} variant="secondary" external>
              <LinkedinIcon size={16} />
              Request via LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </Section>
  )
}
