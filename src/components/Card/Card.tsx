import { cn } from '../../cn'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'error' | 'warning'
}

const variantBorderStyles = {
  default: 'border-gray-200 dark:border-gray-800',
  success: 'border-green-200 dark:border-green-800',
  error: 'border-red-200 dark:border-red-800',
  warning: 'border-yellow-200 dark:border-yellow-800',
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-lg border p-4',
        variantBorderStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
