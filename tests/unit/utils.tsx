import { render } from '@testing-library/react'
import { domMax, LazyMotion, MotionConfig } from 'motion/react'
import type { ReactElement } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export function renderWithProviders(ui: ReactElement, { route = '/', path }: { route?: string; path?: string } = {}) {
  return render(
    <MotionConfig reducedMotion="always">
      <LazyMotion features={domMax}>
        <MemoryRouter initialEntries={[route]}>
          {path ? (
            <Routes>
              <Route path={path} element={ui} />
            </Routes>
          ) : (
            ui
          )}
        </MemoryRouter>
      </LazyMotion>
    </MotionConfig>,
  )
}
