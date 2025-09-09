import { QUERY_KEYS } from '@/lib/query-keys';
import { getProductList } from '@/remotes/book';
import { useSuspenseQuery } from '@tanstack/react-query';

const useRecommendMusicList = () => {
  const query = useSuspenseQuery({
    queryKey: QUERY_KEYS.recommend.music(),
    queryFn: () => getProductList('ItemEditorChoice', {}, '5915'),
  });

  return {
    ...query,
    musicList: query.data,
  };
};

export default useRecommendMusicList;
