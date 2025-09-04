import { css } from '@emotion/react';
import BestSellerCarousel from '../carousel/BestSellerCarousel';
import NewBookList from '../list/NewBookList';
import RecommenMusicList from '../list/RecommenMusicList';
import AsyncBoundary from '../boundary/AsyncBoundary';

const HomeMain = ({ error }: { error: { message: string } }) => {
  return (
    <>
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
    </>
  );
};

export default HomeMain;
