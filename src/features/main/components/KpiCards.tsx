import { useT } from '@/i18n'
import { metaConcentration } from '@/utils/meta'
import type { HeroStat } from '@/types'

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
  const best = stats[0]
  if (!best) return <Card title={t('kpiBest')}><p style={{ color: 'var(--text-muted)' }}>—</p></Card>
  return (
    <Card title={t('kpiBest')}>
      <div className="flex items-center gap-2">
        {best.portrait && (
          <img
            src={best.portrait}
            alt={best.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <div>
          <p className="font-display font-bold text-2xl tabular" style={{ color: '#10b981' }}>
            {best.meta.toFixed(2)}
          </p>
          <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>
            {best.name}
          </p>
        </div>
      </div>
    </Card>
  )
}

// Card 3: Worst meta score
function WorstMetaCard({ stats }: { stats: HeroStat[] }) {
  const t = useT()
  const worst = stats[stats.length - 1]
  if (!worst) return <Card title={t('kpiWorst')}><p style={{ color: 'var(--text-muted)' }}>—</p></Card>
  return (
    <Card title={t('kpiWorst')}>
      <div className="flex items-center gap-2">
        {worst.portrait && (
          <img
            src={worst.portrait}
            alt={worst.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        )}
        <div>
          <p className="font-display font-bold text-2xl tabular" style={{ color: '#ef4444' }}>
            {worst.meta.toFixed(2)}
          </p>
          <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>
            {worst.name}
          </p>
        </div>
      </div>
    </Card>
  )
}

// Card 4: Meta concentration
function ConcentrationCard({ stats }: { stats: HeroStat[] }) {
  const t = useT()
  const { pct, label, labelColor } = metaConcentration(stats)

  const barFilled = Math.round((pct / 100) * 20)
  const bar = Array.from({ length: 20 }, (_, i) => i < barFilled)

  return (
    <Card title={t('kpiConcentration')}>
      <div>
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
          {t('top3Share')}{' '}
          <span className="font-display font-bold text-xl tabular" style={{ color: 'var(--accent)' }}>
            {pct}%
          </span>
        </p>

        {/* Mini distribution bar */}
        <div className="flex gap-px my-2" aria-label={`메타 집중도 ${pct}%`}>
          {bar.map((filled, i) => (
            <div
              key={i}
              className="h-3 flex-1 rounded-sm"
              style={{ backgroundColor: filled ? 'var(--accent)' : 'var(--border)' }}
            />
          ))}
        </div>

        <p className="text-xs font-semibold" style={{ color: labelColor }}>
          {label}
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
      <ConcentrationCard stats={stats} />
    </div>
  )
}
