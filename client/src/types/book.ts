export type BookApiResponse = {
  documents: Book[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

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
}