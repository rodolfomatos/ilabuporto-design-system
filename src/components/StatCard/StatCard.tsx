import { ReactNode } from 'react'
import { cn } from '../../cn'
import { Card } from '../Card'

export interface StatCardProps {
  label: ReactNode
  value: ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning'
  className?: string
}

const valueStyles = {
  default: 'text-gray-900 dark:text-gray-100',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
}

const labelStyles = {
  default: 'text-gray-500 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
}

const cardVariant = {
  default: 'default',
  success: 'success',
  error: 'error',
  warning: 'warning',
} as const

export function StatCard({ label, value, variant = 'default', className }: StatCardProps) {
  return (
    <Card variant={cardVariant[variant]} className={className}>
      <p className={cn('text-sm', labelStyles[variant])}>{label}</p>
      <p className={cn('text-2xl font-bold mt-1', valueStyles[variant])}>{value}</p>
    </Card>
  )
}
