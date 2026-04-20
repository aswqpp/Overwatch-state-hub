import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useT } from '@/i18n'
import { useUIStore } from '@/stores/uiStore'
import type { HeroStat } from '@/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const ROLE_COLORS = {
  tank: '#4a9ff5',
  damage: '#f74b4b',
  support: '#4bcf7e',
}

interface Props {
  stats: HeroStat[]
}

export default function Top10BarChart({ stats }: Props) {
  const t = useT()
  const lang = useUIStore((s) => s.language)
  const top10 = stats.slice(0, 10)

  const labels = top10.map((s) => s.name)
  const metaData = top10.map((s) => s.meta)
  const bgColors = top10.map((s) => ROLE_COLORS[s.role])

  const data = {
    labels,
    datasets: [
      {
        label: t('metaScore'),
        data: metaData,
        backgroundColor: bgColors,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) => ` ${t('metaScore')}: ${(ctx.raw as number).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'var(--border)' as string },
        ticks: { color: 'var(--text-muted)' as string, font: { size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: 'var(--text)' as string, font: { size: 12 } },
      },
    },
  }

  // Suppress unused warning
  void lang

  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text)' }}>
        {t('top10Meta')}
      </h3>
      <div style={{ height: `${top10.length * 32 + 20}px`, minHeight: '200px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
