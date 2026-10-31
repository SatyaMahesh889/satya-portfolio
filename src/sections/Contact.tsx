import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { CopyButton } from '../components/CopyButton'
import type { ReactNode } from 'react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { ContactForm } from '../components/ContactForm'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { contactConfig, links } from '../data/links'

interface Channel {
  label: string
  value: string
  href: string
  icon: ReactNode
  external: boolean
}

type ContactConfig = Omit<typeof contactConfig, 'email'> & { email?: string }

export function Contact({ config = contactConfig }: { config?: ContactConfig }) {
  const channels: Channel[] = [
    { label: 'LinkedIn', value: 'Connect with me', href: links.linkedin, icon: <LinkedinIcon size={20} />, external: true },
    { label: 'GitHub', value: links.githubUser, href: links.github, icon: <GithubIcon size={20} />, external: true },
  ]
  if (config.whatsapp)
    channels.push({
      label: 'WhatsApp',
      value: `+${config.whatsapp}`,
      href: `https://wa.me/${config.whatsapp}`,
      icon: <MessageCircle size={20} aria-hidden="true" />,
      external: true,
    })

  return (
    <Section id="contact" labelledBy="contact-title" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,var(--glow),transparent)]" aria-hidden="true" />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl">
            Let’s Build Something <span className="text-gradient">Meaningful.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fg-muted md:text-lg">
            Interested in discussing an engineering opportunity, software project, or technical collaboration? Let’s connect.
          </p>
        </Reveal>

        <div className="space-y-5">
          {config.email && (
            <Reveal>
              <div className="card p-5 sm:p-6" data-testid="email-card">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-fg">Email</p>
                </div>
                <a
                  href={`mailto:${config.email}`}
                  className="link-underline mt-4 inline-block break-all text-lg font-medium tracking-tight text-fg sm:text-xl"
                >
                  {config.email}
                </a>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${config.email}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-strong hover:text-accent-fg active:scale-[0.97]"
                  >
                    <Mail size={16} aria-hidden="true" />
                    Send an email
                  </a>
                  <CopyButton text={config.email} label="Copy email address" />
                </div>
              </div>
            </Reveal>
          )}
          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {channels.map((c) => (
              <RevealItem key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group card flex items-center gap-4 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-fg-muted transition-colors group-hover:text-accent">
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">{c.label}</span>
                    <span className="block truncate font-mono text-xs text-fg-subtle">{c.value}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            {config.formEndpoint ? (
              <ContactForm endpoint={config.formEndpoint} />
            ) : (
              <div className="rounded-2xl border border-dashed border-line-strong p-5 text-sm leading-relaxed text-fg-muted" data-testid="form-unconfigured">
                <p className="font-medium text-fg">Direct enquiry form: not connected yet</p>
                <p className="mt-1">
                  To avoid messages going nowhere, the form stays hidden until a delivery service is configured. Email is the
                  most reliable way to reach me today.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
