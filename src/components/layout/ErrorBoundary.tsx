import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex flex-col items-center justify-center p-8 text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            <p className="text-4xl mb-4">⚠️</p>
            <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>
              페이지 렌더링 오류
            </p>
            <p className="text-sm">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ backgroundColor: 'var(--accent)', color: '#000' }}
            >
              다시 시도
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
