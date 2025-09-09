import { css } from '@emotion/react';
import useRecommendMusicList from '@/hooks/useRecommendMusicList';
import Grid from '../layout/Grid';
import ProductCard from '../book/ProductCard';

const RecommendMusicList = () => {
  const { musicList } = useRecommendMusicList();

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px;
      `}
    >
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
      <Grid
        cols={2}
        cssObject={css`
          place-items: center;
        `}
      >
        {musicList?.item.map((music) => (
          <ProductCard
            key={music.isbn}
            product={music}
          />
        ))}
      </Grid>
    </section>
  );
};

export default RecommendMusicList;
