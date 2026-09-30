import { cn } from '../../cn'
import { ReactNode, useEffect, useId, useRef } from 'react'

interface SlideInPanelProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function SlideInPanel({ isOpen, onClose, title, children, className }: SlideInPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    restoreFocusTo.current = document.activeElement as HTMLElement | null
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panelRef.current)?.focus()
    return () => {
      document.body.style.overflow = ''
      restoreFocusTo.current?.focus?.()
    }
  }, [isOpen])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key !== 'Tab') return

    // Trap scoped to the panel, and a no-op when it holds nothing focusable, so it can
    // never lock a keyboard user inside a panel they cannot leave.
    const panel = panelRef.current
    if (!panel) return
    // See Modal: the FOCUSABLE selector excludes [disabled]; the layout check that was
    // here (offsetParent) was removed because jsdom reports it as always null, which
    // reduced the trap to a single element and made Tab a no-op.
    const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true',
    )
    if (items.length === 0) {
      event.preventDefault()
      panel.focus()
      return
    }
    const first = items[0]
    const last = items[items.length - 1]
    const current = document.activeElement as HTMLElement | null

    // Derived from the focused element, not by comparing it to first/last: the earlier
    // version assumed activeElement would be exactly `last` when Tab fired, and when it
    // was not the trap let focus escape and Tab appeared to do nothing.
    const index = current ? items.indexOf(current) : -1
    if (index === -1) {
      event.preventDefault()
      ;(event.shiftKey ? last : first).focus()
      return
    }
    const nextIndex = event.shiftKey
      ? (index - 1 + items.length) % items.length
      : (index + 1) % items.length
    event.preventDefault()
    items[nextIndex].focus()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={cn(
          'absolute right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
          {title && (
            <h2 id={titleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          )}
          {/* The close button used to live inside the title block, so a panel without a
              title had no way to close at all. It also had no accessible name: it
              wrapped an <svg> and was invisible to any name-based query. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
