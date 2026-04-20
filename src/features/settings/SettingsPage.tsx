import { useUIStore, applyTheme } from '@/stores/uiStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import PageLayout from '@/components/layout/PageLayout'
import type { Theme, Language } from '@/types'

const THEMES: { value: Theme; label: string }[] = [
  { value: 'dark', label: '다크' },
  { value: 'light', label: '라이트' },
  { value: 'system', label: '시스템' },
]

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
]

export default function SettingsPage() {
  const { theme, language, setTheme, setLanguage } = useUIStore()
  const { snapshots, autoSave, setAutoSave, clearSnapshots, exportSnapshots, importSnapshots } =
    useSnapshotStore()

  function handleTheme(t: Theme) {
    setTheme(t)
    applyTheme(t)
  }

  function handleExport() {
    const json = exportSnapshots()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ow-snapshots-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      importSnapshots(ev.target?.result as string)
    }
    reader.readAsText(file)
  }

  function handleClear() {
    if (confirm(`스냅샷 ${snapshots.length}개를 모두 삭제하시겠습니까?`)) {
      clearSnapshots()
    }
  }

  const sectionClass = 'rounded-xl p-5 flex flex-col gap-4'
  const sectionStyle = { backgroundColor: 'var(--card)', border: '1px solid var(--border)' }

  const btnGroupClass = 'flex gap-2 flex-wrap'
  const btnBase =
    'px-3 py-1.5 rounded-md text-sm font-medium border transition-colors cursor-pointer'

  return (
    <PageLayout>
      <h1 className="font-display font-bold text-2xl mb-6" style={{ color: 'var(--text)' }}>
        ⚙️ 설정
      </h1>

      <div className="flex flex-col gap-4 max-w-xl">
        {/* Theme */}
        <section className={sectionClass} style={sectionStyle}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>테마</h2>
          <div className={btnGroupClass}>
            {THEMES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleTheme(value)}
                className={btnBase}
                style={{
                  backgroundColor: theme === value ? 'var(--accent)' : 'var(--surface)',
                  borderColor: theme === value ? 'var(--accent)' : 'var(--border)',
                  color: theme === value ? '#000' : 'var(--text)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Language */}
        <section className={sectionClass} style={sectionStyle}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>언어</h2>
          <div className={btnGroupClass}>
            {LANGUAGES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setLanguage(value)}
                className={btnBase}
                style={{
                  backgroundColor: language === value ? 'var(--accent)' : 'var(--surface)',
                  borderColor: language === value ? 'var(--accent)' : 'var(--border)',
                  color: language === value ? '#000' : 'var(--text)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Snapshot */}
        <section className={sectionClass} style={sectionStyle}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>스냅샷 데이터</h2>

          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              자동 저장
            </span>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className="relative w-11 h-6 rounded-full transition-colors"
              style={{ backgroundColor: autoSave ? 'var(--accent)' : 'var(--border)' }}
              aria-checked={autoSave}
              role="switch"
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                style={{ transform: autoSave ? 'translateX(20px)' : 'none' }}
              />
            </button>
          </div>

          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            저장된 스냅샷: <strong style={{ color: 'var(--text)' }}>{snapshots.length}</strong>개
            (최대 180개)
          </p>

          <div className={btnGroupClass}>
            <button
              onClick={handleExport}
              disabled={snapshots.length === 0}
              className={btnBase}
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
                opacity: snapshots.length === 0 ? 0.5 : 1,
              }}
            >
              📥 내보내기
            </button>

            <label
              className={`${btnBase} cursor-pointer`}
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            >
              📤 가져오기
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={handleClear}
              disabled={snapshots.length === 0}
              className={btnBase}
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--danger)',
                color: 'var(--danger)',
                opacity: snapshots.length === 0 ? 0.5 : 1,
              }}
            >
              🗑️ 전체 삭제
            </button>
          </div>
        </section>

        {/* Data disclaimer */}
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          ⚠️ 이 사이트는 <strong>OverFast API (비공식)</strong>를 사용합니다. 블리자드 공식
          서비스가 아니며 중단될 수 있습니다. 데이터는 선택된 지역 하나 기준이며, "글로벌"
          통계를 제공하지 않습니다.
        </p>
      </div>
    </PageLayout>
  )
}
