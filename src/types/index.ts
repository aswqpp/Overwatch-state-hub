// ─── Filter ───────────────────────────────────────────────────────────────────
export type Platform = 'pc' | 'console'
export type Region = 'asia' | 'europe' | 'americas'
export type Rank =
  | ''
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'master'
  | 'grandmaster'

export interface Filters {
  platform: Platform
  region: Region
  rank: Rank
}

// ─── Hero role ────────────────────────────────────────────────────────────────
export type HeroRole = 'tank' | 'damage' | 'support'
export type Tier = 'S' | 'A' | 'B' | 'C' | 'D'

// ─── OverFast API responses ───────────────────────────────────────────────────
export interface HeroStatRaw {
  hero: string
  pickrate: number
  winrate: number
}

export interface HeroSummary {
  name: string
  key: string
  portrait: string
  role: HeroRole
}

export interface HeroAbility {
  key: string
  name: string
  icon: string
  description: string
  video?: {
    link: { mp4: string; webm: string }
    thumbnail: string
  }
  type: string
}

export interface HeroDetail extends HeroSummary {
  description: string
  hitpoints: { health: number; armor: number; shields: number; total: number }
  abilities: HeroAbility[]
  story?: { summary: string }
}

export interface MapInfo {
  name: string
  screenshot: string
  gamemodes: string[]
  location: string
  country_code?: string
}

// ─── Computed hero stat ───────────────────────────────────────────────────────
export interface HeroStat {
  key: string
  name: string
  role: HeroRole
  portrait: string
  pickrate: number
  winrate: number
  meta: number
  tier: Tier
}

// ─── Snapshot ─────────────────────────────────────────────────────────────────
export interface Snapshot {
  ts: number
  filters: Filters
  merged: HeroStat[]
}

// ─── Prediction ───────────────────────────────────────────────────────────────
export interface PredictionTarget {
  value: number
  targetDate: number
  scored: boolean
  actual?: number
  accuracy?: number
}

export interface Prediction {
  id: string
  predictedAt: number
  hero: string
  currentValue: number
  targets: {
    days7: PredictionTarget
    days14: PredictionTarget
    days30: PredictionTarget
  }
  reasoning: string
  filters: Filters
  disclaimerShown: true
}

// ─── Accuracy stats ───────────────────────────────────────────────────────────
export interface AccuracyStats {
  days7: { total: number; near: number; rate: number }
  days14: { total: number; near: number; rate: number }
  days30: { total: number; near: number; rate: number }
  best?: { hero: string; accuracy: number; date: number }
  worst?: { hero: string; accuracy: number; date: number }
}

// ─── UI ───────────────────────────────────────────────────────────────────────
export type Theme = 'light' | 'dark' | 'system'
export type Language = 'ko' | 'en' | 'ja'
