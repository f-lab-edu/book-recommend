import { BookApiResponse } from '@/types/book';
import { getBookDetail, getBooks } from '@/remotes/book';
import { InfiniteData } from '@tanstack/react-query';

export const QUERY_KEYS = {
  BOOK: 'book',
  DETAIL: 'detail',
  INFINITE: 'infinite',
} as const;

// 책 상세 정보 조회 훅
export function useBookDetail(isbn: string) {
  return {
    queryKey: [QUERY_KEYS.BOOK, QUERY_KEYS.DETAIL, isbn] as const,
    queryFn: () => getBookDetail(isbn),
  };
}

// 책 목록 무한 스크롤 훅
export function useBookList(query: string) {
  return {
    queryKey: [QUERY_KEYS.BOOK, QUERY_KEYS.INFINITE, query] as const,
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) => {
      return getBooks(pageParam, query);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookApiResponse, pages: BookApiResponse[]) => {
      return lastPage.meta.is_end ? undefined : pages.length + 1;
    },
    select: (data: InfiniteData<BookApiResponse, number>) => {
      return data.pages.flatMap((page) => page.documents);
    },
  };
}
