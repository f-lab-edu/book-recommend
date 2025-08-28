import { css, CSSObject } from '@emotion/react';

export default function ErrorMessage({
  errorMessage,
  customCss,
}: {
  errorMessage: string;
  customCss?: CSSObject;
}) {
  return (
    errorMessage && (
      <span
        css={css`
          color: #dc3545;
          font-size: 14px;
          ${customCss}
        `}
      >
        {errorMessage}
      </span>
    )
  );
}
