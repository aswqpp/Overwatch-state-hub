import { useQuery } from '@tanstack/react-query'
import { fetchHeroStats, fetchHeroes, fetchHeroDetail, fetchMaps } from './overfast'
import { computeHeroStats } from '@/utils/meta'
import { useFilters } from '@/stores/filterStore'
import type { Filters } from '@/types'

// ─── Hero stats with computed meta scores ─────────────────────────────────────
export function useHeroStats(overrideFilters?: Filters) {
  const storeFilters = useFilters()
  const filters = overrideFilters ?? storeFilters

  const statsQuery = useQuery({
    queryKey: ['heroStats', filters],
    queryFn: () => fetchHeroStats(filters),
    staleTime: 60_000, // 1 min cache
    retry: (failCount, error) => {
      // Don't retry on rate limit or Blizzard down
      if (error instanceof Error && 'status' in error) {
        const s = (error as { status: number }).status
        if (s === 429 || s === 503) return false
      }
      return failCount < 2
    },
  })

  const heroesQuery = useQuery({
    queryKey: ['heroes'],
    queryFn: fetchHeroes,
    staleTime: 5 * 60_000,
  })

  const isLoading = statsQuery.isLoading || heroesQuery.isLoading
  const error = statsQuery.error ?? heroesQuery.error

  const heroStats =
    statsQuery.data && heroesQuery.data
      ? computeHeroStats(statsQuery.data, heroesQuery.data)
      : []

  return { heroStats, isLoading, error, filters }
}

// ─── All heroes (for DB page) ─────────────────────────────────────────────────
export function useHeroes() {
  return useQuery({
    queryKey: ['heroes'],
    queryFn: fetchHeroes,
    staleTime: 5 * 60_000,
  })
}

// ─── Hero detail ──────────────────────────────────────────────────────────────
export function useHeroDetail(heroKey: string) {
  return useQuery({
    queryKey: ['heroDetail', heroKey],
    queryFn: () => fetchHeroDetail(heroKey),
    staleTime: 10 * 60_000,
    enabled: !!heroKey,
  })
}

// ─── Maps ─────────────────────────────────────────────────────────────────────
export function useMaps() {
  return useQuery({
    queryKey: ['maps'],
    queryFn: fetchMaps,
    staleTime: 10 * 60_000,
  })
}
