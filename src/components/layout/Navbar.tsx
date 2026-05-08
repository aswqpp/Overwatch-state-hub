import { NavLink } from 'react-router-dom'
import { useT } from '@/i18n'
import { useUIStore, applyTheme } from '@/stores/uiStore'

const NAV_ITEMS = [
  { to: '/', label: 'home', icon: '📊' },
  { to: '/map', label: 'map', icon: '🗺️' },
  { to: '/heroes', label: 'heroes', icon: '🦸' },
  { to: '/timeline', label: 'timeline', icon: '📈' },
  { to: '/forecast', label: 'forecast', icon: '🔮' },
  { to: '/patch', label: 'patch', icon: '📋' },
  { to: '/tierlist', label: 'tierlist', icon: '🏆' },
] as const

type NavLabel = (typeof NAV_ITEMS)[number]['label']

export default function Navbar() {
  const t = useT()
  const { theme, setTheme } = useUIStore()

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  return (
    <header
      style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span
            className="font-display font-bold text-xl tracking-wide"
            style={{ color: 'var(--accent)' }}
          >
            OW
          </span>
          <span
            className="font-display font-semibold text-base hidden sm:block"
            style={{ color: 'var(--text)' }}
          >
            Meta Hub
          </span>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--accent)] bg-[var(--card)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card)]'
                }`
              }
            >
              <span className="text-base">{icon}</span>
              <span className="hidden md:block">{t(label as NavLabel)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Theme toggle + settings */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors hover:bg-[var(--card)] text-[var(--text-muted)]"
            aria-label={t('themeToggleAria')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <NavLink
            to="/settings"
            className="w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors hover:bg-[var(--card)] text-[var(--text-muted)]"
            aria-label={t('settingsAria')}
          >
            ⚙️
          </NavLink>
        </div>
      </div>
    </header>
  )
}
