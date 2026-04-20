import type { Tier } from '@/types'

const TIER_COLOR: Record<Tier, string> = {
  S: '#ff5722',
  A: '#ffc107',
  B: '#42a5f5',
  C: '#66bb6a',
  D: '#90a4ae',
}

export default function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded font-display font-bold text-sm text-white"
      style={{ backgroundColor: TIER_COLOR[tier] }}
    >
      {tier}
    </span>
  )
}
