import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react'

interface ThemeContextValue {
  dark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const listeners = new Set<() => void>()
let cachedDark = false
let observer: MutationObserver | null = null

const isDark = (): boolean =>
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('dark')

const getSnapshot = (): boolean => cachedDark

function subscribe(callback: () => void): () => void {
  cachedDark = isDark()

  if (!observer) {
    observer = new MutationObserver(() => {
      const next = isDark()
      if (next !== cachedDark) {
        cachedDark = next
        listeners.forEach((l) => l())
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  listeners.add(callback)
  return () => listeners.delete(callback)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, () => false)

  return <ThemeContext.Provider value={{ dark }}>{children}</ThemeContext.Provider>
}

export function useTheme(): { dark: boolean } {
  const ctx = useContext(ThemeContext)
  return ctx ?? { dark: false }
}