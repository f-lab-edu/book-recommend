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