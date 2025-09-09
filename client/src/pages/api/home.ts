import { PRODUCT_LIST_API_URL } from '@/constants/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AladinBookApiResponse } from '@/types/book';
import { aladinApi } from '@/remotes/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { QueryType, CategoryId, start, MaxResults } = req.query;

  if (
    QueryType == null ||
    typeof QueryType !== 'string' ||
    CategoryId == null ||
    typeof CategoryId !== 'string' ||
    start == null ||
    typeof start !== 'string' ||
    MaxResults == null ||
    typeof MaxResults !== 'string'
  ) {
    return res
      .status(400)
      .json({ message: 'QueryType and CategoryId is required' });
  }

  try {
    const response = await aladinApi
      .get<AladinBookApiResponse>(`${PRODUCT_LIST_API_URL}`, {
        searchParams: {
          Output: 'js',
          Version: '20131101',
          QueryType,
          start,
          MaxResults,
          ttbkey: process.env.NEXT_PUBLIC_ALADIN_API_KEY || '',
          SearchTarget: 'Book',
          CategoryId: CategoryId ?? '',
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
