import { PropsWithChildren, Suspense } from "react";
import Loading from "./Loading";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type SuspenseBoundaryProps = {
  children: React.ReactNode;
  loading?: React.ReactNode;
  rejectedFallback?: (props: FallbackProps) => React.ReactNode;
}

function SuspenseBoundary({ children, loading = <Loading />, rejectedFallback }: SuspenseBoundaryProps) {
  const defaultErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>문제가 발생했습니다.</h3>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>재시도</button>
    </div>
  );

  return (
    <ErrorBoundary fallbackRender={rejectedFallback || defaultErrorFallback}>
      <Suspense fallback={loading}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default SuspenseBoundary;