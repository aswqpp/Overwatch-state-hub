import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const PROXY_PORT = Number(process.env.PROXY_PORT ?? 5174)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': '/src' },
  },
  server: {
    proxy: {
      '/api/overfast': {
        target: `http://localhost:${PROXY_PORT}`,
        changeOrigin: true,
      },
    },
  },
})
