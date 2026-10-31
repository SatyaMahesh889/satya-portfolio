import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getProject, projects, websiteProjects } from '../../src/data/projects'

const publicDir = join(__dirname, '../../public')

describe('project data', () => {
  it('has unique slugs and valid related links', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const p of projects) for (const r of p.related) expect(getProject(r), `${p.slug} → ${r}`).toBeDefined()
  })

  it('includes all three website projects with the verified live URLs', () => {
    expect(websiteProjects.map((p) => p.links[0].href)).toEqual([
      'https://ssm-welding-works.ismool.workers.dev/',
      'https://arc-architects-interiors.ismool.workers.dev/',
      'https://dsr-charitable-hospitals.ismool.workers.dev/',
    ])
  })

  it('labels the DSR project as an independent concept', () => {
    expect(getProject('dsr-charitable-hospitals')?.disclaimer).toBe('Independent redesign concept — not an official hospital website.')
  })

  it('references screenshots that exist on disk', () => {
    for (const p of projects) {
      for (const img of [p.cover, p.mobile, ...(p.gallery ?? [])].filter((i) => i !== undefined)) {
        expect(existsSync(join(publicDir, img.src)), img.src).toBe(true)
        expect(img.alt.length).toBeGreaterThan(10)
      }
    }
  })

  it('contains only the three website projects and the ismool initiative', () => {
    expect(projects.map((p) => p.slug).sort()).toEqual(
      ['arc-architects-interiors', 'dsr-charitable-hospitals', 'ismool', 'sri-sai-manikanta-welding-works'].sort(),
    )
    expect(getProject('sri-sai-manikanta-welding-works')?.label).toBe('Independent Website Project')
    expect(getProject('arc-architects-interiors')?.label).toBe('Independent Website Project')
    for (const p of websiteProjects) expect(p.contribution).toMatch(/AI-assisted/)
  })
})

describe('content guardrails', () => {
  const srcFiles = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d): string[] => (d.isDirectory() ? srcFiles(join(dir, d.name)) : [join(dir, d.name)]))
  const allSource = srcFiles(join(__dirname, '../../src'))
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')

  it('never positions the owner as a freelancer', () => {
    expect(allSource).not.toMatch(/freelanc/i)
  })

  it('contains no fake skill percentages or fabricated success states', () => {
    expect(allSource).not.toMatch(/\d{2,3}%\s*(proficien|skill)/i)
    expect(allSource).not.toMatch(/message sent successfully/i)
  })
})

describe('employer confidentiality guardrails', () => {
  const srcFiles = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d): string[] => (d.isDirectory() ? srcFiles(join(dir, d.name)) : [join(dir, d.name)]))
  const allSource = [...srcFiles(join(__dirname, '../../src')), join(__dirname, '../../index.html')]
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')

  it('contains no architecture, delivery-guarantee or data-flow wording', () => {
    for (const phrase of [/at-least-once/i, /exactly-once/i, /idempotent writes/i, /ingestion api/i, /edge workers/i, /downstream consumers/i, /stream → store/i, /event-pipeline/i, /video analytics/i])
      expect(allSource, String(phrase)).not.toMatch(phrase)
  })
})

describe('removed GitHub showcase regression', () => {
  // Public surface: everything that ships to visitors.
  const files = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d): string[] => (d.isDirectory() ? files(join(dir, d.name)) : [join(dir, d.name)]))
  const publicText = [...files(join(__dirname, '../../src')), ...files(join(__dirname, '../../public')).filter((f) => /\.(txt|svg|html|json|xml)$|_headers$/.test(f)), join(__dirname, '../../index.html')]
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')

  it('does not reintroduce early learning projects, repositories or repo trees', () => {
    for (const term of [
      /clickhouse/i,
      /Event Analytics Ingestion/i,
      /Todo REST API/i,
      /Cricket Team API/i,
      /IPL Dashboard|IplDashboard/i,
      /crud-reactive/i,
      /code-with-quarkus/i,
      /Public code on GitHub/i,
      /Featured engineering projects/i,
      /repository structure/i,
      /RepoTree|EngineeringCard|EngineeringProjects/,
      /github\.com\/SatyaMahesh889\/[A-Za-z]/,
    ])
      expect(publicText, String(term)).not.toMatch(term)
  })

  it('keeps internal review and security-incident notes out of the public site', () => {
    for (const term of [/gitleaks|trufflehog/i, /rotate (the )?(database )?credentials/i, /secret scanning/i, /exposed (database )?credential/i])
      expect(publicText, String(term)).not.toMatch(term)
  })
})
