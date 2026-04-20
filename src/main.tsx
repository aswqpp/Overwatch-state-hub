import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initTheme } from '@/stores/uiStore'
import './index.css'
import App from './App.tsx'

// Apply stored theme before first render to avoid flash
initTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
