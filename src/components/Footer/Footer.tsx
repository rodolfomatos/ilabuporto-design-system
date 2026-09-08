import { ReactNode } from 'react'
import { cn } from '../../cn'
import { LOGO_UP_DIGITAL } from '../../assets'

export interface FooterLink {
  label: ReactNode
  href: string
  onClick?: () => void
}

export interface FooterColumn {
  key: string
  title?: ReactNode
  links?: FooterLink[]
  content?: ReactNode
}

export interface FooterProps {
  logo?: ReactNode
  columns?: FooterColumn[]
  copyright?: ReactNode
  className?: string
}

export function Footer({ logo, columns, copyright, className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'bg-black dark:bg-gray-950 border-t border-white/10 dark:border-gray-800 text-white dark:text-gray-300',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            {logo ?? <img src={LOGO_UP_DIGITAL} alt="UPdigital" className="h-8 w-auto mb-4 brightness-0 invert" width={601} height={115} />}
            <p className="text-sm leading-relaxed text-white/70 dark:text-gray-400">
              {copyright ?? (
                <>
                  UPdigital &mdash; Universidade do Porto Digital &copy; {currentYear}.
                </>
              )}
            </p>
          </div>

          {columns?.map((col) => (
            <div key={col.key}>
              {col.title && (
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-white/80 dark:text-gray-100">
                  {col.title}
                </h3>
              )}
              {col.content}
              {col.links && (
                <ul className="space-y-2 text-sm text-white/70 dark:text-gray-400">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        onClick={(e) => { if (!link.href) e.preventDefault(); link.onClick?.() }}
                        className="hover:underline underline-offset-2"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
