import Image from 'next/image';
import { AladinBook } from '@/types/book';
import {
  bookCardStyle,
  bookImageContainerStyle,
} from '@/styles/bookList.styles';
import Link from 'next/link';
import { concatIsbn } from '@/utils/utils';
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '@/theme';

type ProductCardProps = {
  product: AladinBook;
};

// 제목이 너무 길면 줄임
const truncateTitle = (title: string, maxLength: number = 25) => {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength) + '...';
};

// 저자가 여러 명이면 첫 번째만 표시
const getMainAuthor = (author: string) => {
  return author.split(',')[0].trim();
};

// 가격을 천 단위로 포맷팅
const formatPrice = (price: number) => {
  return price.toLocaleString('ko-KR');
};

// 기본 placeholder 이미지 (SVG 데이터 URL)
const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='160' viewBox='0 0 120 160'%3E%3Crect width='120' height='160' fill='%23f0f0f0'/%3E%3Ctext x='60' y='80' font-family='Arial' font-size='14' fill='%23999' text-anchor='middle'%3E책 표지%3C/text%3E%3C/svg%3E";

const ProductCard = React.memo(
  ({ product }: ProductCardProps) => {
    const [imageError, setImageError] = useState(false);

    return (
      <Link href={`/books/${concatIsbn(product.isbn)}?step=1&itemIdType=ISBN`}>
        <div css={bookCardStyle}>
          <div css={bookImageContainerStyle}>
            <Image
              src={
                imageError
                  ? placeholderImage
                  : product.cover || placeholderImage
              }
              alt={product.title}
              width={120}
              height={160}
              style={{
                objectFit: 'cover',
                borderRadius: '8px',
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
              }}
              onError={() => setImageError(true)}
            />
          </div>

          <div
            css={css`
              font-size: 16px;
              font-weight: 600;
              color: ${theme.colors.text.primary};
              margin-bottom: ${theme.spacing.xs};
              line-height: 1.4;
              min-height: 44px; /* 최소 높이만 설정 */
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break: keep-all;
              text-overflow: ellipsis;
            `}
          >
            {truncateTitle(product.title)}
          </div>
          <div
            css={css`
              font-size: 14px;
              color: ${theme.colors.text.secondary};
              margin-bottom: ${theme.spacing.xs};
              font-weight: 500;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {getMainAuthor(product.author)}
          </div>
          <div
            css={css`
              font-size: 13px;
              color: ${theme.colors.text.tertiary};
              margin-bottom: ${theme.spacing.xs};
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {product.publisher}
          </div>
          <div
            css={css`
              font-size: 16px;
              font-weight: 700;
              color: ${theme.colors.primary};
              margin-top: auto;
              text-align: right;
            `}
          >
            {formatPrice(product.priceSales)}원
          </div>
        </div>
      </Link>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.product.title === nextProps.product.title &&
      prevProps.product.priceSales === nextProps.product.priceSales &&
      prevProps.product.cover === nextProps.product.cover &&
      prevProps.product.author === nextProps.product.author &&
      prevProps.product.publisher === nextProps.product.publisher
    );
  },
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
