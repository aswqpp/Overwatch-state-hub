import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useT } from '@/i18n'

ChartJS.register(ArcElement, Tooltip, Legend)

const ROLE_COLORS = {
  tank: '#4a9ff5',
  damage: '#f74b4b',
  support: '#4bcf7e',
}

// Team-slot weights: tank 1 / damage 2 / support 2 = 20% / 40% / 40%
const ROLE_SLOTS = { tank: 1, damage: 2, support: 2 } as const
const TOTAL_SLOTS = ROLE_SLOTS.tank + ROLE_SLOTS.damage + ROLE_SLOTS.support

export default function RoleDonutChart() {
  const t = useT()

  const slotPct = {
    tank: (ROLE_SLOTS.tank / TOTAL_SLOTS) * 100,
    damage: (ROLE_SLOTS.damage / TOTAL_SLOTS) * 100,
    support: (ROLE_SLOTS.support / TOTAL_SLOTS) * 100,
  }

  const data = {
    labels: [t('tank'), t('damage'), t('support')],
    datasets: [
      {
        data: [slotPct.tank, slotPct.damage, slotPct.support],
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
      <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
        {t('roleDistribution')}
      </h3>
      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
        {t('roleSlotsNote')}
      </p>
      <div className="max-w-[220px] mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
