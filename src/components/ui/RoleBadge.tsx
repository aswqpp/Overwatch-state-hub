import type { HeroRole } from '@/types'

const ROLE_COLOR: Record<HeroRole, string> = {
  tank: '#4a9ff5',
  damage: '#f74b4b',
  support: '#4bcf7e',
}

const ROLE_LABEL: Record<HeroRole, string> = {
  tank: '탱커',
  damage: '딜러',
  support: '서포터',
}

interface Props {
  role: HeroRole
  size?: 'sm' | 'md'
}

export default function RoleBadge({ role, size = 'sm' }: Props) {
  const px = size === 'md' ? 'px-2.5 py-1 text-sm' : 'px-1.5 py-0.5 text-xs'
  return (
    <span
      className={`inline-flex items-center rounded font-medium ${px}`}
      style={{ backgroundColor: `${ROLE_COLOR[role]}20`, color: ROLE_COLOR[role] }}
    >
      {ROLE_LABEL[role]}
    </span>
  )
}
