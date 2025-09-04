import { useState, useCallback } from 'react';
import { getBookSearch } from '@/remotes/book';
import { AladinBook } from '@/types/book';
import { useRouter } from 'next/router';

export const useBookSearch = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<AladinBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await getBookSearch(keyword, 1, 10);
      setSearchResults(results.item);
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectBook = (isbn: string) => {
    router.push(`/books/${isbn}`);
  };

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    isLoading,
    error,
    searchBooks,
    clearResults,
    selectBook,
  };
};
