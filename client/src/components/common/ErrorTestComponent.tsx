import { useEffect, useState } from "react";

// Error Boundary가 잡는 에러들 테스트
export function ErrorTestComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. 렌더링 중 에러 (Error Boundary가 잡음)
  if (shouldThrow) {
    throw new Error("렌더링 중 에러");
  }

  // 2. useEffect 에러 (Error Boundary가 잡음)
  useEffect(() => {
    if (shouldThrow) {
      throw new Error("useEffect 에러");
    }
  }, [shouldThrow]);

  // 3. 이벤트 핸들러 에러 (Error Boundary가 잡지 못함)
  const handleClickError = () => {
    throw new Error("이벤트 핸들러 에러");
  };

  // 4. 비동기 에러 (Error Boundary가 잡지 못함)
  const handleAsyncError = () => {
    setTimeout(() => {
      throw new Error("비동기 에러");
    }, 1000);
  };

  // 5. 올바른 에러 처리
  const handleSafeError = () => {
    try {
      throw new Error("안전한 에러 처리");
    } catch (error) {
      setError(error instanceof Error ? error.message : "알 수 없는 에러");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Error Boundary 테스트</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Error Boundary가 잡는 에러들:</h3>
        <button onClick={() => setShouldThrow(true)}>
          렌더링 중 에러 발생
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Error Boundary가 잡지 못하는 에러들:</h3>
        <button onClick={handleClickError} style={{ marginRight: "10px" }}>
          이벤트 핸들러 에러
        </button>
        <button onClick={handleAsyncError} style={{ marginRight: "10px" }}>
          비동기 에러
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>올바른 에러 처리:</h3>
        <button onClick={handleSafeError}>안전한 에러 처리</button>
      </div>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            border: "1px solid #f44336",
            borderRadius: "4px",
          }}
        >
          <strong>에러:</strong> {error}
        </div>
      )}
    </div>
  );
}


