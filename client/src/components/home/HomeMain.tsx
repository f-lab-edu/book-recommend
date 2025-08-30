import { css } from '@emotion/react';
import BestSellerCarousel from '../carousel/BestSellerCarousel';
import NewBookList from '../list/NewBookList';
import RecommenMusicList from '../list/RecommenMusicList';
import AsyncBoundary from '../boundary/AsyncBoundary';

const HomeMain = ({ error }: { error: { message: string } }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          width: 500px;
          height: 100%;
          display: flex;
          flex-direction: column;

          background-color: #f0f0f0;
        `}
      >
        {/* 
          Step 1. 베스트셀러 API 연동
          Step 2. 신간 도서 리스트 API 연동
          Step 3. 추천 음악 리스트 API 연동(viewport 감지 시)
        */}
        <AsyncBoundary>
          <BestSellerCarousel />
        </AsyncBoundary>
        <AsyncBoundary>
          <NewBookList />
        </AsyncBoundary>
        <AsyncBoundary>
          <RecommenMusicList />
        </AsyncBoundary>
      </div>
    </div>
  );
};

export default HomeMain;
