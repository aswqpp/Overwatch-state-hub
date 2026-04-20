import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import FilterBar from '@/components/layout/FilterBar'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import HomePage from '@/features/main/HomePage'
import MapPage from '@/features/map/MapPage'
import HeroesPage from '@/features/heroes/HeroesPage'
import HeroDetailPage from '@/features/heroes/HeroDetailPage'
import TimelinePage from '@/features/timeline/TimelinePage'
import ForecastPage from '@/features/forecast/ForecastPage'
import PatchPage from '@/features/patch/PatchPage'
import TierlistPage from '@/features/tierlist/TierlistPage'
import SettingsPage from '@/features/settings/SettingsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <FilterBar />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/heroes" element={<HeroesPage />} />
              <Route path="/heroes/:heroKey" element={<HeroDetailPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/forecast" element={<ForecastPage />} />
              <Route path="/patch" element={<PatchPage />} />
              <Route path="/tierlist" element={<TierlistPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </ErrorBoundary>

          {/* Footer */}
          <footer
            className="mt-auto px-4 py-3 text-center text-xs"
            style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}
          >
            Overwatch Meta Hub · 데이터: OverFast API (비공식) · 블리자드 공식 서비스 아님
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
