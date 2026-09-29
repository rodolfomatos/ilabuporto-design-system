import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  /** id of the element describing the dialog, for aria-describedby. */
  describedById?: string
  /**
   * id of the element to focus on open. Defaults to the first focusable descendant.
   * A confirmation dialog must focus its safe action, not its close button.
   */
  initialFocusId?: string
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  describedById,
  initialFocusId,
}: ModalProps) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true))
    } else {
      const timer = setTimeout(() => setVisible(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Focus is moved on `visible`, not `isOpen`: the panel is not in the DOM until the
  // animation has run, so an effect keyed on isOpen would have nothing to focus.
  useEffect(() => {
    if (!visible) return

    restoreFocusTo.current = document.activeElement as HTMLElement | null
    // autoFocus is not reliable here: the panel is mounted by a rAF, and the effect
    // below runs afterwards and would override it. The caller names the target instead.
    const preferred = initialFocusId
      ? panelRef.current?.querySelector<HTMLElement>(`#${CSS.escape(initialFocusId)}`)
      : null
    const first = preferred ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panelRef.current)?.focus()

    return () => {
      // Restore focus to whatever opened the dialog, so a keyboard user is not dumped
      // back at the top of the document.
      restoreFocusTo.current?.focus?.()
    }
  }, [visible, initialFocusId])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      // Focus trap. Scoped to the panel and a no-op when it holds nothing focusable,
      // so it can never trap a user inside a dialog they cannot leave.
      const panel = panelRef.current
      if (!panel) return
      // The FOCUSABLE selector already excludes [disabled] and [tabindex="-1"].
      // A layout check (offsetParent / getClientRects) was tried here and removed:
      // jsdom has no layout engine, so offsetParent is always null and the filter
      // silently reduced to a single element, making Tab a no-op. A trap whose
      // behaviour depends on layout is a trap that cannot be tested.
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

      // Position is derived from the FOCUSED element rather than by comparing it to
      // first/last. The earlier version assumed activeElement would be exactly `last`
      // when Tab fired. It is not always -- and when it was not, the trap let focus
      // escape the dialog, the browser wrapped back to the start, and Tab appeared to
      // do nothing at all.
      const index = current ? items.indexOf(current) : -1
      if (index === -1) {
        // Focus is outside the item set (or on the panel): pull it back in.
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }
      const nextIndex = event.shiftKey
        ? (index - 1 + items.length) % items.length
        : (index + 1) % items.length
      event.preventDefault()
      items[nextIndex].focus()
    },
    [onClose],
  )

  if (!visible) return null

  return (
    <div className={cn('fixed inset-0 z-50 overflow-y-auto', !isOpen && 'opacity-0')}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={describedById}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className={cn(
            'relative w-full max-w-lg transform rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all',
            className
          )}
        >
          <div className="flex items-start justify-between gap-4">
            {title && (
              <h3 id={titleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {title}
              </h3>
            )}
            {/* A visible close control. Before this the only ways out were Escape and a
                backdrop click, so a user who did not know the convention had no visible
                exit at all. */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1 -mt-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
