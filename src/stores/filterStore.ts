import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import type { Filters, Platform, Region, Rank } from '@/types'

interface FilterStore extends Filters {
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  reset: () => void
}

const DEFAULT: Filters = {
  platform: 'pc',
  region: 'asia',
  rank: '',
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      ...DEFAULT,
      setFilter: (key, value) => set({ [key]: value }),
      reset: () => set(DEFAULT),
    }),
    { name: 'ow-hub:filters' },
  ),
)

// Typed helpers
export const usePlatform = () => useFilterStore((s) => s.platform)
export const useRegion = () => useFilterStore((s) => s.region)
export const useRank = () => useFilterStore((s) => s.rank)
export const useFilters = (): Filters =>
  useFilterStore(
    useShallow((s) => ({ platform: s.platform, region: s.region, rank: s.rank })),
  )

// Needed for components
export type { Platform, Region, Rank }
