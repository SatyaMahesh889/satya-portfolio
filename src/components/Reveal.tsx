import { m, type HTMLMotionProps } from 'motion/react'
import { fadeUp, inView, stagger } from '../lib/motion'

/** Fades children up when scrolled into view. Reduced motion is handled globally by <MotionConfig>. */
export function Reveal({ children, delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </m.div>
  )
}

/** Container that staggers <RevealItem> children. */
export function RevealGroup({ children, gap = 0.08, ...props }: HTMLMotionProps<'div'> & { gap?: number }) {
  return (
    <m.div initial="hidden" whileInView="show" viewport={inView} variants={stagger(gap)} {...props}>
      {children}
    </m.div>
  )
}

export function RevealItem({ children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <m.div variants={fadeUp} {...props}>
      {children}
    </m.div>
  )
}
