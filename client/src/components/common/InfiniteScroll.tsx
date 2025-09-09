import Loading from './Loading';
import { useCallback } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { css } from '@emotion/react';
import { theme } from '@/theme';

type InfiniteScrollProps = {
  isLoadMore: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

const InfiniteScroll = ({
  isLoadMore,
  hasNextPage,
  fetchNextPage,
}: InfiniteScrollProps) => {
  const { observerRef } = useIntersectionObserver({
    onIntersect: useCallback(() => {
      if (hasNextPage) {
        fetchNextPage();
      }
    }, [hasNextPage, fetchNextPage]),
  });

  return (
    <>
      {isLoadMore && (
        <div
          css={css`
            display: flex;
            justify-content: center;
            margin: ${theme.spacing.md} 0;
          `}
        >
          <Loading />
        </div>
      )}
      <div ref={observerRef} />
    </>
  );
};

export default InfiniteScroll;
