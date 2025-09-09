import BestSellerCarousel from '../carousel/BestSellerCarousel';
import NewBookList from '../list/NewBookList';
import RecommendMusicList from '../list/RecommendMusicList';
import AsyncBoundary from '../boundary/AsyncBoundary';

const HomeMain = () => {
  return (
    <>
      <AsyncBoundary>
        <BestSellerCarousel />
      </AsyncBoundary>
      <AsyncBoundary>
        <NewBookList />
      </AsyncBoundary>
      {/* 
          TODO
          Step 3. 추천 음악 리스트 API 연동(viewport 감지 시)
        */}
      {/* <AsyncBoundary>
        <RecommendMusicList />
      </AsyncBoundary> */}
    </>
  );
};

export default HomeMain;
