import { cn } from '../../cn'
import { ReactNode } from 'react'

export interface BrandProps {
  /** App name displayed next to the logo */
  name?: ReactNode
  /** Hide the separator between logo and name */
  hideSeparator?: boolean
  /** Use footer sizing (larger logo, block layout) */
  footer?: boolean
  /** Additional classes for the outer element */
  className?: string
  /** Click handler (makes the brand a link) */
  href?: string
}

export function Brand({ name, hideSeparator = false, footer = false, className, href }: BrandProps) {
  const img = (
    <img
      alt="UPdigital"
      src="/assets/images/logo_updigital_h_black.png"
      className={cn(
        'w-auto brightness-0 invert',
        footer ? 'h-8' : 'h-5 sm:h-7'
      )}
    />
  )

  const inner = footer ? (
    <div className={cn('flex flex-col', className)}>
      {img}
      {name && (
        <p className="text-sm leading-relaxed text-white/70 dark:text-gray-400 mt-4">
          {name}
        </p>
      )}
    </div>
  ) : (
    <div className={cn('flex items-center min-w-0', className)}>
      {href ? <a href={href} className="flex items-center min-w-0">{img}</a> : img}
      {!hideSeparator && name && (
        <span className="mx-2 text-white/50">|</span>
      )}
      {name && (
        <span className="text-base sm:text-lg font-semibold truncate">{name}</span>
      )}
    </div>
  )

  return inner
}
