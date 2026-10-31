import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const caseStudies = ['sri-sai-manikanta-welding-works', 'arc-architects-interiors', 'dsr-charitable-hospitals', 'ismool']

const removedRoutes = ['event-analytics-service', 'spring-boot-todo-api', 'cricket-team-jpa-api', 'ipl-dashboard']

function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  return errors
}

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
  })
}

test('home renders all sections without errors or horizontal overflow', async ({ page }) => {
  const errors = trackErrors(page)
  await page.goto('/')
  await expect(page).toHaveTitle('Satya Mahesh Indugula | Software Engineer & Full-Stack Developer')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Building Scalable Systems')
  for (const id of ['about', 'ecosystem', 'experience', 'skills', 'what-i-build', 'ai-assisted', 'projects', 'ismool', 'resume', 'contact'])
    await expect(page.locator(`section#${id}`)).toBeAttached()
  await scrollThrough(page)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(0)
  expect(errors).toEqual([])
})

// html uses overflow-x: clip, so scrollWidth alone cannot reveal clipped content.
// Reduced motion measures the settled layout, not mid-entrance x offsets.
test('content fits a 320px viewport on every page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 320, height: 720 })
  for (const route of ['/', ...caseStudies.map((s) => `/projects/${s}`)]) {
    await page.goto(route)
    const widest = await page.evaluate(() => Math.max(...[...document.querySelectorAll('main p, main h1, main h2, main figure')].map((el) => el.getBoundingClientRect().right)))
    expect(widest, route).toBeLessThanOrEqual(320)
  }
})

test('primary CTA scrolls to projects and nav links update the hash', async ({ page, isMobile }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Explore My Work' }).click()
  await expect(page.locator('#projects-title')).toBeInViewport()
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: /Contact/ }).click()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
  } else {
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click()
  }
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.locator('#contact-title')).toBeInViewport()
})

test('theme toggle switches and persists across reloads', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('website card opens its case study and back link returns home', async ({ page }) => {
  await page.goto('/#projects')
  await page.getByRole('link', { name: 'ARC Architects & Interiors', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/arc-architects-interiors$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ARC Architects & Interiors')
  await expect(page).toHaveTitle(/ARC Architects & Interiors: Case Study/)
  await page.getByRole('link', { name: 'Back to portfolio' }).click()
  await expect(page).toHaveURL(/\/#projects$/)
})

for (const slug of caseStudies) {
  test(`case study /projects/${slug} loads directly with route metadata`, async ({ page }) => {
    const errors = trackErrors(page)
    const res = await page.goto(`/projects/${slug}`)
    expect(res?.status()).toBe(200)
    const html = await res!.text()
    expect(html).toMatch(/<title>[^<]*Case Study \| Satya Mahesh Indugula<\/title>/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Related projects/ })).toBeAttached()
    await scrollThrough(page)
    for (const img of await page.locator('main img').all()) {
      await img.scrollIntoViewIfNeeded()
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    }
    expect(errors).toEqual([])
  })
}

test('projects section shows exactly the three website projects', async ({ page }) => {
  await page.goto('/#projects')
  await expect(page.getByRole('heading', { level: 2, name: 'Selected Website Projects.' })).toBeVisible()
  const cards = page.locator('#projects article')
  await expect(cards).toHaveCount(3)
  for (const name of ['Sri Sai Manikanta Welding Works', 'ARC Architects & Interiors', 'DSR Charitable Hospitals'])
    await expect(page.locator('#projects').getByRole('link', { name, exact: true })).toBeVisible()
  await expect(page.locator('#projects').getByText('Independent Website Project')).toHaveCount(2)
  for (const href of [
    'https://ssm-welding-works.ismool.workers.dev/',
    'https://arc-architects-interiors.ismool.workers.dev/',
    'https://dsr-charitable-hospitals.ismool.workers.dev/',
  ])
    await expect(page.locator(`#projects a[href="${href}"]`)).toHaveCount(1)
})

test('navigation has a single Projects link and unique section ids', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop navigation')
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Primary' })
  await expect(nav.getByRole('link', { name: 'Websites' })).toHaveCount(0)
  await nav.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('#projects-title')).toBeInViewport()
  const ids = await page.evaluate(() => [...document.querySelectorAll('[id]')].map((e) => e.id))
  expect(new Set(ids).size).toBe(ids.length)
})

