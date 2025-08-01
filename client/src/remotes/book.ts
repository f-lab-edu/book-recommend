import { Book, BookApiResponse } from "../types/book"
import { kakaoApi } from "./api"

export const getBookList = async (page: number, query: string): Promise<BookApiResponse> => {
  const response = await kakaoApi.get(`?page=${page}&query=${query}`).json()
  return response as BookApiResponse
}

export const getBookDetail = async (isbn: string): Promise<Book> => {
  const response = await kakaoApi.get(`?target=isbn&query=${isbn}`).json() as BookApiResponse
  return response.documents.flatMap((page) => page)[0]
}