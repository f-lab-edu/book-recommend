import BestSellerCarousel from '../carousel/BestSellerCarousel';
import NewBookList from '../list/NewBookList';
import AsyncBoundary from '../boundary/AsyncBoundary';
import dynamic from 'next/dynamic';
import RecommendMusicList from '../list/RecommendMusicList';

// const RecommendMusicList = dynamic(() => import('../list/RecommendMusicList'), {
//   ssr: false,
// });

const HomeMain = () => {
  return (
    <>
      <AsyncBoundary>
        <BestSellerCarousel />
      </AsyncBoundary>
      <AsyncBoundary>
        <NewBookList />
      </AsyncBoundary>
      <AsyncBoundary>
        <RecommendMusicList />
      </AsyncBoundary>
    </>
  );
};

export default HomeMain;
