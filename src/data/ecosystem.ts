/**
 * "My Engineering Ecosystem": independent technology categories that describe
 * individual experience. Deliberately contains no architecture, data flow,
 * component names or employer-specific detail; categories are not connected
 * to one another.
 */
export type TechIcon =
  | 'java'
  | 'spring'
  | 'quarkus'
  | 'rest'
  | 'kafka'
  | 'rabbitmq'
  | 'flink'
  | 'pinot'
  | 'cockroach'
  | 'redis'
  | 'analytics'
  | 'workers'
  | 'cloudflare'
  | 'aws'
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'claude'
  | 'codex'
  | 'api'
  | 'plug'
  | 'responsive'
  | 'ui'
  | 'motion'
  | 'events'
  | 'ai'
  | 'prototype'
  | 'debug'
  | 'review'

export type CategoryIcon = 'server' | 'layout' | 'messages' | 'database' | 'sparkle'

/** Each category has its own subtle accent hue (see --cat-* tokens in index.css). */
export type CategoryTone = 1 | 2 | 3 | 4 | 5

export interface EcosystemCategory {
  id: string
  title: string
  icon: CategoryIcon
  tone: CategoryTone
  description: string
  technologies: { name: string; icon: TechIcon; note?: string }[]
}

export const ecosystem = {
  title: 'My Engineering Ecosystem',
  subtitle: 'Technologies and engineering concepts I work with to build reliable, scalable software systems.',
  disclaimer:
    'Illustrative technology overview. Technologies are presented to reflect my engineering experience, not to disclose any employer’s production architecture.',
}

export const ecosystemCategories: EcosystemCategory[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'server',
    tone: 1,
    description: 'Building backend services and REST APIs on the JVM, and integrating them with other systems through clear contracts.',
    technologies: [
      { name: 'Java', icon: 'java' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'Quarkus', icon: 'quarkus' },
      { name: 'REST APIs', icon: 'rest' },
      { name: 'Backend services', icon: 'api' },
      { name: 'API integrations', icon: 'plug' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'layout',
    tone: 2,
    description: 'Building responsive, accessible interfaces with modern UI and motion. My React experience comes from learning projects and AI-assisted builds.',
    technologies: [
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React', icon: 'react', note: 'Learning projects' },
      { name: 'Responsive web development', icon: 'responsive' },
      { name: 'Modern UI implementation', icon: 'ui' },
      { name: 'Animations & interactions', icon: 'motion' },
    ],
  },
  {
    id: 'messaging',
    title: 'Messaging & Data Engineering',
    icon: 'messages',
    tone: 3,
    description: 'Working with message brokers, stream processing and real-time analytics to build event-driven applications.',
    technologies: [
      { name: 'Apache Kafka', icon: 'kafka' },
      { name: 'RabbitMQ', icon: 'rabbitmq' },
      { name: 'Apache Flink', icon: 'flink' },
      { name: 'Apache Pinot', icon: 'pinot' },
      { name: 'Event-driven systems', icon: 'events' },
      { name: 'Real-time analytics', icon: 'analytics' },
    ],
  },
  {
    id: 'cloud',
    title: 'Database & Cloud',
    icon: 'database',
    tone: 4,
    description: 'Choosing storage and caching to fit the access pattern, and deploying edge-first workloads, with working knowledge of AWS.',
    technologies: [
      { name: 'CockroachDB', icon: 'cockroach' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Cloudflare Workers', icon: 'workers' },
      { name: 'Durable Objects', icon: 'cloudflare' },
      { name: 'Cloudflare Queues', icon: 'cloudflare' },
      { name: 'AWS', icon: 'aws', note: 'Working knowledge' },
    ],
  },
  {
    id: 'ai',
    title: 'AI-Assisted Development',
    icon: 'sparkle',
    tone: 5,
    description: 'Using AI coding tools to prototype and implement faster, while I own the design, review, testing and delivery.',
    technologies: [
      { name: 'Claude', icon: 'claude' },
      { name: 'OpenAI Codex', icon: 'codex' },
      { name: 'AI-assisted coding', icon: 'ai' },
      { name: 'Rapid prototyping', icon: 'prototype' },
      { name: 'UI generation & refinement', icon: 'ui' },
      { name: 'AI-assisted debugging', icon: 'debug' },
      { name: 'Code review & testing workflows', icon: 'review' },
      { name: 'AI-assisted application development', icon: 'prototype' },
    ],
  },
]

/** A general personal approach to software work, not any employer's process. */
export const engineeringApproach = [
  { title: 'Understand', text: 'Clarify the problem, the users and what “done” means.' },
  { title: 'Design', text: 'Shape contracts, data and trade-offs before writing code.' },
  { title: 'Build', text: 'Implement in small, reviewable, maintainable steps.' },
  { title: 'Test', text: 'Verify behaviour, edge cases and failure modes.' },
  { title: 'Deliver', text: 'Ship, observe and iterate on real feedback.' },
]
