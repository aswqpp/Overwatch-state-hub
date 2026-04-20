import type { Filters, HeroStatRaw, HeroSummary, HeroDetail, MapInfo } from '@/types'

const BASE = 'https://overfast-api.tekrop.fr'

class OverFastError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'OverFastError'
    this.status = status
  }
}

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`)
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v) url.searchParams.set(k, v)
    }
  }

  const res = await fetch(url.toString())

  if (res.status === 429) {
    throw new OverFastError(429, 'API 요청 횟수 초과 (Rate Limit). 잠시 후 다시 시도해주세요.')
  }
  if (res.status === 503) {
    throw new OverFastError(503, '블리자드 서버 점검 중이거나 OverFast API를 일시적으로 사용할 수 없습니다.')
  }
  if (!res.ok) {
    throw new OverFastError(res.status, `API 오류: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

// ─── Hero stats (core endpoint) ───────────────────────────────────────────────
export function fetchHeroStats(filters: Filters): Promise<HeroStatRaw[]> {
  const params: Record<string, string> = {
    gamemode: 'competitive',
    platform: filters.platform,
    region: filters.region,
  }
  if (filters.rank) params.competitive_division = filters.rank
  return get<HeroStatRaw[]>('/heroes/stats', params)
}

// ─── Heroes list ──────────────────────────────────────────────────────────────
export function fetchHeroes(): Promise<HeroSummary[]> {
  return get<HeroSummary[]>('/heroes')
}

// ─── Hero detail ──────────────────────────────────────────────────────────────
export function fetchHeroDetail(heroKey: string): Promise<HeroDetail> {
  return get<HeroDetail>(`/heroes/${heroKey}`)
}

// ─── Maps list ────────────────────────────────────────────────────────────────
export function fetchMaps(): Promise<MapInfo[]> {
  return get<MapInfo[]>('/maps')
}

// ─── Hero stats for a specific map ───────────────────────────────────────────
export function fetchHeroStatsByMap(
  filters: Filters,
  mapKey: string,
): Promise<HeroStatRaw[]> {
  const params: Record<string, string> = {
    gamemode: 'competitive',
    platform: filters.platform,
    region: filters.region,
    map: mapKey,
  }
  if (filters.rank) params.competitive_division = filters.rank
  return get<HeroStatRaw[]>('/heroes/stats', params)
}

export { OverFastError }
