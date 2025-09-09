import { css } from '@emotion/react';
import { AladinBook } from '@/types/book';
import { theme } from '@/theme';
import Grid from '../layout/Grid';
import InfiniteScroll from '../common/InfiniteScroll';
import ProductCard from '../book/ProductCard';

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
            <ProductCard
              key={result.isbn}
              product={result}
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
