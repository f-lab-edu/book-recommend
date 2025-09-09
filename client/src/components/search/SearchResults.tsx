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
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const SearchResults = ({
  results,
  isLoadMore,
  fetchNextPage,
  hasNextPage,
}: SearchResultsProps) => {
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
        {results.length > 0 ? (
          results.map((result) => (
            <BookCard
              key={result.isbn}
              book={result}
            />
          ))
        ) : (
          <>검색 결과가 없습니다.</>
        )}
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
