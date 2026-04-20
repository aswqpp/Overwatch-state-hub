import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Snapshot } from '@/types'

const MAX_SNAPSHOTS = 180

interface SnapshotStore {
  snapshots: Snapshot[]
  autoSave: boolean
  setAutoSave: (v: boolean) => void
  addSnapshot: (s: Snapshot) => void
  clearSnapshots: () => void
  exportSnapshots: () => string
  importSnapshots: (json: string) => void
}

export const useSnapshotStore = create<SnapshotStore>()(
  persist(
    (set, get) => ({
      snapshots: [],
      autoSave: true,

      setAutoSave: (v) => set({ autoSave: v }),

      addSnapshot: (snapshot) => {
        const all = get().snapshots
        const trimmed = all.length >= MAX_SNAPSHOTS ? all.slice(-(MAX_SNAPSHOTS - 1)) : all
        set({ snapshots: [...trimmed, snapshot] })
      },

      clearSnapshots: () => set({ snapshots: [] }),

      exportSnapshots: () => JSON.stringify(get().snapshots, null, 2),

      importSnapshots: (json) => {
        try {
          const parsed: unknown = JSON.parse(json)
          if (Array.isArray(parsed)) set({ snapshots: parsed as Snapshot[] })
        } catch {
          // invalid JSON — ignore
        }
      },
    }),
    { name: 'ow-hub:snapshots' },
  ),
)
