import { css } from '@emotion/react';
import { AladinBook, Book } from '@/types/book';
import BookList from '../book/BookList';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { theme } from '@/theme';
import BookCard from '../book/BookCard';
import Grid from '../layout/Grid';

interface SearchResultsProps {
  results: AladinBook[];
  isLoading: boolean;
  error: string | null;
}

const SearchResults = ({ results, isLoading, error }: SearchResultsProps) => {
  if (isLoading) {
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
        <ErrorMessage message={error} />
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
    </div>
  );
};

export default SearchResults;
