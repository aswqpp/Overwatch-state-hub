import PageLayout from '@/components/layout/PageLayout'
import { useT } from '@/i18n'

export default function PatchPage() {
  const t = useT()
  return (
    <PageLayout>
      <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
        <p className="text-4xl mb-4">📋</p>
        <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>{t('patch')}</p>
        <p className="text-sm">{t('comingSoon', { phase: t('phase4') })}</p>
      </div>
    </PageLayout>
  )
}
