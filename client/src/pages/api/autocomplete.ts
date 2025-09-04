import { AUTO_COMPLETE_API_URL } from '@/constants/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';
import { AladinBookApiResponse, AutoCompleteResponse } from '@/types/book';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { keyword } = req.query;

  // 키워드 검증
  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ message: 'Keyword is required' });
  }

  // 빈 키워드 체크
  if (keyword.trim().length === 0) {
    return res.status(400).json({ message: 'Keyword cannot be empty' });
  }

  try {
    console.log('kkeyword: ', keyword);

    // 알라딘 AutoComplete API 호출
    const url = `${process.env.NEXT_PUBLIC_ALADIN_API_URL}/${AUTO_COMPLETE_API_URL}&q=${keyword}`;

    console.log('UURRLL: ', url);

    const response = await ky.get(url);
    const text = await response.text();

    const regex = /cl\[\d+\]=new Array\((.*?)\);/g;
    const results: AutoCompleteResponse[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      const raw = match[1]
        .split(',')
        .map((v) => v.trim().replace(/^"|"$/g, ''));
      results.push({ value: raw[1], label: raw[2] });
    }

    if (response == null) {
      throw new Error(`Aladin API error: Unknown error`);
    }

    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 성공 응답
    res.status(200).json(results);
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