test('early GitHub learning projects are gone', async ({ page }) => {
  await page.goto('/')
  await scrollThrough(page)
  const text = await page.locator('body').innerText()
  for (const term of ['Public code on GitHub', 'Event Analytics Ingestion', 'Todo REST API', 'Cricket Team API', 'IPL Dashboard', 'crud-reactive', 'code-with-quarkus', 'repository structure'])
    expect(text).not.toContain(term)
  await expect(page.locator('a[href^="https://github.com/SatyaMahesh889/"]')).toHaveCount(0)
  await expect(page.locator('a[href="https://github.com/SatyaMahesh889"]').first()).toBeAttached()
})

for (const slug of removedRoutes) {
  test(`removed route /projects/${slug} shows not found`, async ({ page }) => {
    await page.goto(`/projects/${slug}`)
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
  })
}

test('LinkedIn and GitHub links point to the verified profiles', async ({ page }) => {
  await page.goto('/#contact')
  const contact = page.locator('#contact')
  await expect(contact.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/satya-mahesh-indugula93921/')
  await expect(contact.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/SatyaMahesh889')
})

test('DSR concept is clearly labelled as unofficial', async ({ page }) => {
  await page.goto('/projects/dsr-charitable-hospitals')
  await expect(page.getByText('Independent redesign concept — not an official hospital website.')).toBeVisible()
})

test('unconfigured contact form is not shown and no fake success exists', async ({ page }) => {
  await page.goto('/#contact')
  await expect(page.getByTestId('form-unconfigured')).toBeVisible()
  await expect(page.getByRole('button', { name: /send message/i })).toHaveCount(0)
})

test('public email is shown, links to mailto and can be copied', async ({ page, context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#contact')
  const card = page.getByTestId('email-card')
  await expect(card.getByRole('link', { name: 'maheshindugula@gmail.com' })).toHaveAttribute('href', 'mailto:maheshindugula@gmail.com')
  await expect(card.getByRole('link', { name: 'Send an email' })).toHaveAttribute('href', 'mailto:maheshindugula@gmail.com')
  const box = await card.boundingBox()
  expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()!.width)
  await card.getByRole('button', { name: 'Copy email address' }).click()
  await expect(card.getByText('Copied')).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('maheshindugula@gmail.com')
  await expect(page.locator('footer a[href="mailto:maheshindugula@gmail.com"]').first()).toBeAttached()
})

test('external links open safely in a new tab', async ({ page }) => {
  await page.goto('/')
  const external = page.locator('a[href^="http"]')
  const count = await external.count()
  expect(count).toBeGreaterThan(5)
  for (let i = 0; i < count; i++) {
    const a = external.nth(i)
    await expect(a).toHaveAttribute('target', '_blank')
    await expect(a).toHaveAttribute('rel', /noopener/)
  }
})

test('keyboard users can reach the skip link and skill tabs', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard flow checked on desktop')
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.getByRole('tab', { name: 'All' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Backend' })).toHaveAttribute('aria-selected', 'true')
})

test('reduced motion renders content without transforms', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const animation = await page.locator('.animate-float').first().evaluate((el) => getComputedStyle(el).animationName)
  expect(animation).toBe('none')
  await context.close()
})

test('unknown routes return 404 with a helpful page', async ({ page }) => {
  await page.goto('/projects/does-not-exist')
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
})

for (const theme of ['dark', 'light'] as const) {
  test(`has no serious accessibility violations (${theme})`, async ({ page }) => {
    await page.addInitScript((t) => localStorage.setItem('theme', t), theme)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await scrollThrough(page)
    await page.waitForTimeout(800)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serious.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
  })
}
