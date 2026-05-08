import { useT, getHeroName } from '@/i18n'
import { useUIStore } from '@/stores/uiStore'
import { pickrateStdev, pickrateHistogram } from '@/utils/meta'
import type { HeroStat, Language } from '@/types'

interface Props {
  stats: HeroStat[]
}

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

// Card 1: Hero count
function HeroCountCard({ stats }: { stats: HeroStat[] }) {
  const t = useT()
  return (
    <Card title={t('kpiHeroCount')}>
      <p
        className="font-display font-bold text-4xl tabular"
        style={{ color: 'var(--accent)' }}
      >
        {stats.length}
      </p>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {t('competitive')} · {t('serverBasis')}
      </p>
    </Card>
  )
}

// Card 2: Best meta score
function BestMetaCard({ stats }: { stats: HeroStat[] }) {
  const t = useT()
  const lang = useUIStore((s) => s.language) as Language
  const best = stats[0]
  if (!best) return <Card title={t('kpiBest')}><p style={{ color: 'var(--text-muted)' }}>—</p></Card>
  const displayName = getHeroName(best.key, lang)
  return (
    <Card title={t('kpiBest')}>
      <div className="flex items-center gap-2">
        {best.portrait && (
          <img
            src={best.portrait}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <div>
          <p className="font-display font-bold text-2xl tabular" style={{ color: '#10b981' }}>
            {best.meta.toFixed(2)}
          </p>
          <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>
            {displayName}
          </p>
        </div>
      </div>
    </Card>
  )
}

// Card 3: Worst meta score
function WorstMetaCard({ stats }: { stats: HeroStat[] }) {
  const t = useT()
  const lang = useUIStore((s) => s.language) as Language
  const worst = stats[stats.length - 1]
  if (!worst) return <Card title={t('kpiWorst')}><p style={{ color: 'var(--text-muted)' }}>—</p></Card>
  const displayName = getHeroName(worst.key, lang)
  return (
    <Card title={t('kpiWorst')}>
      <div className="flex items-center gap-2">
        {worst.portrait && (
          <img
            src={worst.portrait}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <div>
          <p className="font-display font-bold text-2xl tabular" style={{ color: '#ef4444' }}>
            {worst.meta.toFixed(2)}
          </p>
          <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>
            {displayName}
          </p>
        </div>
      </div>
    </Card>
  )
}

// Card 4: Pickrate stdev + mini histogram
function PickrateStdevCard({ stats }: { stats: HeroStat[] }) {
  const t = useT()
  const sigma = pickrateStdev(stats)
  const hist = pickrateHistogram(stats, 10)
  const maxCount = Math.max(1, ...hist)

  return (
    <Card title={t('kpiPickrateStdev')}>
      <div>
        <p className="font-display font-bold text-3xl tabular" style={{ color: 'var(--accent)' }}>
          σ = {sigma}
        </p>

        <div
          className="flex items-end gap-px h-8 mt-3"
          aria-label={t('pickrateHistogramAria', { sigma: String(sigma) })}
        >
          {hist.map((count, i) => {
            const h = Math.max(2, Math.round((count / maxCount) * 100))
            return (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  backgroundColor: count > 0 ? 'var(--accent)' : 'var(--border)',
                  opacity: count > 0 ? 0.6 + (count / maxCount) * 0.4 : 0.3,
                }}
                title={`${count}`}
              />
            )
          })}
        </div>

        <p className="text-[10px] mt-1 flex justify-between" style={{ color: 'var(--text-muted)' }}>
          <span>{t('histogramLow')}</span>
          <span>{t('histogramHigh')}</span>
        </p>
      </div>
    </Card>
  )
}

export default function KpiCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <HeroCountCard stats={stats} />
      <BestMetaCard stats={stats} />
      <WorstMetaCard stats={stats} />
      <PickrateStdevCard stats={stats} />
    </div>
  )
}
