import { useRouter } from "next/router";
import { useStepValidation } from "@/hooks/useStepValidation";
import { css } from "@emotion/react";
import { useEffect } from "react";

// 페이지 진입 시 client 환경에서 유효성 검사를 위한 컴포넌트
export default function BookDetailPageValidator({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isValid, error } = useStepValidation();

  if (!isValid) {
    return (
      <div
        css={css`
          padding: 40px 20px;
          text-align: center;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        `}
      >
        <div>
          <h2 style={{ marginBottom: "10px", color: "#e74c3c" }}>
            오류가 발생했습니다
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>{error}</p>
        </div>
        <button
          onClick={() => router.push("/")}
          css={css`
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          `}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
