import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BrowserFrame } from '../components/BrowserFrame'
import { ButtonLink } from '../components/Button'
import { Disclaimer } from '../components/Disclaimer'
import { WebsiteCard } from '../components/ProjectCard'
import { Reveal, RevealGroup } from '../components/Reveal'
import { Tag } from '../components/Tag'
import { getProject } from '../data/projects'
import { profile } from '../data/profile'
import { usePageMeta } from '../hooks/usePageMeta'
import NotFound from './NotFound'

function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const id = `cs-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`
  return (
    <Reveal>
      <section aria-labelledby={id} className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-[220px_1fr] md:gap-10">
        <h2 id={id} className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-fg">
          <span className="font-mono text-xs text-accent">{String(n).padStart(2, '0')}</span>
          {title}
        </h2>
        <div className="text-[15px] leading-relaxed text-fg-muted md:text-base">{children}</div>
      </section>
    </Reveal>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <Check size={17} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  usePageMeta({
    title: project ? `${project.title}: Case Study | ${profile.name}` : `Project not found | ${profile.name}`,
    description: project?.summary ?? 'This project could not be found.',
    path: `/projects/${slug ?? ''}`,
    image: project?.cover?.src,
  })

  if (!project) return <NotFound />

  const { caseStudy: cs } = project
  const related = project.related.map(getProject).filter((p) => p !== undefined)
  const primary = project.links[0]
  const backHash = project.kind === 'initiative' ? 'ismool' : 'projects'

  return (
    <article className="relative pb-24 pt-28 md:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] [mask-image:linear-gradient(to_bottom,#000,transparent)]" aria-hidden="true" />
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            to={{ pathname: '/', hash: `#${backHash}` }}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
          </Link>
        </nav>

        <header className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-4">{project.type}</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{project.summary}</p>
            {project.disclaimer && <Disclaimer className="mt-6 text-sm">{project.disclaimer}</Disclaimer>}
          </Reveal>
          <Reveal delay={0.1} className="card p-6">
            <dl className="space-y-4 text-sm">
              {project.label && (
                <div className="flex justify-between gap-4">
                  <dt className="text-fg-subtle">Project</dt>
                  <dd className="text-right text-fg">{project.label}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-fg-subtle">Type</dt>
                <dd className="text-right text-fg">{project.type}</dd>
              </div>
              <div>
                <dt className="sr-only">Highlights</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            {primary && (
              <ButtonLink to={primary.href} external className="mt-6 w-full">
                {primary.label}
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            )}
          </Reveal>
        </header>

        {project.cover && (
          <Reveal className="mt-14 grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <BrowserFrame
              image={project.cover}
              url={primary?.href}
              priority
              srcSet={`${project.cover.src.replace('desktop.webp', 'card.webp')} 800w, ${project.cover.src} 1440w`}
              sizes="(min-width: 1200px) 900px, 100vw"
            />
            {project.mobile && (
              <figure className="mx-auto w-48 overflow-hidden rounded-[1.75rem] border-4 border-line-strong bg-bg-elevated shadow-card md:w-56">
                <img
                  src={project.mobile.src}
                  alt={project.mobile.alt}
                  width={project.mobile.width}
                  height={project.mobile.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </figure>
            )}
          </Reveal>
        )}

        <div className="mt-16">
          <Block n={1} title="Introduction">
            <p>{cs.introduction}</p>
          </Block>
          <Block n={2} title="Objective">
            <p>{cs.objective}</p>
          </Block>
          <Block n={3} title="My role">
            <Bullets items={cs.role} />
          </Block>
          <Block n={4} title="Development approach">
            <Bullets items={cs.approach} />
          </Block>
          <Block n={5} title="Key features">
            <Bullets items={cs.features} />
          </Block>
          <Block n={6} title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {cs.technologies.map((t) => (
                <li key={t}>
                  <Tag className="px-3 py-1.5 text-xs">{t}</Tag>
                </li>
              ))}
            </ul>
          </Block>
          {project.gallery && project.gallery.length > 0 && (
            <Block n={7} title="Screenshots">
              <p className="mb-6 text-sm">Captured from the live site.</p>
              <div className="grid grid-cols-1 gap-6">
                {project.gallery.map((img) => (
                  <figure key={img.src}>
                    <BrowserFrame image={img} url={primary?.href} sizes="(min-width: 1024px) 800px, 100vw" />
                    {img.caption && <figcaption className="mt-3 text-sm text-fg-subtle">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Block>
          )}
          <Block n={project.gallery?.length ? 8 : 7} title="Challenges & learning">
            <Bullets items={cs.challenges} />
          </Block>
          <Block n={project.gallery?.length ? 9 : 8} title="Links">
            <div className="flex flex-wrap gap-3">
              {project.links.map((l) => (
                <ButtonLink key={l.href} to={l.href} external variant="secondary">
                  {l.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              ))}
            </div>
          </Block>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mt-12 border-t border-line pt-14">
            <h2 id="related-title" className="mb-8 text-2xl font-semibold tracking-tight text-fg">
              Related projects
            </h2>
            <RevealGroup className="grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <WebsiteCard key={p.slug} project={p} />
              ))}
            </RevealGroup>
          </section>
        )}
      </div>
    </article>
  )
}
