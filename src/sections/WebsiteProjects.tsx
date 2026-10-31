import { WebsiteCard } from '../components/ProjectCard'
import { RevealGroup } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { websiteProjects } from '../data/projects'

export function WebsiteProjects() {
  return (
    <Section id="projects" labelledBy="projects-title" className="bg-gradient-to-b from-transparent via-surface to-transparent">
      <SectionHeading
        id="projects-title"
        eyebrow="Projects"
        title="Selected Website Projects."
        description="Business-focused digital experiences designed and developed using modern web technologies and AI-assisted development workflows."
      />
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" gap={0.12}>
        {websiteProjects.map((p) => (
          <WebsiteCard key={p.slug} project={p} />
        ))}
      </RevealGroup>
    </Section>
  )
}
