import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { EngineeringMeetsAI } from '../../src/sections/EngineeringMeetsAI'
import { WhatIBuild } from '../../src/sections/WhatIBuild'
import { renderWithProviders } from './utils'

describe('Engineering Meets AI', () => {
  it('renders the heading, highlight and all five capabilities', () => {
    renderWithProviders(<EngineeringMeetsAI />)
    expect(screen.getByRole('heading', { level: 2, name: 'Engineering Meets AI.' })).toBeInTheDocument()
    expect(screen.getByText(/faster development through engineering expertise and AI-assisted workflows/)).toBeInTheDocument()
    for (const t of ['Rapid Prototyping', 'Full-Stack Development', 'AI-Assisted Implementation', 'Code Review & Refinement', 'Testing & Delivery'])
      expect(screen.getByRole('button', { name: new RegExp(t) })).toBeInTheDocument()
  })

  it('makes clear the engineer owns the work, not the AI', async () => {
    const user = userEvent.setup()
    renderWithProviders(<EngineeringMeetsAI />)
    expect(screen.getByText(/personally handling requirements, engineering decisions, code review, testing, debugging and delivery/)).toBeInTheDocument()
    const review = screen.getByRole('button', { name: /Code Review & Refinement/ })
    await user.click(review)
    expect(review).toHaveAttribute('aria-expanded', 'true')
    expect(await screen.findByText('Review every change before it is accepted')).toBeInTheDocument()
  })

  it('makes no fixed-time delivery promises', () => {
    const { container } = renderWithProviders(<EngineeringMeetsAI />)
    expect(container.textContent).not.toMatch(/\b\d+\s*(hours?|days?|weeks?)\b/i)
  })
})

describe('What I Build', () => {
  it('lists the seven build areas', () => {
    renderWithProviders(<WhatIBuild />)
    for (const t of ['Backend Systems & APIs', 'Full-Stack Web Applications', 'Responsive Business Websites', 'Interactive User Interfaces', 'Data Processing & Analytics', 'Automation & Integrations', 'AI-Assisted Rapid Prototyping'])
      expect(screen.getByRole('heading', { name: t })).toBeInTheDocument()
  })
})
