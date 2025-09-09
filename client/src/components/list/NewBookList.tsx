import { getBookList } from '@/remotes/book';
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-keys';
import Grid from '../layout/Grid';
import BookCard from '../book/BookCard';

const NewBookList = () => {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.books.newbooks(),
    queryFn: () => getBookList('ItemNewSpecial'),
  });

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px;
      `}
    >
      <h2
        css={css`
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #333;
          cursor: pointer;
        `}
      >
        신간 도서 &gt;
      </h2>
      <Grid
        cols={2}
        cssObject={css`
          place-items: center;
        `}
      >
        {data?.item.map((book) => (
          <BookCard
            key={book.isbn}
            book={book}
          />
        ))}
      </Grid>
    </section>
  );
};

export default NewBookList;
