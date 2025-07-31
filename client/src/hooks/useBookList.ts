import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Book } from "@/types/book";
import { kakaoApi } from "@/remotes/api";

type BookListResponse = {
  documents: Book[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

export function useBookList() {
  return useSuspenseInfiniteQuery({
    queryKey: ['books', "infinite"],
    getNextPageParam: (lastPage: BookListResponse, pages) => {
      return lastPage.meta.is_end ? undefined : pages.length + 1;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      return kakaoApi.get(`?page=${pageParam}&query="react"`).json();
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.documents);
    }
  })
}
