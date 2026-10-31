import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Contact } from '../../src/sections/Contact'
import { Resume } from '../../src/sections/Resume'
import { renderWithProviders } from './utils'

const base = { email: undefined, whatsapp: undefined, resumeUrl: undefined, formEndpoint: undefined, siteUrl: undefined }

async function fillAndSubmit() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Name'), 'Recruiter')
  await user.type(screen.getByLabelText('Email'), 'recruiter@example.com')
  await user.type(screen.getByLabelText('Message'), 'Hello, I would like to talk about a role.')
  await user.click(screen.getByRole('button', { name: /send message/i }))
}

describe('Contact', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('shows the required heading and verified links', () => {
    renderWithProviders(<Contact config={base} />)
    expect(screen.getByRole('heading', { name: /let’s build something meaningful/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/satya-mahesh-indugula93921/')
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/SatyaMahesh889')
  })

  it('hides email/WhatsApp and the form when they are not configured', () => {
    renderWithProviders(<Contact config={base} />)
    expect(screen.queryByRole('link', { name: /email/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
    expect(screen.getByTestId('form-unconfigured')).toHaveTextContent(/not connected yet/i)
  })

  it('shows configured channels', () => {
    renderWithProviders(<Contact config={{ ...base, email: 'me@example.com', whatsapp: '919999999999' }} />)
    expect(screen.getByRole('link', { name: 'Send an email' })).toHaveAttribute('href', 'mailto:me@example.com')
    expect(screen.getByRole('link', { name: 'me@example.com' })).toHaveAttribute('href', 'mailto:me@example.com')
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', 'https://wa.me/919999999999')
  })

  it('uses the public email by default and copies it', async () => {
    const user = userEvent.setup() // installs its own clipboard stub, so mock after this
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderWithProviders(<Contact />)
    expect(screen.getByRole('link', { name: 'maheshindugula@gmail.com' })).toHaveAttribute('href', 'mailto:maheshindugula@gmail.com')
    await user.click(screen.getByRole('button', { name: 'Copy email address' }))
    expect(writeText).toHaveBeenCalledWith('maheshindugula@gmail.com')
    expect(await screen.findByText('Copied')).toBeInTheDocument()
  })

  it('reports a failed copy honestly', async () => {
    const user = userEvent.setup()
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) }, configurable: true })
    renderWithProviders(<Contact />)
    await user.click(screen.getByRole('button', { name: 'Copy email address' }))
    expect(await screen.findByText('Copy failed')).toBeInTheDocument()
  })

  it('reports success only after the endpoint confirms delivery', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 })
    vi.stubGlobal('fetch', fetchMock)
    renderWithProviders(<Contact config={{ ...base, formEndpoint: 'https://forms.example.com/f/abc' }} />)
    await fillAndSubmit()
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/message delivered/i))
    expect(fetchMock).toHaveBeenCalledWith('https://forms.example.com/f/abc', expect.objectContaining({ method: 'POST' }))
  })

  it('shows an error, never success, when delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
    renderWithProviders(<Contact config={{ ...base, formEndpoint: 'https://forms.example.com/f/abc' }} />)
    await fillAndSubmit()
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/could not be delivered/i))
    expect(screen.getByRole('status')).not.toHaveTextContent(/delivered\. thank/i)
  })
})

describe('Resume', () => {
  it('offers a LinkedIn request when no resume is published', () => {
    renderWithProviders(<Resume resumeUrl={undefined} />)
    expect(screen.queryByRole('link', { name: /download resume/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /request via linkedin/i })).toBeInTheDocument()
  })

  it('offers a download when a resume URL is configured', () => {
    renderWithProviders(<Resume resumeUrl="/resume/cv.pdf" />)
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute('href', '/resume/cv.pdf')
  })
})
