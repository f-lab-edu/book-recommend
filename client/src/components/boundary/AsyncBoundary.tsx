import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

type AsyncBoundaryProps = {
  children: React.ReactNode;
  loading?: React.ReactNode;
  rejectedFallback?: (props: FallbackProps) => React.ReactNode;
};

const AsyncBoundary = ({
  children,
  loading = <AsyncBoundary.Loading />,
  rejectedFallback = (props) => <ErrorFallback {...props} />,
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary fallbackRender={rejectedFallback}>
      <Suspense fallback={loading}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
      `}
    >
      {error.message}
      <button
        css={css`
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
        `}
        onClick={() => resetErrorBoundary()}
      >
        Try again
      </button>
    </div>
  );
};

const Loading = () => {
  return <div>Loading...</div>;
};

AsyncBoundary.ErrorFallback = ErrorFallback;
AsyncBoundary.Loading = Loading;
