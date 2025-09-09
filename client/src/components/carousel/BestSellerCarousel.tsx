import { css } from '@emotion/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBookList } from '@/remotes/book';
import Image from 'next/image';
import { AladinBook, AladinBookApiResponse } from '@/types/book';
import Link from 'next/link';
import { QUERY_KEYS } from '@/lib/query-keys';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
};

const BestSellerCarousel = () => {
  const { data } = useSuspenseQuery<AladinBookApiResponse>({
    queryKey: QUERY_KEYS.books.bestseller(),
    queryFn: () => getBookList('bestseller'),
  });

  return (
    <div
      css={css`
        width: 100%;
        margin-bottom: 40px;
        background: #f8f9fa;
        border-radius: 12px;
        padding: 30px 20px;
        border: 1px solid #e9ecef;
      `}
    >
      <h1
        css={css`
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 25px;
          color: #212529;
          text-align: center;
          position: relative;

          &::after {
            content: '';
            display: block;
            width: 40px;
            height: 2px;
            background: #495057;
            margin: 12px auto 0;
            border-radius: 1px;
          }
        `}
      >
        이번주 베스트셀러
      </h1>

      <div>
        <Slider {...settings}>
          {data?.item.map(
            (
              { title, cover, link, author, publisher, priceSales }: AladinBook,
              index: number,
            ) => (
              <div key={`${title}-${index}`}>
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 30px;
                    padding: 20px;
                    min-height: 200px;
                  `}
                >
                  {/* 왼쪽: 책 정보 */}
                  <div
                    css={css`
                      flex: 1;
                      max-width: 350px;
                      color: #212529;
                    `}
                  >
                    {/* 순위 */}
                    <div
                      css={css`
                        display: inline-block;
                        background: #495057;
                        color: white;
                        padding: 6px 12px;
                        border-radius: 4px;
                        font-weight: 600;
                        font-size: 13px;
                        margin-bottom: 16px;
                      `}
                    >
                      {index + 1}위
                    </div>

                    <h2
                      css={css`
                        font-size: 20px;
                        font-weight: 600;
                        margin-bottom: 16px;
                        line-height: 1.4;
                        color: #212529;
                      `}
                    >
                      {title}
                    </h2>

                    <div
                      css={css`
                        margin-bottom: 20px;
                      `}
                    >
                      <p
                        css={css`
                          font-size: 15px;
                          color: #6c757d;
                          margin-bottom: 6px;
                          font-weight: 500;
                        `}
                      >
                        {author}
                      </p>
                      <p
                        css={css`
                          font-size: 14px;
                          color: #868e96;
                          margin-bottom: 6px;
                        `}
                      >
                        {publisher}
                      </p>
                      <p
                        css={css`
                          font-size: 16px;
                          color: #495057;
                          font-weight: 600;
                        `}
                      >
                        {priceSales?.toLocaleString()}원
                      </p>
                    </div>

                    {/* 링크 버튼 */}
                    <Link href={link}>
                      <button
                        css={css`
                          background: #495057;
                          color: white;
                          border: none;
                          padding: 10px 20px;
                          border-radius: 6px;
                          font-size: 14px;
                          font-weight: 500;
                          cursor: pointer;
                          transition: all 0.2s ease;
                          text-decoration: none;
                          display: inline-block;

                          &:hover {
                            background: #343a40;
                          }
                        `}
                      >
                        자세히 보기
                      </button>
                    </Link>
                  </div>

                  {/* 오른쪽: 책 이미지 */}
                  <div
                    css={css`
                      flex-shrink: 0;
                    `}
                  >
                    <Image
                      src={cover}
                      alt={`${title} 썸네일`}
                      width={120}
                      height={160}
                      css={css`
                        border-radius: 6px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                      `}
                    />
                  </div>
                </div>
              </div>
            ),
          )}
        </Slider>
      </div>
    </div>
  );
};

export default BestSellerCarousel;
