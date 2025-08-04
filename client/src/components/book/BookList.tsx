import { useBookList } from '@/hooks/useBooks';
import BookCard from './BookCard';
import { bookListStyle } from '@/styles/bookList.styles';
import InfiniteScroll from '../common/InfiniteScroll';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const BookList = () => {
  const {
    data: books,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useSuspenseInfiniteQuery(useBookList('react'));

  return (
    <>
      <div css={bookListStyle}>
        {books && books.map((book) => (
          <BookCard key={book.isbn}
            book={book}
          />
        ))}
      </div>

      <InfiniteScroll
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  )
}

export default BookList