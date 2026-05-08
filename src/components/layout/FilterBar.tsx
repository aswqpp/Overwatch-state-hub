import { useFilterStore } from '@/stores/filterStore'
import { useT } from '@/i18n'
import type { Platform, Region, Rank } from '@/types'

const REGIONS: { value: Region; labelKey: 'regionAsia' | 'regionEurope' | 'regionAmericas' }[] = [
  { value: 'asia', labelKey: 'regionAsia' },
  { value: 'europe', labelKey: 'regionEurope' },
  { value: 'americas', labelKey: 'regionAmericas' },
]

const PLATFORMS: { value: Platform; labelKey: 'platformPc' | 'platformConsole' }[] = [
  { value: 'pc', labelKey: 'platformPc' },
  { value: 'console', labelKey: 'platformConsole' },
]

const RANKS: { value: Rank; labelKey: string }[] = [
  { value: '', labelKey: 'rankAll' },
  { value: 'bronze', labelKey: 'bronze' },
  { value: 'silver', labelKey: 'silver' },
  { value: 'gold', labelKey: 'gold' },
  { value: 'platinum', labelKey: 'platinum' },
  { value: 'diamond', labelKey: 'diamond' },
  { value: 'master', labelKey: 'master' },
  { value: 'grandmaster', labelKey: 'grandmaster' },
]

export default function FilterBar() {
  const t = useT()
  const { platform, region, rank, setFilter } = useFilterStore()

  const selectClass =
    'text-sm px-3 py-1.5 rounded-md border font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'
  const selectStyle = {
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border)',
    color: 'var(--text)',
  }

  return (
    <div
      style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      className="sticky top-14 z-40"
    >
      <div className="max-w-[1280px] mx-auto px-4 py-2 flex items-center gap-3 flex-wrap">
        {/* Competitive badge (fixed) */}
        <span
          className="text-xs px-2 py-1 rounded font-semibold"
          style={{ backgroundColor: 'var(--accent)', color: '#000' }}
        >
          {t('competitive')} 🏅
        </span>

        {/* Region */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {t('region')}
          </span>
          <select
            value={region}
            onChange={(e) => setFilter('region', e.target.value as Region)}
            className={selectClass}
            style={selectStyle}
            aria-label={t('region')}
          >
            {REGIONS.map(({ value, labelKey }) => (
              <option key={value} value={value}>
                {t(labelKey as Parameters<ReturnType<typeof useT>>[0])}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {t('platform')}
          </span>
          <select
            value={platform}
            onChange={(e) => setFilter('platform', e.target.value as Platform)}
            className={selectClass}
            style={selectStyle}
            aria-label={t('platform')}
          >
            {PLATFORMS.map(({ value, labelKey }) => (
              <option key={value} value={value}>
                {t(labelKey as Parameters<ReturnType<typeof useT>>[0])}
              </option>
            ))}
          </select>
        </div>

        {/* Rank */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            {t('rank')}
          </span>
          <select
            value={rank}
            onChange={(e) => setFilter('rank', e.target.value as Rank)}
            className={selectClass}
            style={selectStyle}
            aria-label={t('rank')}
          >
            {RANKS.map(({ value, labelKey }) => (
              <option key={value} value={value}>
                {t(labelKey as Parameters<ReturnType<typeof useT>>[0])}
              </option>
            ))}
          </select>
        </div>

        {/* Basis label */}
        <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          {t('serverBasisRegion', {
            region: t(
              region === 'asia'
                ? 'regionAsia'
                : region === 'europe'
                  ? 'regionEurope'
                  : 'regionAmericas',
            ),
          })}
        </span>
      </div>
    </div>
  )
}
