import { Link } from 'react-router-dom'
import { contactConfig, links } from '../data/links'
import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold tracking-tight text-fg">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
            {profile.roles.join(' · ')}. Building reliable backend systems, modern web applications, and practical digital products.
          </p>
          {contactConfig.email && (
            <a href={`mailto:${contactConfig.email}`} className="link-underline mt-4 inline-block break-all text-sm text-fg">
              {contactConfig.email}
            </a>
          )}
          <div className="mt-5 flex gap-2">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="grid size-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <GithubIcon />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="grid size-11 place-items-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-fg-subtle">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  className="link-underline inline-block py-1.5 text-fg-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4 text-fg-subtle">Elsewhere</p>
          <ul className="space-y-1 text-sm">
            <li>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-1.5 text-fg-muted hover:text-fg">
                GitHub
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-1.5 text-fg-muted hover:text-fg">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.ismool} target="_blank" rel="noopener noreferrer" className="link-underline inline-block py-1.5 text-fg-muted hover:text-fg">
                ismool
              </a>
            </li>
            {contactConfig.email && (
              <li>
                <a href={`mailto:${contactConfig.email}`} className="link-underline inline-block py-1.5 text-fg-muted hover:text-fg">
                  Email me
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p className="font-mono">Built with React, TypeScript, Tailwind CSS &amp; Motion</p>
        </div>
      </div>
    </footer>
  )
}
