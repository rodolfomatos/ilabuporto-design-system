import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '../../cn'
import { LOGO_UP_DIGITAL } from '../../assets'

export interface NavbarLink {
  key: string
  label: ReactNode
  href?: string
  icon?: string
  onClick?: () => void
}

export interface NavbarProps {
  title?: ReactNode
  logo?: ReactNode
  backgroundColor?: string
  children?: ReactNode
  className?: string
}

export function Navbar({
  title,
  logo,
  backgroundColor = '#009FDF',
  children,
  className,
}: NavbarProps) {
  return (
    <nav
      className={cn('sticky top-0 z-50 shadow text-white', className)}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <a href="/" className="flex items-center min-w-0">
            {logo ?? <img src={LOGO_UP_DIGITAL} alt="UPdigital" className="h-5 w-auto sm:h-7 brightness-0 invert" width={120} height={30} />}
            {title && (
              <>
                <span className="mx-2 text-white/50">|</span>
                <span className="text-base sm:text-lg font-semibold truncate">{title}</span>
              </>
            )}
          </a>
          {children && <div className="flex items-center gap-1">{children}</div>}
        </div>
      </div>
    </nav>
  )
}

export interface LanguageToggleProps {
  current: string
  options: { code: string; label: string }[]
  onChange: (code: string) => void
}

export function LanguageToggle({ current, options, onChange }: LanguageToggleProps) {
  return (
    <>
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => onChange(opt.code)}
          className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
            current === opt.code ? 'bg-white/20' : 'hover:bg-white/20'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </>
  )
}

export interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  dark: boolean
  onToggle: () => void
  title?: string
}

export function ThemeToggle({ dark, onToggle, title, className, ...props }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn('p-2 rounded-lg hover:bg-black/10', className)}
      aria-label="Toggle theme"
      title={title}
      {...props}
    >
      {dark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

export interface NavbarMenuProps {
  items: NavbarLink[]
  isOpen: boolean
  onToggle: () => void
  footer?: ReactNode
  activeHref?: string
}

export function NavbarMenu({ items, isOpen, onToggle, footer, activeHref }: NavbarMenuProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 rounded-lg hover:bg-white/20"
        aria-label="Menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => { if (!item.href) e.preventDefault(); item.onClick?.() }}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                activeHref === item.href
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {item.icon && (
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              )}
              {item.label}
            </a>
          ))}
          {footer && <div className="border-t border-gray-200 dark:border-gray-700 my-1">{footer}</div>}
        </div>
      )}
    </div>
  )
}
