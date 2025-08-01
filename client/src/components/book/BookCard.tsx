import Image from "next/image"
import { Book } from "@/types/book"
import { bookCardStyle, bookImageContainerStyle } from "@/styles/bookList.styles"
import Link from "next/link"
import { concatIsbn } from "@/utils/utils"


type BookCardProps = {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link href={`/books/${concatIsbn(book.isbn)}?step=1`} passHref>
      <div css={bookCardStyle}>
        <div css={bookImageContainerStyle}>
          <Image src={book.thumbnail} alt={book.title} width={100} height={100} />
        </div>
        <h3>{book.title}</h3>
        <p>{book.authors.join(", ")}</p>
        <p>{book.publisher}</p>
        <p>{book.price}</p>
      </div>
    </Link>
  )
}

export default BookCard