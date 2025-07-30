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
      request => {
        // 요청 전 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('API Request:', request.method, request.url);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        // 응답 후 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('API Response:', response.status, response.url);
        }
        return response;
      }
    ]
  }
});

// 카카오 API용 인스턴스
export const kakaoApi = ky.create({
  prefixUrl: 'https://dapi.kakao.com/v3/search/book',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: RETRYABLE_STATUS_CODES,
  },
  hooks: {
    beforeRequest: [
      request => {
        // 카카오 API 키를 헤더에 추가
        const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
        if (kakaoApiKey) {
          request.headers.set('Authorization', `KakaoAK ${kakaoApiKey}`);
        }

        // 요청 전 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('Kakao API Request:', request);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        // 응답 후 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('Kakao API Response:', response.status, response.url);
        }
        return response;
      }
    ]
  }
});

