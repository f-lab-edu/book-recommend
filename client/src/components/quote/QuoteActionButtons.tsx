import { css } from '@emotion/react';

export default function QuoteActionButtons({
  handleReset,
  handleAddQuote,
  isSubmitting,
}: {
  handleReset: () => void;
  handleAddQuote: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        gap: 10px;
      `}
    >
      <button
        css={css`
          display: flex;
          width: 50%;
          height: 40px;
          justify-content: center;
          align-items: center;
          border: 1px solid #000;
          background-color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        `}
        onClick={handleReset}
      >
        초기화
      </button>
      <button
        css={css`
          display: flex;
          width: 50%;
          height: 40px;
          justify-content: center;
          align-items: center;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        `}
        disabled={isSubmitting}
        onClick={handleAddQuote}
      >
        작성
      </button>
    </div>
  );
}
