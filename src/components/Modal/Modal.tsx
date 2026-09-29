import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
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
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panelRef.current)?.focus()

    return () => {
      // Restore focus to whatever opened the dialog, so a keyboard user is not dumped
      // back at the top of the document.
      restoreFocusTo.current?.focus?.()
    }
  }, [visible])

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
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (items.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
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
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className={cn(
            'relative w-full max-w-lg transform rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all',
            className
          )}
        >
          {title && (
            <h3 id={titleId} className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {title}
            </h3>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
