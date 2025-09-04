export type BookApiResponse = {
  documents: Book[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
};

// 알라딘 API 원본 응답 타입
export type AladinBookApiResponse = {
  item: AladinBook[];
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
};

export type AladinBook = {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: string;
  priceSales: number;
  priceStandard: number;
  publisher: string;
  cover: string;
  stockStatus: string;
  adult: boolean;
  bastRank: number;
  seriesInfo?: {
    seriesId: number;
    seriesLink: string;
    seriesName: string;
  };
};

// 변환된 Book 타입 (기존 타입 유지)
export type Book = {
  title: string;
  authors: string[];
  translators?: string[];
  publisher: string;
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  sale_price: number;
  status: string;
  thumbnail: string;
  url: string;
};

// DTO 변환을 위한 인터페이스
export interface BookMapper {
  toBook(aladinBook: AladinBook): Book;
  toBookList(aladinBooks: AladinBook[]): Book[];
}

export type BookQuote = {
  quotes: {
    pageNum: number;
    quote: string;
  }[];
};

export type AutoCompleteResponse = {
  value: string;
  label: string;
};
