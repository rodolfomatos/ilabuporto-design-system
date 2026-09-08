import { ReactNode, useState } from 'react'
import { cn } from '../../cn'
import { Sidebar } from '../Sidebar'
import type { SidebarItem } from '../Sidebar'

export interface AppShellProps {
  items: SidebarItem[]
  activeKey: string
  onSelect: (key: string) => void
  title: ReactNode
  subtitle?: ReactNode
  header?: ReactNode
  sidebarHeader?: ReactNode
  backTo?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function AppShell({
  items,
  activeKey,
  onSelect,
  title,
  subtitle,
  header,
  sidebarHeader,
  backTo,
  children,
  className,
  contentClassName,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <main className={cn('min-h-screen bg-gray-50 dark:bg-gray-950 flex', className)}>
      <Sidebar
        items={items}
        activeKey={activeKey}
        onSelect={onSelect}
        header={sidebarHeader}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={cn('flex-1 p-4 md:p-8 overflow-auto', contentClassName)}>
        <div className="mb-8 flex items-start gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            aria-label="Open sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
            {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
            {backTo}
          </div>
        </div>
        {header}
        {children}
      </div>
    </main>
  )
}
