import { ChartNoAxesCombined, FlaskConical, Globe, Layers, MousePointerClick, Plug, Server, type LucideIcon } from 'lucide-react'
import { RevealGroup, RevealItem } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { buildAreas } from '../data/experience'
import { cn } from '../lib/cn'
import type { BuildArea } from '../lib/types'

const icons: Record<BuildArea['icon'], LucideIcon> = {
  server: Server,
  layers: Layers,
  globe: Globe,
  pointer: MousePointerClick,
  chart: ChartNoAxesCombined,
  plug: Plug,
  flask: FlaskConical,
}

export function WhatIBuild() {
  return (
    <Section id="what-i-build" labelledBy="build-title">
      <SectionHeading
        id="build-title"
        eyebrow="What I build"
        title="From the data layer to the browser."
        description="Backend, frontend and everything in between: the systems and products I design, build, and deliver."
      />
      <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {buildAreas.map((area, i) => {
          const Icon = icons[area.icon]
          return (
            <RevealItem
              key={area.title}
              className={cn('group relative bg-bg p-6 transition-colors hover:bg-bg-elevated sm:p-8', i === 0 && 'sm:col-span-2')}
            >
              <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-fg-muted transition-colors group-hover:border-accent/50 group-hover:text-accent">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{area.description}</p>
              <span
                className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-8"
                aria-hidden="true"
              />
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
