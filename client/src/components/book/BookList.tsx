import { useBookList } from '@/hooks/useBookList';
import BookCard from './BookCard';
import { bookListStyle } from '@/styles/bookList.styles';
import InfiniteScroll from '../common/InfiniteScroll';

const BookList = () => {
  const { data: books, isFetchingNextPage, fetchNextPage, hasNextPage } = useBookList();

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