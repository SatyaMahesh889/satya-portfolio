import type { BuildArea, ExperienceTrack } from '../lib/types'

/**
 * Employer name, exact job title and dates must be confirmed from an approved
 * resume before they are published. Leave them undefined until then; the UI
 * hides empty fields instead of showing placeholders.
 */
export const role = {
  title: 'Software Engineer',
  company: undefined as string | undefined,
  period: undefined as string | undefined,
  duration: '~2.6 years',
  summary:
    'Backend-focused engineering across Java services, event ingestion, stream processing, real-time analytics, and edge infrastructure. Descriptions below are intentionally general and contain no confidential or proprietary detail.',
}

export const experienceTracks: ExperienceTrack[] = [
  {
    title: 'Java backend services & integrations',
    description:
      'Developing and maintaining Java backend services and REST APIs, and integrating services through clear, well-defined contracts.',
    stack: ['Java', 'Spring Boot', 'Quarkus', 'REST'],
  },
  {
    title: 'Event ingestion & messaging',
    description:
      'Working on event ingestion and Kafka-based messaging in event-driven applications.',
    stack: ['Apache Kafka', 'Event-driven design'],
  },
  {
    title: 'Stream processing with Apache Flink',
    description:
      'Developing and maintaining stream-processing jobs with Apache Flink.',
    stack: ['Apache Flink', 'Streaming pipelines'],
  },
  {
    title: 'Real-time analytics',
    description:
      'Working with Apache Pinot for real-time analytics, including query and data-processing improvements.',
    stack: ['Apache Pinot', 'Query optimization', 'Data processing'],
  },
  {
    title: 'Cloudflare edge infrastructure',
    description:
      'Building with Cloudflare Workers, Durable Objects and Queues, alongside D1 and KV storage.',
    stack: ['Workers', 'Durable Objects', 'Queues', 'D1', 'KV'],
  },
  {
    title: 'Reliability & debugging',
    description:
      'Debugging issues methodically, testing APIs and load behaviour, and improving reliability.',
    stack: ['Debugging', 'JMeter', 'API testing'],
  },
]

export const buildAreas: BuildArea[] = [
  {
    icon: 'server',
    title: 'Backend Systems & APIs',
    description: 'Java services and REST APIs with clear contracts, validation, and maintainable structure.',
  },
  {
    icon: 'layers',
    title: 'Full-Stack Web Applications',
    description: 'Responsive frontends connected to working backend services, from business dashboards to customer-facing apps.',
  },
  {
    icon: 'globe',
    title: 'Responsive Business Websites',
    description: 'Fast, mobile-first websites that present a business clearly and make contact easy.',
  },
  {
    icon: 'pointer',
    title: 'Interactive User Interfaces',
    description: 'Polished interfaces with thoughtful motion, accessibility, and attention to detail.',
  },
  {
    icon: 'chart',
    title: 'Data Processing & Analytics',
    description: 'Event-driven processing and analytical queries that turn data into usable insight.',
  },
  {
    icon: 'plug',
    title: 'Automation & Integrations',
    description: 'Connecting services and removing manual steps with dependable automation.',
  },
  {
    icon: 'flask',
    title: 'AI-Assisted Rapid Prototyping',
    description: 'Turning requirements into working prototypes quickly, then refining them into maintainable software.',
  },
]
