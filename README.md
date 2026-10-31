# Satya Mahesh Indugula — Personal Portfolio

Source code for the personal portfolio of **Satya Mahesh Indugula**, Software Engineer | Full-Stack Developer | Digital Solutions.

The site covers my engineering experience and technology ecosystem, my approach to AI-assisted development, three independent website projects with case studies, and **ismool**, my separate independent initiative. It is a static single-page app with pre-rendered case-study routes, deployed on Cloudflare Pages.

## Technology stack

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript, React Router 7 |
| Styling and motion | Tailwind CSS 4, Motion for React, Lucide icons, self-hosted Inter and JetBrains Mono (Fontsource) |
| Build | Vite 8, plus a post-build script (`scripts/postbuild.ts`) that writes per-route HTML, `404.html`, `robots.txt` and `sitemap.xml` |
| Quality | oxlint, Vitest and React Testing Library, Playwright with axe-core accessibility checks |
| Hosting | Cloudflare Pages (static output, security headers in `public/_headers`) |

There is no backend, no database and no tracking.

## Installation

Requires **Node.js 22.23.3**, which is pinned in `.nvmrc`. The minimum is 22.22.2; Node 24.15+ or 26+ also work.

```bash
nvm use            # or install Node 22.23.3 another way
npm ci             # installs exactly what package-lock.json specifies
```

## Local development

```bash
npm run dev        # http://localhost:5173 with hot reload
```

All site copy lives in `src/data/` (profile, experience, skills, ecosystem, AI section, projects, links, navigation), so routine content updates need no component changes.

Optional details are read from environment variables at build time. Copy `.env.example` to `.env.local` to try them locally. Every value is optional, and nothing is displayed until a value is provided.

## Build and test

| Command | What it does |
| --- | --- |
| `npm run build` | Type-check, production build to `dist/`, then the post-build script |
| `npm run preview` | Serve the production build at http://localhost:4173 |
| `npm run typecheck` | TypeScript across the app, tests and Node configs |
| `npm run lint` | oxlint, with warnings treated as errors |
| `npm test` | Unit and component tests |
| `npm run test:e2e` | Playwright end-to-end and accessibility tests on desktop and mobile. Run `npm run build` first, and run `npx playwright install chromium` once beforehand. |
| `npm run check` | Typecheck, lint, unit tests and build |

The end-to-end tests cover every route (including direct visits to the case studies and a real 404), the contact links, light and dark themes, reduced motion, and layout down to a 320px-wide viewport.

## Deploying to Cloudflare Pages

Connect this repository to Cloudflare Pages with Git integration (**Workers & Pages → Create application → Pages → Connect to Git**) and use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=22.23.3` |
| Environment variable | `VITE_SITE_URL=<production origin>`, for example `https://satya-personal-portfolio.pages.dev`. This enables canonical URLs, `og:url` and the sitemap. |

Every push to `main` triggers a production deployment, and other branches and pull requests get preview URLs. `VITE_*` values are compiled into the client bundle, so they must never hold secrets. See [DEPLOYMENT.md](DEPLOYMENT.md) for routing, optional variables and custom domains.

## Project structure

```
src/
  components/   Reusable UI (header, footer, cards, browser frame, contact form…)
  sections/     Home page sections
  pages/        Home, case-study page, not-found page
  data/         Editable content
  hooks/        Theme, active section, page metadata
  lib/          Types, motion presets, SEO helpers
  styles/       Tailwind entry and design tokens (dark and light)
public/
  projects/     Screenshots captured from the live project sites
scripts/        Post-build route generation
tests/          unit/ (Vitest) and e2e/ (Playwright)
```

## GitHub project showcase policy

This portfolio does not display individual GitHub repositories, source-code previews, repository structures, or project cards built from early learning repositories. GitHub appears only as a profile link. The Engineering Ecosystem, Experience and What I Build sections describe capabilities instead.

A personal project may be added in future only if it is independently developed and production quality, and only after its functionality, documentation, technology stack, screenshots and publication safety have been verified. Publication safety means no employer-owned code, confidential implementation details, credentials or private information. Repositories are never imported automatically, and a unit test fails if a link to an individual repository appears in the site.

## Content notes

- The website projects are independent work. The DSR Charitable Hospitals project is an independent redesign concept, not an official hospital website, and is labelled that way on the site.
- Technology descriptions reflect general engineering experience. They do not describe any employer's systems, architecture or code.
