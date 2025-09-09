import { AUTO_COMPLETE_API_URL, BOOK_LIST_API_URL } from '@/constants/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';
import { AladinBookApiResponse, AutoCompleteResponse } from '@/types/book';
import { aladinApi } from '@/remotes/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { queryType } = req.query;

  if (queryType == null || typeof queryType !== 'string') {
    return res.status(400).json({ message: 'QueryType is required' });
  }

  try {
    const response = await aladinApi
      .get<AladinBookApiResponse>(`${BOOK_LIST_API_URL}`, {
        searchParams: {
          Output: 'js',
          Version: '20131101',
          QueryType: queryType,
          start: 1,
          MaxResults: 5,
          ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY || '',
          SearchTarget: 'Book',
        },
      })
      .json();

    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 성공 응답
    res.status(200).json({
      item: response.item,
      totalResults: response.totalResults,
      startIndex: response.startIndex,
      itemsPerPage: response.itemsPerPage,
    });
  } catch (error) {
    console.error('AutoComplete API error:', error);

    // 에러 응답
    res.status(500).json({
      message: 'AutoComplete search failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
