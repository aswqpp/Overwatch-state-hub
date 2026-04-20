import { useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  content: string
  children: ReactNode
}

export default function Tooltip({ content, children }: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded-md whitespace-nowrap z-50 shadow-lg pointer-events-none"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          {content}
        </span>
      )}
    </span>
  )
}
