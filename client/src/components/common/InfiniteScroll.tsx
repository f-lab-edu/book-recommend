import Loading from "./Loading";
import { useCallback } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { infiniteScrollStyle } from "@/styles/common.styles";

type InfiniteScrollProps = {
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const InfiniteScroll = ({ isLoading, hasNextPage, fetchNextPage }: InfiniteScrollProps) => {
  const { observerRef } = useIntersectionObserver({
    onIntersect: useCallback(() => {
      if (hasNextPage) {
        fetchNextPage();
      }
    }, [hasNextPage, fetchNextPage]),
  });

  return (
    <>
      {isLoading && (
        <div css={infiniteScrollStyle}>
          <Loading />
        </div>)}
      <div ref={observerRef} />
    </>

  )
}

export default InfiniteScroll