import type { Project, ProjectImage } from '../lib/types.ts'

/**
 * All projects shown on the site. Every project gets a case-study page at
 * /projects/:slug. Screenshots in /public/projects were captured from the live
 * sites. Early GitHub learning projects are intentionally not showcased.
 */

const shot = (slug: string, file: string, alt: string, caption?: string, dims?: [number, number]): ProjectImage => {
  const size: Record<string, [number, number]> = {
    'desktop.webp': [1440, 900],
    'card.webp': [800, 500],
    'mobile.webp': [520, 1125],
  }
  const [width, height] = dims ?? size[file] ?? [1200, 750]
  return { src: `/projects/${slug}/${file}`, alt, width, height, caption }
}

const aiApproach = [
  'Started from the business context: who visits the site, what they need to find, and the single action that matters most (calling, messaging, or enquiring).',
  'Used AI-assisted development tools to generate and refine the implementation rapidly, while directing the structure, content hierarchy, and visual decisions myself.',
  'Reviewed and iterated on the output section by section: responsive behaviour, navigation, contrast, and contact pathways.',
  'Deployed to Cloudflare Workers and verified the live build on desktop and mobile.',
]

const websiteRole = [
  'Gathered and organised the requirements and content structure',
  'Directed the design and user-experience decisions',
  'Built and iterated on the implementation using AI-assisted tooling',
  'Tested responsiveness and deployed the site on Cloudflare',
]

