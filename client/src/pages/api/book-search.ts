import type { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';
import { AladinBookApiResponse } from '@/types/book';
import { BOOK_SEARCH_API_URL } from '@/constants/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { Query, QueryType, start, MaxResults } = req.query;

  // 검색어 검증
  if (!Query || typeof Query !== 'string') {
    return res.status(400).json({ message: 'Query is required' });
  }

  // 빈 검색어 체크
  if (Query.trim().length === 0) {
    return res.status(400).json({ message: 'Query cannot be empty' });
  }

  try {
    // 알라딘 BookSearch API 호출
    const url = `${process.env.NEXT_PUBLIC_ALADIN_API_URL}/${BOOK_SEARCH_API_URL}&ttbkey=${process.env.NEXT_PUBLIC_ALADIN_API_KEY}&Query=${Query}&QueryType=${QueryType}&start=${start}&MaxResults=${MaxResults}`;

    const response = await ky.get(url);
    const results = await response.json();
    if (response == null) {
      throw new Error(`Aladin API error: Unknown error`);
    }

    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 성공 응답
    res.status(200).json(results as AladinBookApiResponse);
  } catch (error) {
    console.error('BookSearch API error:', error);

    // 에러 응답
    res.status(500).json({
      message: 'BookSearch search failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
