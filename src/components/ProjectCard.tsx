import { m } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../lib/types'
import { fadeUp } from '../lib/motion'
import { Disclaimer } from './Disclaimer'
import { Tag } from './Tag'

/** Project card with a real screenshot, case-study link and live demo link. */
export function WebsiteCard({ project }: { project: Project }) {
  const live = project.links.find((l) => l.kind === 'live')
  return (
    <m.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group card flex flex-col overflow-hidden"
    >
      <div className="relative overflow-hidden border-b border-line">
        {project.cover && (
          <img
            src={project.cover.src.replace('desktop.webp', 'card.webp')}
            alt={project.cover.alt}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.label && (
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-accent">
              {project.label}
            </span>
          )}
          <span className="font-mono text-[11px] text-fg-subtle">{project.type}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none [&:focus-visible]:after:rounded-[1.25rem] [&:focus-visible]:after:outline [&:focus-visible]:after:outline-2 [&:focus-visible]:after:outline-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        {project.contribution && (
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            <span className="font-medium text-fg">My contribution: </span>
            {project.contribution}
          </p>
        )}
        {project.disclaimer && <Disclaimer className="mt-4 self-start">{project.disclaimer}</Disclaimer>}
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Highlights">
          {project.tags.slice(0, 3).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-6 text-sm">
          <span className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-fg">
            Read case study
            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          {live && (
            <a
              href={live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3.5 text-fg-muted transition-colors hover:border-accent hover:text-fg"
            >
              {live.label}
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </m.article>
  )
}
