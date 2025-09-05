import { css } from '@emotion/react';
import { AladinBook, Book } from '@/types/book';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { theme } from '@/theme';
import BookCard from '../book/BookCard';
import Grid from '../layout/Grid';
import InfiniteScroll from '../common/InfiniteScroll';

interface SearchResultsProps {
  results: AladinBook[];
  isLoadMore: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const SearchResults = ({
  results,
  isLoadMore,
  error,
  fetchNextPage,
  hasNextPage,
}: SearchResultsProps) => {
  if (isLoadMore) {
    return (
      <div
        css={css`
          margin-top: ${theme.spacing.lg};
        `}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        css={css`
          margin-top: ${theme.spacing.lg};
        `}
      >
        <ErrorMessage errorMessage={error.message} />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div
        css={css`
          margin-top: ${theme.spacing.lg};
          text-align: center;
          color: ${theme.colors.text.secondary};
        `}
      >
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: ${theme.spacing.lg};
      `}
    >
      <Grid cols={2}>
        {results.map((result) => (
          <BookCard
            key={result.isbn}
            book={result}
          />
        ))}
      </Grid>
      <InfiniteScroll
        isLoadMore={isLoadMore}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default SearchResults;
