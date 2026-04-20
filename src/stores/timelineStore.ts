import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { HeroRole } from '@/types'

type RoleFilter = '' | HeroRole
type PeriodFilter = '6m' | 'all'

interface TimelineStore {
  selectedHeroes: string[]
  roleFilter: RoleFilter
  periodFilter: PeriodFilter
  setSelectedHeroes: (heroes: string[]) => void
  toggleHero: (key: string) => void
  selectAll: (allKeys: string[]) => void
  clearAll: () => void
  resetToTop5: (top5Keys: string[]) => void
  setRoleFilter: (r: RoleFilter) => void
  setPeriodFilter: (p: PeriodFilter) => void
}

export const useTimelineStore = create<TimelineStore>()(
  persist(
    (set, get) => ({
      selectedHeroes: [],
      roleFilter: '',
      periodFilter: '6m',

      setSelectedHeroes: (heroes) => set({ selectedHeroes: heroes }),

      toggleHero: (key) => {
        const current = get().selectedHeroes
        set({
          selectedHeroes: current.includes(key)
            ? current.filter((h) => h !== key)
            : [...current, key],
        })
      },

      selectAll: (allKeys) => set({ selectedHeroes: allKeys }),
      clearAll: () => set({ selectedHeroes: [] }),
      resetToTop5: (top5Keys) => set({ selectedHeroes: top5Keys }),
      setRoleFilter: (roleFilter) => set({ roleFilter }),
      setPeriodFilter: (periodFilter) => set({ periodFilter }),
    }),
    { name: 'ow-hub:timeline-state' },
  ),
)
