import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme, Language } from '@/types'

interface UIStore {
  theme: Theme
  language: Language
  setTheme: (t: Theme) => void
  setLanguage: (l: Language) => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'ko',
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      },
      setLanguage: (language) => set({ language }),
    }),
    { name: 'ow-hub:ui-settings' },
  ),
)

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'system') {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.dataset.theme = dark ? 'dark' : 'light'
  } else {
    root.dataset.theme = theme
  }
}

export function initTheme() {
  const stored = localStorage.getItem('ow-hub:ui-settings')
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as { state?: { theme?: Theme } }
      applyTheme(parsed.state?.theme ?? 'dark')
      return
    } catch {
      // ignore
    }
  }
  applyTheme('dark')
}
