/**
 * Core profile content. Edit this file to update copy across the site.
 * Only verified facts belong here; confirm any new claim before publishing.
 */
export const profile = {
  name: 'Satya Mahesh Indugula',
  shortName: 'Satya Mahesh',
  initials: 'SM',
  title: 'Software Engineer',
  roles: ['Software Engineer', 'Full-Stack Developer', 'Digital Solutions'],
  experience: '~2.6 years',
  location: undefined as string | undefined,

  hero: {
    eyebrow: 'Software Engineer · Full-Stack Developer',
    headline: ['Building Scalable Systems', '& Modern Digital Experiences.'],
    description:
      'I build reliable backend systems, modern frontend applications, and complete digital experiences. Combining software engineering expertise with AI-assisted development, I turn ideas into working products efficiently.',
    primaryCta: 'Explore My Work',
    secondaryCta: 'Get in Touch',
  },

  about: {
    paragraphs: [
      "I'm a software engineer with experience in backend engineering, frontend development, data processing, and modern web technologies. I build scalable backend services, responsive web applications, and complete digital experiences.",
      'Professionally, I have worked with Java services, Kafka-based messaging, Apache Flink stream processing, Apache Pinot for real-time analytics, and edge infrastructure on Cloudflare Workers, Durable Objects, and Queues. I care about systems that are observable, debuggable, and predictable under load.',
      'By combining engineering knowledge with AI-assisted development tools such as Claude and OpenAI Codex, I can turn ideas and business requirements into functional products efficiently, while staying responsible for design decisions, code review, testing, and delivery.',
    ],
    principles: [
      { title: 'Reliability first', text: 'Clear contracts, predictable failure modes, and code that is easy to debug at 2 a.m.' },
      { title: 'Data you can trust', text: 'Pipelines designed around correctness, idempotency, and queryable outcomes.' },
      { title: 'Practical delivery', text: 'Understand the requirement, ship something working, then iterate.' },
    ],
  },

  seo: {
    title: 'Satya Mahesh Indugula | Software Engineer & Full-Stack Developer',
    description:
      'Satya Mahesh Indugula is a software engineer and full-stack developer building scalable backend services, responsive web applications, and complete digital experiences.',
  },
} as const
