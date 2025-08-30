import { css } from '@emotion/react';
import BestSellerCarousel from '../carousel/BestSellerCarousel';
import NewBookList from '../list/NewBookList';
import RecommenMusicList from '../list/RecommenMusicList';

const HomeMain = () => {
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
        <BestSellerCarousel />
        <NewBookList />
        <RecommenMusicList />
      </div>
    </div>
  );
};

export default HomeMain;
