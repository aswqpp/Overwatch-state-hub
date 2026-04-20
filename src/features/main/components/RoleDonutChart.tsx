import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useT } from '@/i18n'
import type { HeroStat } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend)

const ROLE_COLORS = {
  tank: '#4a9ff5',
  damage: '#f74b4b',
  support: '#4bcf7e',
}

interface Props {
  stats: HeroStat[]
}

export default function RoleDonutChart({ stats }: Props) {
  const t = useT()

  const pickByRole = { tank: 0, damage: 0, support: 0 }
  for (const s of stats) {
    pickByRole[s.role] = (pickByRole[s.role] ?? 0) + s.pickrate
  }

  const data = {
    labels: [t('tank'), t('damage'), t('support')],
    datasets: [
      {
        data: [pickByRole.tank, pickByRole.damage, pickByRole.support],
        backgroundColor: [ROLE_COLORS.tank, ROLE_COLORS.damage, ROLE_COLORS.support],
        borderColor: 'transparent',
        borderWidth: 0,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'var(--text-muted)' as string,
          font: { size: 12 },
          padding: 12,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; raw: unknown }) =>
            ` ${ctx.label}: ${(ctx.raw as number).toFixed(1)}%`,
        },
      },
    },
  }

  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text)' }}>
        {t('roleDistribution')}
      </h3>
      <div className="max-w-[220px] mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
