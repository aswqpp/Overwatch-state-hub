import { useParams } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'

export default function HeroDetailPage() {
  const { heroKey } = useParams<{ heroKey: string }>()
  return (
    <PageLayout>
      <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
        <p className="text-4xl mb-4">🦸</p>
        <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>
          {heroKey} 상세
        </p>
        <p className="text-sm">Phase 2에서 구현 예정</p>
      </div>
    </PageLayout>
  )
}
