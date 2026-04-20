import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '@/i18n'
import { sortHeroStats } from '@/utils/meta'
import TierBadge from '@/components/ui/TierBadge'
import RoleBadge from '@/components/ui/RoleBadge'
import type { HeroStat, HeroRole } from '@/types'
import type { SortKey } from '@/utils/meta'

interface Props {
  stats: HeroStat[]
}

type SortDir = 'asc' | 'desc'

const ROLE_FILTERS: { value: '' | HeroRole; label: string }[] = [
  { value: '', label: 'all' },
  { value: 'tank', label: 'tank' },
  { value: 'damage', label: 'damage' },
  { value: 'support', label: 'support' },
]

export default function HeroTable({ stats }: Props) {
  const t = useT()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'' | HeroRole>('')
  const [sortKey, setSortKey] = useState<SortKey>('meta')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const filtered = useMemo(() => {
    let result = stats
    if (roleFilter) result = result.filter((s) => s.role === roleFilter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.key.toLowerCase().includes(q),
      )
    }
    return sortHeroStats(result, sortKey, sortDir === 'asc')
  }, [stats, roleFilter, search, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return ' ↕'
    return sortDir === 'desc' ? ' ↓' : ' ↑'
  }

  const thClass =
    'text-left text-xs font-medium uppercase tracking-wide px-3 py-2 cursor-pointer select-none hover:opacity-80 transition-opacity'

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Table header controls */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <h3 className="font-semibold text-sm mr-auto" style={{ color: 'var(--text)' }}>
          {t('heroRanking')}
        </h3>

        {/* Role filter */}
        <div className="flex gap-1">
          {ROLE_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setRoleFilter(value)}
              className="px-2.5 py-1 rounded text-xs font-medium transition-colors"
              style={{
                backgroundColor: roleFilter === value ? 'var(--accent)' : 'var(--surface)',
                color: roleFilter === value ? '#000' : 'var(--text-muted)',
                border: '1px solid var(--border)',
              }}
            >
              {t(label as Parameters<ReturnType<typeof useT>>[0])}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] w-40"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
              <th className={thClass}>{t('rank_col')}</th>
              <th className={thClass}>{t('hero')}</th>
              <th className={thClass}>{t('role')}</th>
              <th
                className={thClass}
                onClick={() => handleSort('pickrate')}
                style={{ color: sortKey === 'pickrate' ? 'var(--accent)' : undefined }}
              >
                {t('pickrate')}{sortIcon('pickrate')}
              </th>
              <th
                className={thClass}
                onClick={() => handleSort('winrate')}
                style={{ color: sortKey === 'winrate' ? 'var(--accent)' : undefined }}
              >
                {t('winrate')}{sortIcon('winrate')}
              </th>
              <th
                className={thClass}
                onClick={() => handleSort('meta')}
                style={{ color: sortKey === 'meta' ? 'var(--accent)' : undefined }}
              >
                {t('metaScore')}{sortIcon('meta')}
              </th>
              <th className={thClass}>{t('tier')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  {t('noData')}
                </td>
              </tr>
            )}
            {filtered.map((hero, idx) => (
              <tr
                key={hero.key}
                onClick={() => navigate(`/heroes/${hero.key}`)}
                className="cursor-pointer transition-colors"
                style={{ borderTop: '1px solid var(--border)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                    'var(--surface)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor = ''
                }}
              >
                <td className="px-3 py-2.5 tabular font-display font-semibold text-base" style={{ color: 'var(--text-muted)' }}>
                  {idx + 1}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    {hero.portrait ? (
                      <img
                        src={hero.portrait}
                        alt={hero.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: 'var(--border)' }}
                      />
                    )}
                    <span className="font-medium" style={{ color: 'var(--text)' }}>
                      {hero.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <RoleBadge role={hero.role} />
                </td>
                <td className="px-3 py-2.5 tabular" style={{ color: 'var(--text)' }}>
                  {hero.pickrate.toFixed(1)}%
                </td>
                <td className="px-3 py-2.5 tabular" style={{ color: 'var(--text)' }}>
                  {hero.winrate.toFixed(1)}%
                </td>
                <td
                  className="px-3 py-2.5 tabular font-display font-semibold text-base"
                  style={{ color: 'var(--accent)' }}
                >
                  {hero.meta.toFixed(2)}
                </td>
                <td className="px-3 py-2.5">
                  <TierBadge tier={hero.tier} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 text-xs" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
        {filtered.length}/{stats.length} {t('hero')} · {t('metaScore')}: pickrate×0.7 + winrate×0.3
      </div>
    </div>
  )
}
