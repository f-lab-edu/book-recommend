import { css } from '@emotion/react';

const RecommenMusicList = () => {
  return (
    <section>
      <h2
        css={css`
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #333;
          cursor: pointer;
        `}
      >
        추천 음악 &gt;{' '}
      </h2>
    </section>
  );
};

export default RecommenMusicList;
