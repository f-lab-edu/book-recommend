import Image from "next/image"
import { Book } from "@/types/book"
import { bookCardStyle, bookImageContainerStyle } from "@/styles/bookList.styles"
import React from "react"


type BookCardProps = {
  book: Book
}

const BookCard = React.memo(({ book }: BookCardProps) => {
  return (
    <div css={bookCardStyle}>
      <div css={bookImageContainerStyle}>
        <Image src={book.thumbnail} alt={book.title} width={100} height={100} />
      </div>
      <h3>{book.title}</h3>
      <p>{book.authors.join(", ")}</p>
      <p>{book.publisher}</p>
      <p>{book.price}</p>
    </div>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.book.title === nextProps.book.title &&
    prevProps.book.sale_price === nextProps.book.sale_price &&
    prevProps.book.thumbnail === nextProps.book.thumbnail &&
    prevProps.book.status === nextProps.book.status
  );
})

export default BookCard