import { ReactNode } from 'react'
import { cn } from '../../cn'
import { Card } from '../Card'

export interface ChartCardProps {
  title?: ReactNode
  subtitle?: ReactNode
  className?: string
  children: ReactNode
}

export function ChartCard({ title, subtitle, className, children }: ChartCardProps) {
  return (
    <Card className={cn(className)}>
      {(title || subtitle) && (
        <div className="mb-4 space-y-0.5">
          {title && (
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </Card>
  )
}