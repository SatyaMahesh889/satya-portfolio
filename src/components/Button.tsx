import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { buttonClasses, type Variant } from '../lib/button'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  variant?: Variant
  children: ReactNode
  external?: boolean
}

/** Link styled as a button. Uses the router for internal routes and <a> for external/hash links. */
export function ButtonLink({ to, variant = 'primary', external, className, children, ...rest }: Props) {
  const classes = buttonClasses(variant, className)
  if (external || to.startsWith('http') || to.startsWith('mailto:')) {
    return (
      <a href={to} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  if (to.startsWith('#')) {
    return (
      <a href={to} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={classes} {...rest}>
      {children}
    </Link>
  )
}

