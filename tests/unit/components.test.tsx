import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Header } from '../../src/components/Header'
import ProjectPage from '../../src/pages/ProjectPage'
import { Skills } from '../../src/sections/Skills'
import { WebsiteProjects } from '../../src/sections/WebsiteProjects'
import { renderWithProviders } from './utils'

describe('Skills tabs', () => {
  it('switches category and supports arrow-key navigation', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Skills />)
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true')
    await user.click(screen.getByRole('tab', { name: 'Streaming' }))
    expect(screen.getByRole('tab', { name: 'Streaming' })).toHaveAttribute('aria-selected', 'true')
    expect(await screen.findByRole('heading', { name: 'Event Processing & Messaging' })).toBeInTheDocument()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveFocus()
    expect(screen.getByRole('tab', { name: 'Analytics' })).toHaveAttribute('aria-selected', 'true')
  })
})

describe('Website projects', () => {
  it('renders each project with a screenshot, case study and live demo', () => {
    renderWithProviders(<WebsiteProjects />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'DSR Charitable Hospitals' })).toHaveAttribute('href', '/projects/dsr-charitable-hospitals')
    expect(screen.getByText('Independent redesign concept — not an official hospital website.')).toBeInTheDocument()
    for (const img of screen.getAllByRole('img')) expect(img).toHaveAttribute('alt')
  })
})

describe('Project case study page', () => {
  it('renders all case-study sections', () => {
    renderWithProviders(<ProjectPage />, { route: '/projects/sri-sai-manikanta-welding-works', path: '/projects/:slug' })
    expect(screen.getByRole('heading', { level: 1, name: 'Sri Sai Manikanta Welding Works' })).toBeInTheDocument()
    for (const h of ['Introduction', 'Objective', 'My role', 'Development approach', 'Key features', 'Technologies', 'Screenshots', 'Challenges & learning', 'Links'])
      expect(screen.getByRole('heading', { name: new RegExp(h) })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Related projects' })).toBeInTheDocument()
    expect(document.title).toMatch(/Sri Sai Manikanta Welding Works/)
  })

  it('shows a not-found page for unknown slugs', () => {
    renderWithProviders(<ProjectPage />, { route: '/projects/nope', path: '/projects/:slug' })
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})

describe('Header', () => {
  it('toggles the mobile menu and closes on Escape', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    const button = screen.getByRole('button', { name: 'Open menu' })
    await user.click(button)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('has a theme toggle', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)
    await user.click(screen.getByRole('button', { name: /switch to light theme/i }))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument()
  })
})
