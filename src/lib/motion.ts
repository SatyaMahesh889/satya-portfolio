import type { Transition, Variants } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 380, damping: 32 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
