import ky from 'ky';
import { RETRYABLE_STATUS_CODES } from '../constants/http';

// 기본 ky 인스턴스 생성 (백엔드 서버용)
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get', 'post'],
    statusCodes: RETRYABLE_STATUS_CODES,
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // 요청 전 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('API Request:', request.method, request.url);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 응답 후 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('API Response:', response.status, response.url);
        }
        return response;
      },
    ],
  },
});

// 알라딘 API용 인스턴스
// http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbrmdk6qjs2026001&QueryType=bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101
export const aladinApi = ky.create({
  prefixUrl: 'http://www.aladin.co.kr/ttb/api',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: RETRYABLE_STATUS_CODES,
  },
});
