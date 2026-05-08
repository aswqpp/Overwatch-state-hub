import { useUIStore, applyTheme } from '@/stores/uiStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { useT } from '@/i18n'
import PageLayout from '@/components/layout/PageLayout'
import type { Theme, Language } from '@/types'

const THEMES: { value: Theme; labelKey: 'themeDark' | 'themeLight' | 'themeSystem' }[] = [
  { value: 'dark', labelKey: 'themeDark' },
  { value: 'light', labelKey: 'themeLight' },
  { value: 'system', labelKey: 'themeSystem' },
]

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
]

export default function SettingsPage() {
  const t = useT()
  const { theme, language, setTheme, setLanguage } = useUIStore()
  const { snapshots, autoSave, setAutoSave, clearSnapshots, exportSnapshots, importSnapshots } =
    useSnapshotStore()

  function handleTheme(th: Theme) {
    setTheme(th)
    applyTheme(th)
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
    if (confirm(t('snapshotClearConfirm', { count: String(snapshots.length) }))) {
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
        ⚙️ {t('settingsTitle')}
      </h1>

      <div className="flex flex-col gap-4 max-w-xl">
        {/* Theme */}
        <section className={sectionClass} style={sectionStyle}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t('themeSection')}</h2>
          <div className={btnGroupClass}>
            {THEMES.map(({ value, labelKey }) => (
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
                {t(labelKey)}
              </button>
            ))}
          </div>
        </section>

        {/* Language */}
        <section className={sectionClass} style={sectionStyle}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t('languageSection')}</h2>
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
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t('snapshotSection')}</h2>

          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t('snapshotAutoSave')}
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
            {t('snapshotCount', { count: String(snapshots.length) })}
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
              📥 {t('snapshotExport')}
            </button>

            <label
              className={`${btnBase} cursor-pointer`}
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            >
              📤 {t('snapshotImport')}
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
              🗑️ {t('snapshotClear')}
            </button>
          </div>
        </section>

        {/* Data disclaimer */}
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {t('disclaimerIcon')} {t('dataDisclaimer')}
        </p>
      </div>
    </PageLayout>
  )
}
