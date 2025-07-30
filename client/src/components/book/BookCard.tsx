import Image from "next/image"
import { Book } from "@/types/book"
import { css } from "@emotion/react"
import { theme } from "@/theme"


type BookCardProps = {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      cursor: pointer;
      border: 1px solid ${theme.colors.secondary};
      border-radius: ${theme.spacing.sm};
      padding: ${theme.spacing.sm};
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      }
    `}>
      <Image src={book.thumbnail} alt={book.title} width={100} height={100} />
      <h3>{book.title}</h3>
      <p>{book.authors.join(", ")}</p>
      <p>{book.publisher}</p>
      <p>{book.price}</p>
    </div>
  )
}

export default BookCard