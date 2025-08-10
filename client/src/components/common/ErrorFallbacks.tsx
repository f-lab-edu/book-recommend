import { FallbackProps } from "react-error-boundary";
import { useRouter } from "next/router";

export const BookListErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <div className="book-list-error">
      <h3>책 목록을 불러올 수 없습니다</h3>
      <p>잠시 후 다시 시도해주세요</p>
      <span>{error.message}</span>
      <button onClick={resetErrorBoundary}>새로고침</button>
    </div>
  );
};

export const BookDetailErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const router = useRouter();

  return (
    <div className="book-detail-error">
      <h3>책 상세 정보를 불러올 수 없습니다</h3>
      <p>잠시 후 다시 시도해주세요</p>
      <span>{error.message}</span>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button onClick={resetErrorBoundary}>새로고침</button>
        <button onClick={() => router.push("/")}>홈으로 돌아가기</button>
      </div>
    </div>
  );
};
