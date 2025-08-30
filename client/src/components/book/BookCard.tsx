import Image from 'next/image';
import { AladinBook } from '@/types/book';
import {
  bookCardStyle,
  bookImageContainerStyle,
} from '@/styles/bookList.styles';
import Link from 'next/link';
import { concatIsbn } from '@/utils/utils';
import React from 'react';

type BookCardProps = {
  book: AladinBook;
};

const BookCard = React.memo(
  ({ book }: BookCardProps) => {
    return (
      <Link href={`/books/${concatIsbn(book.isbn)}?step=1`}>
        <div css={bookCardStyle}>
          <div css={bookImageContainerStyle}>
            <Image
              src={book.cover}
              alt={book.title}
              width={100}
              height={100}
            />
          </div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>{book.priceSales}</p>
        </div>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.book.title === nextProps.book.title &&
      prevProps.book.priceSales === nextProps.book.priceSales &&
      prevProps.book.cover === nextProps.book.cover &&
      prevProps.book.stockStatus === nextProps.book.stockStatus
    );
  },
);

BookCard.displayName = 'BookCard';

export default BookCard;