export const projects: Project[] = [
  // ────────────────────────────── Website projects ──────────────────────────────
  {
    slug: 'sri-sai-manikanta-welding-works',
    kind: 'website',
    title: 'Sri Sai Manikanta Welding Works',
    type: 'Industrial business website',
    label: 'Independent Website Project',
    contribution: 'Requirements, UX direction, AI-assisted implementation, testing and Cloudflare deployment.',
    summary:
      'A responsive website for a welding and fabrication business, focused on presenting services and helping potential customers discover and contact the business.',
    featured: true,
    tags: ['Responsive', 'Service catalogue', 'WhatsApp enquiries', 'Cloudflare Workers'],
    links: [{ label: 'Live demo', href: 'https://ssm-welding-works.ismool.workers.dev/', kind: 'live' }],
    cover: shot('ssm-welding', 'desktop.webp', 'Homepage of the Sri Sai Manikanta Welding Works website with a bold "Forged by experience" headline'),
    mobile: shot('ssm-welding', 'mobile.webp', 'Sri Sai Manikanta Welding Works website on a mobile screen'),
    gallery: [
      shot('ssm-welding', 'section-1.webp', 'Services section listing residential, commercial and structural welding', 'Service-focused layout with a per-service WhatsApp enquiry'),
      shot('ssm-welding', 'section-2.webp', 'Work gallery with category filters such as gates, structural and fabrication', 'Filterable work gallery. Stock images are clearly labelled “Sample photo”'),
      shot('ssm-welding', 'section-3.webp', 'Quote request form alongside phone and WhatsApp contact options', 'Quote form that hands off to WhatsApp instead of pretending to send'),
    ],
    caseStudy: {
      introduction:
        'A website for a family-run welding and fabrication business, built to present its services clearly and make it simple for nearby customers to get in touch.',
      objective:
        'Small trade businesses are often found by word of mouth alone. The goal was a fast, credible web presence that explains what the business builds and turns a visit into a phone call or WhatsApp conversation with as little friction as possible.',
      role: websiteRole,
      approach: aiApproach,
      features: [
        'Service catalogue covering residential, commercial, structural and custom fabrication work',
        'Per-service WhatsApp enquiry links with a pre-filled message',
        'Filterable work gallery, with stock imagery honestly labelled as sample photos',
        'Quote request form that composes a WhatsApp message rather than claiming to submit',
        'Business story section and clear primary/alternate phone contacts',
        'Responsive layout and sticky navigation across mobile and desktop',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Workers', 'AI-assisted development'],
      challenges: [
        'Making contact the obvious next step on every screen without the page feeling like an advert.',
        'Being transparent about imagery: until real job photos are available, stock images carry a visible label.',
        'Keeping a heavy, industrial visual style legible and fast on mobile connections.',
      ],
    },
    related: ['arc-architects-interiors', 'dsr-charitable-hospitals'],
  },
  {
    slug: 'arc-architects-interiors',
    kind: 'website',
    title: 'ARC Architects & Interiors',
    type: 'Architecture & interior design website',
    label: 'Independent Website Project',
    contribution: 'Requirements, visual direction, AI-assisted implementation, testing and Cloudflare deployment.',
    summary:
      'A visually engaging website designed to present architecture and interior design services, project imagery, and enquiry pathways.',
    featured: true,
    tags: ['Visual presentation', 'Services', 'Project showcase', 'Cloudflare Workers'],
    links: [{ label: 'Live demo', href: 'https://arc-architects-interiors.ismool.workers.dev/', kind: 'live' }],
    cover: shot('arc-architects', 'desktop.webp', 'Homepage of the ARC Architects & Interiors website showing a residential elevation and serif headline'),
    mobile: shot('arc-architects', 'mobile.webp', 'ARC Architects & Interiors website on a mobile screen'),
    gallery: [
      shot('arc-architects', 'section-1.webp', 'Services section listing architectural design and interior design', 'Editorial services layout pairing each service with imagery'),
      shot('arc-architects', 'section-2.webp', 'Featured project section showing a contemporary residential elevation', 'Featured project presentation with multiple views'),
    ],
    caseStudy: {
      introduction:
        'A website for an architecture and interior design practice, built to let the work speak first and to guide visitors toward starting a conversation.',
      objective:
        'Design practices are judged on visual quality before anything else. The objective was a calm, image-led site that presents services and project imagery with restraint, and offers clear enquiry pathways through WhatsApp, phone, email and directions.',
      role: websiteRole,
      approach: aiApproach,
      features: [
        'Image-led hero and editorial typography suited to an architecture practice',
        'Service sections for architectural design, interiors, 3D visualisation, consultation and renovation',
        'Featured project presentation with multiple views',
        'Design-philosophy and suggested design-journey sections',
        'Enquiry pathways via WhatsApp, phone, email and Google Maps directions',
        'Responsive implementation across mobile, tablet and desktop',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Workers', 'AI-assisted development'],
      challenges: [
        'Balancing large, high-quality imagery with page weight and loading speed.',
        'Keeping text readable over photography in both the hero and section layouts.',
        'Presenting project imagery faithfully: I built the website; I did not design the buildings or interiors it shows.',
      ],
    },
    related: ['sri-sai-manikanta-welding-works', 'dsr-charitable-hospitals'],
  },
  {
    slug: 'dsr-charitable-hospitals',
    kind: 'website',
    title: 'DSR Charitable Hospitals',
    type: 'Healthcare website redesign concept',
    label: 'Independent Redesign Concept',
    contribution: 'Information architecture, accessibility decisions, AI-assisted implementation and deployment.',
    summary:
      'An independent healthcare website concept focused on accessible information, medical department discovery, visitor navigation, and a clearer digital experience.',
    disclaimer: 'Independent redesign concept — not an official hospital website.',
    featured: true,
    tags: ['Redesign concept', 'Accessibility', 'Department discovery', 'Cloudflare Workers'],
    links: [{ label: 'Live concept', href: 'https://dsr-charitable-hospitals.ismool.workers.dev/', kind: 'live' }],
    cover: shot('dsr-hospitals', 'desktop.webp', 'Homepage of the DSR Charitable Hospitals redesign concept with a "Healthcare with Compassion" headline'),
    mobile: shot('dsr-hospitals', 'mobile.webp', 'DSR Charitable Hospitals redesign concept on a mobile screen'),
    gallery: [
      shot('dsr-hospitals', 'section-1.webp', 'Grid of medical departments such as General Medicine, Diabetology and Pediatrics', 'Department discovery with plain-language descriptions'),
      shot('dsr-hospitals', 'section-2.webp', 'Four-step visitor journey from exploring departments to visiting the hospital', 'A step-by-step visitor path from question to care'),
      shot('dsr-hospitals', 'section-3.webp', 'Illustrative appointment enquiry form labelled as a demo', 'Illustrative enquiry form, clearly marked as a demo that submits nothing'),
    ],
    caseStudy: {
      introduction:
        'An unsolicited, independent concept exploring how a community hospital’s website could make essential information easier to find. It is not affiliated with or approved by the hospital.',
      objective:
        'Hospital visitors usually arrive with one urgent question: which department, which doctor, how to get there, who to call. The concept reorganises the experience around those questions, with accessible typography, clear calls to action, and honest labelling of anything unverified.',
      role: [
        'Defined the redesign goals and information architecture',
        'Directed visual design and accessibility decisions',
        'Built and iterated on the concept using AI-assisted tooling',
        'Deployed the concept on Cloudflare with prominent “not official” labelling',
      ],
      approach: [
        'Mapped the most common visitor tasks (finding a department, calling, getting directions) and gave each a direct path from the first screen.',
        ...aiApproach.slice(1),
      ],
      features: [
        'Persistent banner stating it is an independent concept, not the official website',
        'Department discovery with plain-language descriptions',
        'Step-by-step visitor journey from enquiry to visit',
        'Call and directions actions available from the header',
        'Illustrative appointment enquiry that explicitly submits nothing',
        'Unverified doctor details labelled as “awaiting verification”',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Workers', 'AI-assisted development'],
      challenges: [
        'Designing a credible healthcare experience while never implying official status.',
        'Representing appointment features honestly: the enquiry form is a non-functional illustration and is not connected to any hospital system.',
        'Prioritising accessible contrast and type sizes for a broad, often non-technical audience.',
      ],
    },
    related: ['sri-sai-manikanta-welding-works', 'arc-architects-interiors'],
  },

  // ────────────────────────────── Initiative ──────────────────────────────
  {
    slug: 'ismool',
    kind: 'initiative',
    title: 'ismool',
    type: 'Independent digital solutions initiative',
    summary:
      'ismool is my independent initiative focused on websites, web applications, and digital technology solutions for businesses.',
    tags: ['Business websites', 'Web applications', 'Automation', 'Cloudflare'],
    links: [{ label: 'Visit ismool', href: 'https://ismool-website.ismool.workers.dev/', kind: 'live' }],
    cover: shot('ismool-site', 'desktop.webp', 'Homepage of the ismool website with the headline "Smart Solutions for Modern Businesses"', undefined, [1440, 752]),
    mobile: shot('ismool-site', 'mobile.webp', 'ismool website on a mobile screen'),
    gallery: [
      shot('ismool-site', 'section-1.webp', 'ismool services overview for business websites and web applications', 'Service overview'),
      shot('ismool-site', 'section-2.webp', 'ismool five-step process from discovery to launch', 'A transparent, five-step delivery process'),
    ],
    caseStudy: {
      introduction:
        'ismool is a separate, independent initiative I run alongside my engineering work. It applies the same engineering habits (clear scope, maintainable code, testing before launch) to websites and digital tools for businesses.',
      objective:
        'Many small and growing businesses need dependable digital foundations but lack technical guidance. ismool aims to offer practical websites, web applications and automation with clear communication and ongoing support.',
      role: [
        'Founded and run the initiative',
        'Define the service offering and delivery process',
        'Build and deploy websites and prototypes',
      ],
      approach: [
        'A five-step process (discover, plan, design, build and test, launch and improve) shared openly on the site.',
        'Cloudflare-hosted builds for fast, low-cost delivery.',
        'Business-first scoping before any implementation begins.',
      ],
      features: [
        'Business website and web application development',
        'SaaS and AI-assisted solution exploration',
        'WhatsApp Business automation',
        'Maintenance and support after launch',
      ],
      technologies: ['Cloudflare Workers', 'HTML', 'CSS', 'JavaScript', 'AI-assisted development'],
      challenges: [
        'Keeping the initiative distinct from my personal engineering profile.',
        'Communicating technical options to non-technical business owners in plain language.',
      ],
    },
    related: ['sri-sai-manikanta-welding-works', 'arc-architects-interiors'],
  },
]

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)
export const websiteProjects = projects.filter((p) => p.kind === 'website')
