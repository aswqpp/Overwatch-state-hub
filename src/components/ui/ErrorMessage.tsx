import { OverFastError } from '@/api/overfast'

interface Props {
  error: Error
  onRetry?: () => void
}

export default function ErrorMessage({ error, onRetry }: Props) {
  const isRateLimit = error instanceof OverFastError && error.status === 429
  const isDown = error instanceof OverFastError && error.status === 503

  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-center rounded-xl"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <p className="text-4xl mb-3">{isRateLimit ? '⏱️' : isDown ? '🔧' : '⚠️'}</p>
      <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
        {isRateLimit
          ? 'API 요청 횟수 초과'
          : isDown
            ? '서버 일시 점검 중'
            : '데이터를 불러올 수 없습니다'}
      </p>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        {error.message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--accent)', color: '#000' }}
        >
          다시 시도
        </button>
      )}
    </div>
  )
}
