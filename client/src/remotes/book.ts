import { BOOK_LIST_API_URL } from '@/constants/api';
import { Book, BookApiResponse, AladinBookApiResponse } from '../types/book';
import { aladinApi } from './api';
import { aladinBookMapper } from '@/utils/bookMapper';
import { QueryType } from '@/lib/query-keys';

// export const getBookList = async (
//   page: number,
//   query: string,
// ): Promise<BookApiResponse> => {
//   const response = await kakaoApi.get(`?page=${page}&query=${query}`).json();
//   return response as BookApiResponse;
// };

// export const getBookDetail = async (isbn: string): Promise<Book> => {
//   const response = (await kakaoApi
//     .get(`?target=isbn&query=${isbn}`)
//     .json()) as BookApiResponse;
//   return response.documents.flatMap((page) => page)[0];
// };

export const getBookList = async (
  queryType: QueryType,
  filter?: {
    start?: number;
    maxResults?: number;
  },
): Promise<AladinBookApiResponse> => {
  try {
    const start = filter?.start ?? 1;
    const maxResults = filter?.maxResults ?? 5;

    const response = await aladinApi
      .get<AladinBookApiResponse>(
        `${BOOK_LIST_API_URL}&ttbkey=${process.env.NEXT_PUBLIC_ALADIN_API_KEY}&QueryType=${queryType}&start=${start}&MaxResults=${maxResults}`,
      )
      .json();

    return {
      item: response.item,
      totalResults: response.totalResults,
      startIndex: response.startIndex,
      itemsPerPage: response.itemsPerPage,
    };
  } catch (error) {
    console.error('getBookList error:', error);
    return {
      item: [],
      totalResults: 0,
      startIndex: 0,
      itemsPerPage: 0,
    };
  }
};
