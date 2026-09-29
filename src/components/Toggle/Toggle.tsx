import { cn } from '../../cn'
import { useId } from 'react'

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label?: string
  disabled?: boolean
}

export function Toggle({ enabled, onChange, label, disabled }: ToggleProps) {
  const labelId = useId()

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        // The label was a sibling <span>, unassociated, so the switch was announced as
        // "switch, off" with no indication of what it controlled (WCAG 4.1.2).
        // It is now the accessible name via aria-labelledby.
        aria-labelledby={label ? labelId : undefined}
        disabled={disabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {/* Decorative knob: without aria-hidden it can leak into the accessible name. */}
        <span
          aria-hidden="true"
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform mt-1',
            enabled ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      {label && (
        <span id={labelId} className="text-sm text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </div>
  )
}
