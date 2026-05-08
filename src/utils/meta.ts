import type { HeroStatRaw, HeroSummary, HeroStat, Tier } from '@/types'

// Ported from ASWQPP-OW__6_.html (line 366)
export function metaScore(pickrate: number, winrate: number): number {
  return +(pickrate * 0.7 + winrate * 0.3).toFixed(2)
}

// Percentile-based tier calculation (ported from line 367-373)
export function calcTiers(stats: { meta: number }[]): Map<number, Tier> {
  const sorted = [...stats].sort((a, b) => b.meta - a.meta)
  const n = sorted.length
  const map = new Map<number, Tier>()

  sorted.forEach((s, i) => {
    const pct = (i / n) * 100
    let tier: Tier
    if (pct < 8) tier = 'S'
    else if (pct < 25) tier = 'A'
    else if (pct < 60) tier = 'B'
    else if (pct < 85) tier = 'C'
    else tier = 'D'
    map.set(s.meta, tier)
  })

  return map
}

// Merge stats + hero summaries into HeroStat[]
export function computeHeroStats(
  raw: HeroStatRaw[],
  heroes: HeroSummary[],
): HeroStat[] {
  const heroMap = new Map(heroes.map((h) => [h.key, h]))

  const withMeta = raw.map((r) => ({
    ...r,
    meta: metaScore(r.pickrate, r.winrate),
  }))

  const tierMap = calcTiers(withMeta)

  return withMeta
    .map((r) => {
      const h = heroMap.get(r.hero)
      return {
        key: r.hero,
        name: h?.name ?? r.hero,
        role: h?.role ?? 'damage',
        portrait: h?.portrait ?? '',
        pickrate: r.pickrate,
        winrate: r.winrate,
        meta: r.meta,
        tier: tierMap.get(r.meta) ?? 'C',
      } satisfies HeroStat
    })
    .sort((a, b) => b.meta - a.meta)
}

// Pickrate standard deviation — how concentrated the meta is (lower = more balanced)
export function pickrateStdev(stats: HeroStat[]): number {
  if (!stats.length) return 0
  const picks = stats.map((h) => h.pickrate)
  const mean = picks.reduce((a, b) => a + b, 0) / picks.length
  const variance = picks.reduce((sum, p) => sum + (p - mean) ** 2, 0) / picks.length
  return +Math.sqrt(variance).toFixed(2)
}

// Pickrate histogram — bucket counts across pickrate range, for mini sparkline
export function pickrateHistogram(stats: HeroStat[], buckets = 10): number[] {
  const counts = Array.from({ length: buckets }, () => 0)
  if (!stats.length) return counts
  const picks = stats.map((h) => h.pickrate)
  const max = Math.max(...picks)
  if (max <= 0) return counts
  for (const p of picks) {
    const idx = Math.min(buckets - 1, Math.floor((p / max) * buckets))
    counts[idx] += 1
  }
  return counts
}

export type SortKey = 'meta' | 'pickrate' | 'winrate'

export function sortHeroStats(stats: HeroStat[], key: SortKey, asc: boolean): HeroStat[] {
  return [...stats].sort((a, b) => {
    const diff = a[key] - b[key]
    return asc ? diff : -diff
  })
}
