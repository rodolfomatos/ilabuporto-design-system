import React from 'react'
import { cn } from '../../cn'

export interface SegmentedOption<T extends string | number> {
  value: T
  label: React.ReactNode
}

export interface SegmentedControlProps<T extends string | number> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  ariaLabel?: string
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  className,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-0.5 gap-0.5',
        className
      )}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'px-3 py-1 text-sm rounded-md transition-colors',
              active
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}