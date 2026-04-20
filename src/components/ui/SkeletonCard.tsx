export default function SkeletonCard({ height = 'h-32' }: { height?: string }) {
  return (
    <div
      className={`skeleton rounded-xl ${height}`}
      style={{ backgroundColor: 'var(--card)' }}
    />
  )
}
