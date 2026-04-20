import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function PageLayout({ children, className = '' }: Props) {
  return (
    <main className={`max-w-[1280px] mx-auto px-4 py-6 w-full ${className}`}>
      {children}
    </main>
  )
}
