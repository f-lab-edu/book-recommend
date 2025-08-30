import { BEST_SELLER_API_URL } from '@/constants/api';
import { Book, BookApiResponse, AladinBookApiResponse } from '../types/book';
import { aladinApi } from './api';
import { aladinBookMapper } from '@/utils/bookMapper';

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

export const getBestSellerBooks = async (): Promise<AladinBookApiResponse> => {
  try {
    const response = await aladinApi
      .get<AladinBookApiResponse>(
        `${BEST_SELLER_API_URL}&ttbkey=${process.env.NEXT_PUBLIC_ALADIN_API_KEY}&MaxResults=5`,
      )
      .json();

    return {
      item: response.item,
      totalResults: response.totalResults,
      startIndex: response.startIndex,
      itemsPerPage: response.itemsPerPage,
    };
  } catch (error) {
    console.error('getBestSellerBooks error:', error);
    return {
      item: [],
      totalResults: 0,
      startIndex: 0,
      itemsPerPage: 0,
    };
  }
};
