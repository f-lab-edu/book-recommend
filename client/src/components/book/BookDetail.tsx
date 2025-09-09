'use client';

import {
  cardStyle,
  headerStyle,
  coverStyle,
  imageStyle,
  placeholderStyle,
  infoStyle,
  titleStyle,
  textStyle,
  contentStyle,
  contentTitleStyle,
  contentTextStyle,
  footerStyle,
  priceStyle,
  priceTextStyle,
  salePriceStyle,
  isbnStyle,
} from '@/styles/bookDetail.styles';
import { deConcatIsbn, formatDate } from '@/utils/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useBookDetail } from '@/hooks/useBooks';
import React from 'react';
import Image from 'next/image';

export default React.memo(function BookDetail({ isbn }: { isbn: string }) {
  const { data: book } = useSuspenseQuery(useBookDetail(deConcatIsbn(isbn)));

  if (book == null) {
    throw new Error('존재하지 않는 도서 입니다.');
  }

  return (
    <div css={cardStyle}>
      <div css={headerStyle}>
        <div css={coverStyle}>
          {book.cover != '' ? (
            <Image
              src={book.cover}
              width={120}
              height={160}
              alt={book.title}
              css={imageStyle}
            />
          ) : (
            <div css={placeholderStyle}>📚</div>
          )}
        </div>
        <div css={infoStyle}>
          <h1 css={titleStyle}>{book.title}</h1>
          <p css={textStyle}>저자: {book.author}</p>
          <p css={textStyle}>출판사: {book.publisher}</p>
          <p css={textStyle}>출판일: {formatDate(book.pubDate)}</p>
        </div>
      </div>

      <div css={contentStyle}>
        <h2 css={contentTitleStyle}>책 소개</h2>
        <p css={contentTextStyle}>{book.description}</p>
      </div>

      <div css={footerStyle}>
        <div css={priceStyle}>
          <span css={priceTextStyle}>
            ₩{book.priceStandard.toLocaleString()}
          </span>
          {book.priceSales !== book.priceStandard && (
            <span css={salePriceStyle}>
              ₩{book.priceSales.toLocaleString()}
            </span>
          )}
        </div>
        <p css={isbnStyle}>ISBN: {book.isbn}</p>
      </div>
    </div>
  );
});
