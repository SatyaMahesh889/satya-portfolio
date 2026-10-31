import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ecosystemCategories } from '../../src/data/ecosystem'
import { Ecosystem } from '../../src/sections/Ecosystem'
import { renderWithProviders } from './utils'

describe('Engineering Ecosystem', () => {
  it('shows the title, subtitle, five categories and the disclaimer', () => {
    renderWithProviders(<Ecosystem />)
    expect(screen.getByRole('heading', { level: 2, name: 'My Engineering Ecosystem' })).toBeInTheDocument()
    expect(screen.getByText('Technologies and engineering concepts I work with to build reliable, scalable software systems.')).toBeInTheDocument()
    expect(ecosystemCategories).toHaveLength(5)
    for (const c of ecosystemCategories) expect(screen.getByRole('button', { name: new RegExp(c.title) })).toBeInTheDocument()
    expect(screen.getByText(/Illustrative technology overview\. Technologies are presented to reflect my engineering experience/)).toBeInTheDocument()
  })

  it('represents React and AWS experience accurately', () => {
    renderWithProviders(<Ecosystem />)
    expect(screen.getByRole('list', { name: 'Frontend Development technologies' })).toHaveTextContent('React· Learning projects')
    expect(screen.getByRole('list', { name: 'Database & Cloud technologies' })).toHaveTextContent('AWS· Working knowledge')
  })

  it('selecting a category shows its description and toggles pressed state', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(<Ecosystem />)
    const button = screen.getByRole('button', { name: /Messaging & Data Engineering/ })
    await user.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    const details = container.querySelector('[aria-live="polite"]')!
    await waitFor(() => expect(details).toHaveTextContent(/message brokers, stream processing/))
    await user.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('includes AI-assisted development with the confirmed tools', () => {
    renderWithProviders(<Ecosystem />)
    const ai = screen.getByRole('list', { name: 'AI-Assisted Development technologies' })
    expect(ai).toHaveTextContent('Claude')
    expect(ai).toHaveTextContent('OpenAI Codex')
  })

  it('shows the five-step engineering approach', () => {
    renderWithProviders(<Ecosystem />)
    const steps = screen.getByRole('list', { name: 'Engineering approach steps' })
    expect(steps).toHaveTextContent(/Understand.*Design.*Build.*Test.*Deliver/)
  })
})
