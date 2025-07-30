import { useBookList } from '@/hooks/useBookList';
import BookCard from './BookCard';
import { css } from '@emotion/react';
import { theme } from '@/theme';

const BookList = () => {
  const { data: books, isLoading, isFetching, isError, fetchNextPage, hasNextPage, error } = useBookList();

  return (
    <div css={css`
      display: grid;
      width: 80%;
      margin: 0 auto;

      ${theme.breakpoints.mobile} {
        grid-template-columns: repeat(2, 1fr);
        gap: ${theme.spacing.xs};
      }
      ${theme.breakpoints.tablet} {
        grid-template-columns: repeat(4, 1fr);
        gap: ${theme.spacing.sm};
      }
      ${theme.breakpoints.desktop} {
        grid-template-columns: repeat(2, 1fr);
        gap: ${theme.spacing.md};
      }
    `}>
      {books && books.map((book) => (
        <BookCard key={book.isbn}
          book={book}
        />
      ))}
    </div>
  )
}

export default BookList