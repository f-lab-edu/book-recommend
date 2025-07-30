import { useInfiniteQuery } from "@tanstack/react-query";
import { Book } from "@/types/book";
import { kakaoApi } from "@/remotes/api";
import { usePathname } from "next/navigation";

type BookListResponse = {
  documents: Book[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

export function useBookList() {
  const pathName = usePathname();

  return useInfiniteQuery({
    queryKey: ['books'],
    getNextPageParam: (lastPage: BookListResponse, pages) => {
      return lastPage.meta.is_end ? undefined : pages.length + 1;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      console.log('pageParam: ', pageParam);
      return kakaoApi.get(`?page=${pageParam}&query="react"`).json();
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.documents);
    }
  })
}
