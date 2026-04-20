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

// Meta concentration: top-3 pick share
export function metaConcentration(stats: HeroStat[]): {
  pct: number
  label: string
  labelColor: string
} {
  if (!stats.length) return { pct: 0, label: '데이터 없음', labelColor: '#90a4ae' }

  const sorted = [...stats].sort((a, b) => b.pickrate - a.pickrate)
  const total = sorted.reduce((s, h) => s + h.pickrate, 0)
  const top3 = sorted.slice(0, 3).reduce((s, h) => s + h.pickrate, 0)
  const pct = total > 0 ? +((top3 / total) * 100).toFixed(1) : 0

  let label: string
  let labelColor: string
  if (pct > 50) {
    label = '매우 집중됨 🔴'
    labelColor = '#ef4444'
  } else if (pct > 35) {
    label = '집중됨 ⚠️'
    labelColor = '#f59e0b'
  } else if (pct > 20) {
    label = '균형잡힘 ✓'
    labelColor = '#10b981'
  } else {
    label = '매우 균형잡힘 🟢'
    labelColor = '#4bcf7e'
  }

  return { pct, label, labelColor }
}

export type SortKey = 'meta' | 'pickrate' | 'winrate'

export function sortHeroStats(stats: HeroStat[], key: SortKey, asc: boolean): HeroStat[] {
  return [...stats].sort((a, b) => {
    const diff = a[key] - b[key]
    return asc ? diff : -diff
  })
}
