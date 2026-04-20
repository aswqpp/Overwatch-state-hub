import type { Snapshot, Filters, HeroStat } from '@/types'

export function createSnapshot(filters: Filters, merged: HeroStat[]): Snapshot {
  return { ts: Date.now(), filters, merged }
}
