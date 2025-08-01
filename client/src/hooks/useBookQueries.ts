import { BookApiResponse } from "@/types/book";
import { getBookDetail, getBookList } from "@/remotes/book";
import { InfiniteData } from "@tanstack/react-query";

const QUERY_KEYS = {
  BOOK: 'book',
  DETAIL: 'detail',
  INFINITE: 'infinite',
}

export function useBookQueries() {
  return {
    detail: (isbn: string) => ({
      queryKey: [QUERY_KEYS.BOOK, QUERY_KEYS.DETAIL, isbn],
      queryFn: ({ queryKey }: { queryKey: string[] }) => {
        const [, , isbn] = queryKey
        return getBookDetail(isbn)
      },
    }),
    infinite: (query: string) => ({
      queryKey: [QUERY_KEYS.BOOK, QUERY_KEYS.INFINITE, query],
      queryFn: ({ pageParam = 1 }) => {
        return getBookList(pageParam, query);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage: BookApiResponse, pages: BookApiResponse[]) => {
        return lastPage.meta.is_end ? undefined : pages.length + 1;
      },
      select: (data: InfiniteData<BookApiResponse, number>) => {
        return data.pages.flatMap((page) => page.documents);
      },
    }),
  }
}
