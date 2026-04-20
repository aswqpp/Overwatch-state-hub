import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useHeroStats } from '@/api/queries'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { useFilters } from '@/stores/filterStore'
import { createSnapshot } from '@/utils/snapshot'
import { useT } from '@/i18n'
import PageLayout from '@/components/layout/PageLayout'
import ErrorMessage from '@/components/ui/ErrorMessage'
import SkeletonCard from '@/components/ui/SkeletonCard'
import KpiCards from './components/KpiCards'
import RoleDonutChart from './components/RoleDonutChart'
import Top10BarChart from './components/Top10BarChart'
import HeroTable from './components/HeroTable'

function SkeletonDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} height="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard height="h-64" />
        <SkeletonCard height="h-64" />
      </div>
      <SkeletonCard height="h-96" />
    </div>
  )
}

export default function HomePage() {
  const t = useT()
  const filters = useFilters()
  const { heroStats, isLoading, error } = useHeroStats()
  const { autoSave, addSnapshot } = useSnapshotStore()
  const queryClient = useQueryClient()

  // Auto-save snapshot when data loads
  useEffect(() => {
    if (autoSave && heroStats.length > 0) {
      addSnapshot(createSnapshot(filters, heroStats))
    }
  }, [heroStats, autoSave, filters, addSnapshot])

  function handleRetry() {
    void queryClient.invalidateQueries({ queryKey: ['heroStats'] })
    void queryClient.invalidateQueries({ queryKey: ['heroes'] })
  }

  return (
    <PageLayout>
      {isLoading && <SkeletonDashboard />}

      {!isLoading && error && (
        <ErrorMessage error={error as Error} onRetry={handleRetry} />
      )}

      {!isLoading && !error && heroStats.length === 0 && (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-4xl mb-4">📭</p>
          <p>{t('noData')}</p>
        </div>
      )}

      {!isLoading && !error && heroStats.length > 0 && (
        <div className="flex flex-col gap-6">
          <KpiCards stats={heroStats} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RoleDonutChart stats={heroStats} />
            <Top10BarChart stats={heroStats} />
          </div>

          <HeroTable stats={heroStats} />

          {/* Data disclaimer */}
          <p className="text-xs text-center pb-2" style={{ color: 'var(--text-muted)' }}>
            ⚠️ {t('disclaimer')} 데이터 출처: OverFast API (비공식) — 블리자드 공식 서비스 아님
          </p>
        </div>
      )}
    </PageLayout>
  )
}
