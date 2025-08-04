import { FallbackProps } from 'react-error-boundary'

export const BookListErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="book-list-error">
      <h3>책 목록을 불러올 수 없습니다</h3>
      <p>잠시 후 다시 시도해주세요</p>
      <span>{error.message}</span>
      <button onClick={resetErrorBoundary}>새로고침</button>
    </div>
  )
}

export const BookDetailErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="book-detail-error">
      <h3>책 상세 정보를 불러올 수 없습니다</h3>
      <p>잠시 후 다시 시도해주세요</p>
      <span>{error.message}</span>
      <button onClick={resetErrorBoundary}>새로고침</button>
    </div>
  )
}
