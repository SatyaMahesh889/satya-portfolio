import {
  Activity,
  Braces,
  Bug,
  Cloud,
  Code2,
  FlaskConical,
  Gauge,
  GitPullRequest,
  LayoutPanelTop,
  MonitorSmartphone,
  MousePointer2,
  Plug,
  Radio,
  ServerCog,
  SquareTerminal,
  type LucideIcon,
} from 'lucide-react'
import type { TechIcon as TechIconName } from '../data/ecosystem'
import { brandPaths } from '../lib/tech-icons'

// Technologies without a published brand mark fall back to a neutral Lucide glyph.
const generic: Partial<Record<TechIconName, LucideIcon>> = {
  rest: Braces,
  pinot: Gauge,
  analytics: Activity,
  aws: Cloud,
  codex: SquareTerminal,
  api: ServerCog,
  plug: Plug,
  responsive: MonitorSmartphone,
  ui: LayoutPanelTop,
  motion: MousePointer2,
  events: Radio,
  ai: Code2,
  prototype: FlaskConical,
  debug: Bug,
  review: GitPullRequest,
}

export function TechIcon({ name, size = 16, className }: { name: TechIconName; size?: number; className?: string }) {
  const path = brandPaths[name]
  if (path) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
        <path d={path} />
      </svg>
    )
  }
  const Icon = generic[name] ?? Braces
  return <Icon size={size} aria-hidden="true" className={className} />
}
