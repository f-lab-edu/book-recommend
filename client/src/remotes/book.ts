import { BOOK_DETAIL_API_URL, BOOK_LIST_API_URL } from '@/constants/api';
import {
  BookApiResponse,
  AladinBookApiResponse,
  AutoCompleteResponse,
  AladinBook,
  ItemIdType,
} from '../types/book';
import { aladinApi, api, kakaoApi } from './api';
import { QueryType } from '@/lib/query-keys';

const OPT_RESULT_PARAM = 'ebookList,usedList,reviewList';
const DEFAULT_QUERY_PARAMS = {
  Output: 'js',
  Version: '20131101',
};

export const getBooks = async (
  page: number,
  query: string,
): Promise<BookApiResponse> => {
  const response = await kakaoApi.get(`?page=${page}&query=${query}`).json();
  return response as BookApiResponse;
};

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
      .get<AladinBookApiResponse>(`${BOOK_LIST_API_URL}`, {
        searchParams: {
          ...DEFAULT_QUERY_PARAMS,
          QueryType: queryType,
          start: start,
          MaxResults: maxResults,
          ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY || '',
          SearchTarget: 'Book',
        },
      })
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

// NextJS API Route 사용
export const getAutoComplete = async (
  keyword: string,
): Promise<readonly AutoCompleteResponse[] | null> => {
  if (keyword.trim().length === 0) {
    return null;
  }

  try {
    const response = await api
      .get<
        readonly AutoCompleteResponse[]
      >(`api/autocomplete?keyword=${encodeURIComponent(keyword)}`)
      .json();

    if (!response) {
      throw new Error(`AutoComplete API error: Unknown error`);
    }

    return response;
  } catch (error) {
    console.error('getAutoComplete error:', error);
    throw error;
  }
};

export const getBookSearch = async (
  query: string,
  start: number = 1,
  maxResults: number = 10,
): Promise<AladinBookApiResponse> => {
  const response = await api.get(`api/book-search`, {
    searchParams: {
      Query: query,
      QueryType: 'Title',
      start: start,
      MaxResults: maxResults,
    },
  });
  return response.json();
};

export const getBookDetail = async (
  isbn: string,
  itemIdType: ItemIdType = 'ItemId',
): Promise<AladinBook> => {
  const response = await aladinApi.get<AladinBookApiResponse>(
    `${BOOK_DETAIL_API_URL}`,
    {
      searchParams: {
        ...DEFAULT_QUERY_PARAMS,
        OptResult: OPT_RESULT_PARAM,
        itemId: isbn,
        itemIdType: itemIdType,
        ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY || '',
      },
    },
  );

  const result = await response.json();
  return result.item[0];
};
