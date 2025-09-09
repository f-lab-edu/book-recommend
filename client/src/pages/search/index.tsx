import BookSearchList from '@/components/list/BookSearchList';
import AsyncBoundary from '@/components/boundary/AsyncBoundary';

export default function BookSearchPage() {
  /**
   * TODO
   * 1. 자동 완성 API 연동(aladin API)
   * 2. 자동 완성 기능 구현(AutoInputComplete 컴포넌트)
   * 3. 자동 완성 UI
   * 4. 키워드 검색 목록 리스트 API 연동
   * 5. 키워드 검색 목록 리스트 카드 UI
   * 6. 키워드 검색 목록 리스트 무한 스크롤 구현
   * 7. 검색 목록 이미지 최적화 & LCP 개선
   */
  return (
    <AsyncBoundary>
      <BookSearchList />
    </AsyncBoundary>
  );
}
