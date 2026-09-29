import { cn } from '../../cn'
import { useRef } from 'react'

interface Tab {
  key: string
  label: string
  /** Optional id of the tabpanel this tab controls. */
  panelId?: string
}

interface TabsProps {
  tabs: Tab[]
  activeKey: string
  onChange: (key: string) => void
  className?: string
}

export function Tabs({ tabs, activeKey, onChange, className }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null)

  // WAI-ARIA tab pattern: arrow keys move between tabs and wrap. Previously there was
  // no role, no aria-selected and no arrow handling, so a keyboard user had to Tab
  // through every tab to reach the last one, and a screen reader could not tell which
  // tab was current at all -- the state was carried only by a CSS border colour.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    // Movement is relative to the FOCUSED tab, not the activeKey prop. In a controlled
    // component the parent may not have re-rendered yet, so deriving from activeKey
    // would compute ArrowLeft from stale state and jump to the wrong tab.
    const focused = (document.activeElement as HTMLElement | null)?.getAttribute('data-key')
    const origin = focused ?? activeKey
    const index = tabs.findIndex((t) => t.key === origin)
    if (index < 0) return
    event.preventDefault()

    let next: number
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % tabs.length
        break
      case 'ArrowLeft':
        next = (index - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        next = 0
        break
      default:
        next = tabs.length - 1
    }
    const target = tabs[next]
    onChange(target.key)
    // Roving tabindex: move DOM focus with the selection.
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    buttons?.[next]?.focus()
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={onKeyDown}
      className={cn('flex border-b border-gray-200 dark:border-gray-800', className)}
    >
      {tabs.map((tab) => {
        const selected = activeKey === tab.key
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            data-key={tab.key}
            aria-selected={selected}
            aria-controls={tab.panelId}
            // Roving tabindex: only the selected tab is in the tab sequence.
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.key)}
            className={cn(
              'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              selected
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
