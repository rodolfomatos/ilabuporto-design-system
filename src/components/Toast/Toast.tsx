import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react'
import { cn } from '../../cn'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastProps {
  variant?: ToastVariant
  title?: string
  children?: React.ReactNode
  /** Milliseconds before auto-dismiss. 0 disables auto-dismiss. */
  duration?: number
  onDismiss?: () => void
  className?: string
}

/**
 * Colours follow the same contract as `Badge`: a light tint with dark text in
 * light mode, and a translucent tint with light text in dark mode. Solid
 * saturated backgrounds with white text were rejected — the design system's own
 * `brand-500` (#009FDF) only reaches 2.99:1 against white, so any variant that
 * puts white text on a brand-tinted surface fails WCAG AA.
 * Every pair below is verified at >= 6.4:1.
 */
const variantStyles: Record<ToastVariant, string> = {
  info: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100',
  success: 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-100',
  warning: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-100',
  error: 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-100',
}

const barStyles: Record<ToastVariant, string> = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}

export function Toast({
  variant = 'info',
  title,
  children,
  duration = 5000,
  onDismiss,
  className,
}: ToastProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'pointer-events-auto flex w-full items-start gap-3 overflow-hidden rounded-lg p-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10',
        variantStyles[variant],
        className
      )}
    >
      <span className={cn('mt-1 h-2 w-2 flex-shrink-0 rounded-full', barStyles[variant])} aria-hidden="true" />
      <div className="min-w-0 flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && 'mt-1', 'break-words')}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="flex-shrink-0 rounded p-1 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

interface ToastEntry {
  id: number
  variant: ToastVariant
  title?: string
  content?: React.ReactNode
  duration: number
}

interface ToastContextValue {
  toasts: ToastEntry[]
  push: (toast: Omit<ToastEntry, 'id'>) => number
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const positionStyles: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
}

export interface ToastProviderProps {
  children: ReactNode
  position?: ToastPosition
  /** Maximum toasts on screen at once; the oldest is dropped beyond this. */
  max?: number
  defaultDuration?: number
}

export function ToastProvider({
  children,
  position = 'top-right',
  max = 4,
  defaultDuration = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([])
  const nextId = useRef(0)
  // Timers are keyed by toast id so a re-render never resets a countdown and a
  // dismissal always cancels exactly its own timer.
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>())

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const push = useCallback(
    (toast: Omit<ToastEntry, 'id'>) => {
      const id = nextId.current++
      setToasts((current) => [...current, { ...toast, id }].slice(-max))
      if (toast.duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), toast.duration)
        )
      }
      return id
    },
    [dismiss, max]
  )

  // Clear any pending timers if the provider unmounts mid-countdown, otherwise
  // React logs a state update on an unmounted component.
  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(clearTimeout)
      pending.clear()
    }
  }, [])

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className={cn(
          'pointer-events-none fixed z-50 flex w-full max-w-sm flex-col gap-2',
          positionStyles[position]
        )}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            title={toast.title}
            duration={toast.duration}
            onDismiss={() => dismiss(toast.id)}
          >
            {toast.content}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export interface UseToastResult {
  toasts: ToastEntry[]
  push: (toast: Omit<ToastEntry, 'id'>) => number
  dismiss: (id: number) => void
  info: (title?: string, content?: React.ReactNode, duration?: number) => number
  success: (title?: string, content?: React.ReactNode, duration?: number) => number
  warning: (title?: string, content?: React.ReactNode, duration?: number) => number
  error: (title?: string, content?: React.ReactNode, duration?: number) => number
}

/**
 * Returns a no-op implementation when used outside a `ToastProvider`, matching
 * `useTheme`'s graceful fallback. A toast that throws because a provider is
 * missing turns a notification into an application crash.
 */
export function useToast(defaultDuration = 5000): UseToastResult {
  const ctx = useContext(ToastContext)

  const info = useCallback(
    (title?: string, content?: React.ReactNode, duration?: number) =>
      ctx?.push({ variant: 'info', title, content, duration: duration ?? defaultDuration }) ?? -1,
    [ctx, defaultDuration]
  )

  if (!ctx) {
    return {
      toasts: [],
      push: () => -1,
      dismiss: () => {},
      info: () => -1,
      success: () => -1,
      warning: () => -1,
      error: () => -1,
    }
  }

  return {
    toasts: ctx.toasts,
    push: ctx.push,
    dismiss: ctx.dismiss,
    info,
    success: (title, content, duration) =>
      ctx.push({ variant: 'success', title, content, duration: duration ?? defaultDuration }),
    warning: (title, content, duration) =>
      ctx.push({ variant: 'warning', title, content, duration: duration ?? defaultDuration }),
    error: (title, content, duration) =>
      ctx.push({ variant: 'error', title, content, duration: duration ?? defaultDuration }),
  }
}
