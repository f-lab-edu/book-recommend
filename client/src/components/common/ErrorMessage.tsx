import { css } from '@emotion/react';

export default function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    errorMessage && (
      <span
        css={css`
          color: #dc3545;
          font-size: 14px;
        `}
      >
        {errorMessage}
      </span>
    )
  );
}
