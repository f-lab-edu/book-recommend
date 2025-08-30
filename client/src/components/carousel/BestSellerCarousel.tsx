import { css } from '@emotion/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
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
  // autoplay: true,
  // autoplaySpeed: 3500,
};

const BestSellerCarousel = () => {
  const { data } = useQuery<AladinBookApiResponse>({
    queryKey: QUERY_KEYS.books.bestseller(),
    queryFn: () => getBookList('bestseller'),
  });

  if (data?.item.length === 0 || data == null) {
    throw new Error(
      '베스트 셀러 데이터를 불러올 수 없습니다.\n잠시 후 다시 시도해주세요.',
    );
  }

  return (
    <div
      css={css`
        width: 100%;
        margin-bottom: 40px;
      `}
    >
      <h1
        css={css`
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        `}
      >
        이번주 베스트셀러
      </h1>
      <Slider {...settings}>
        {data?.item.map(
          ({ title, cover, link, author, publisher }: AladinBook) => (
            <Link
              href={link}
              key={title}
            >
              <div
                key={title}
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-basis: 50%;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      max-width: 200px;
                    `}
                  >
                    <h2
                      css={css`
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 10px;
                      `}
                    >
                      {title}
                    </h2>
                    <p
                      css={css`
                        font-size: 14px;
                        color: #666;
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                      `}
                    >
                      <span
                        css={css`
                          display: inline-block;
                        `}
                      >
                        {author}
                      </span>
                      <span
                        css={css`
                          display: inline-block;
                        `}
                      >
                        {publisher}
                      </span>
                    </p>
                  </div>
                </div>
                <Image
                  src={cover}
                  alt={`${title} 썸네일`}
                  width={100}
                  height={150}
                />
              </div>
            </Link>
          ),
        )}
      </Slider>
    </div>
  );
};

export default BestSellerCarousel;
