import type { ProjectImage } from '../lib/types'
import { cn } from '../lib/cn'

interface Props {
  image: ProjectImage
  url?: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  srcSet?: string
}

/** Screenshot presented inside minimal browser chrome. */
export function BrowserFrame({ image, url, className, imgClassName, priority, sizes, srcSet }: Props) {
  const host = url ? new URL(url).host : undefined
  return (
    <figure className={cn('min-w-0 overflow-hidden rounded-xl border border-line bg-bg-elevated shadow-card', className)}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-fg-subtle/30" />
          <span className="size-2.5 rounded-full bg-fg-subtle/30" />
          <span className="size-2.5 rounded-full bg-fg-subtle/30" />
        </span>
        {host && (
          <span className="mx-auto min-w-0 max-w-[70%] truncate rounded-md bg-surface-strong px-3 py-0.5 font-mono text-[10px] text-fg-subtle">
            {host}
          </span>
        )}
      </div>
      <div className="overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          sizes={sizes}
          srcSet={srcSet}
          className={cn('block h-auto w-full', imgClassName)}
        />
      </div>
    </figure>
  )
}
