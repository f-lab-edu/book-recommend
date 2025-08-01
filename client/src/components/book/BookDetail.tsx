import { cardStyle, headerStyle, coverStyle, imageStyle, placeholderStyle, infoStyle, titleStyle, textStyle, contentStyle, contentTitleStyle, contentTextStyle, footerStyle, priceStyle, priceTextStyle, salePriceStyle, isbnStyle } from "@/styles/bookDetail.styles";
import { deConcatIsbn, formatDate } from "@/utils/utils";
import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useBookQueries } from "@/hooks/useBookQueries";
import { redirect } from "next/navigation";

export default React.memo(function BookDetail({ isbn }: { isbn: string }) {
  const { data: book } = useSuspenseQuery(useBookQueries().detail(deConcatIsbn(isbn)));

  if (book == null) {
    redirect('/')
  }

  return (
    <div css={cardStyle}>
      <div css={headerStyle}>
        <div css={coverStyle}>
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={book.title}
              css={imageStyle}
            />
          ) : (
            <div css={placeholderStyle}>📚</div>
          )}
        </div>
        <div css={infoStyle}>
          <h1 css={titleStyle}>{book.title}</h1>
          <p css={textStyle}>저자: {book.authors.join(", ")}</p>
          <p css={textStyle}>출판사: {book.publisher}</p>
          <p css={textStyle}>출판일: {formatDate(book.datetime)}</p>
        </div>
      </div>

      <div css={contentStyle}>
        <h2 css={contentTitleStyle}>책 소개</h2>
        <p css={contentTextStyle}>{book.contents}</p>
      </div>

      <div css={footerStyle}>
        <div css={priceStyle}>
          <span css={priceTextStyle}>₩{book.price.toLocaleString()}</span>
          {book.sale_price !== book.price && (
            <span css={salePriceStyle}>₩{book.sale_price.toLocaleString()}</span>
          )}
        </div>
        <p css={isbnStyle}>ISBN: {book.isbn}</p>
      </div>
    </div>
  )
});