import { getBookSearch } from '@/remotes/book';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { QUERY_KEYS } from '@/lib/query-keys';

export const useInfiniteBookSearch = (maxResults: number) => {
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim().length > 0) {
      setQuery(keyword);
    }
  };

  const infiniteQuery = useInfiniteQuery({
    queryKey: QUERY_KEYS.books.infinite(query, maxResults),
    queryFn: ({ pageParam = 1 }) => getBookSearch(query, pageParam, maxResults),
    initialPageParam: 1,
    getNextPageParam: ({ totalResults, startIndex, itemsPerPage }) => {
      return totalResults > (startIndex + 1) * itemsPerPage
        ? startIndex + 1
        : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.item),
    enabled: query.trim().length > 0, // query가 있을 때만 실행
  });

  return {
    ...infiniteQuery,
    setKeyword,
    keyword,
    handleSearch,
  };
};
