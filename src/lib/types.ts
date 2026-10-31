export type ProjectKind = 'website' | 'initiative'

export interface ProjectImage {
  src: string
  alt: string
  /** Intrinsic dimensions, used to reserve space and avoid layout shift. */
  width: number
  height: number
  caption?: string
}

export interface ProjectLink {
  label: string
  href: string
  kind: 'live'
}

export interface Project {
  slug: string
  kind: ProjectKind
  title: string
  /** Short category line, e.g. "Industrial business website". */
  type: string
  summary: string
  /** Optional notice that must accompany the project wherever it is shown. */
  disclaimer?: string
  /** Honest relationship label, e.g. "Independent Website Project". */
  label?: string
  /** One-line summary of my contribution, shown on cards. */
  contribution?: string
  featured?: boolean
  tags: string[]
  links: ProjectLink[]
  cover?: ProjectImage
  mobile?: ProjectImage
  gallery?: ProjectImage[]
  caseStudy: {
    introduction: string
    objective: string
    role: string[]
    approach: string[]
    features: string[]
    technologies: string[]
    challenges: string[]
  }
  related: string[]
}

export interface SkillGroup {
  id: string
  title: string
  /** Compact label used for the category tab. */
  short: string
  blurb: string
  skills: { name: string; note?: string }[]
}

export interface ExperienceTrack {
  title: string
  description: string
  stack: string[]
}

export interface BuildArea {
  title: string
  description: string
  icon: 'server' | 'layers' | 'globe' | 'pointer' | 'chart' | 'plug' | 'flask'
}
