import { css, CSSObject } from '@emotion/react';

type GridProps = {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
  cssObject?: CSSObject;
};

const Grid = ({ children, cols = 4, gap = 16, cssObject }: GridProps) => {
  return (
    <div
      css={css`
        display: grid;
        width: 100%;
        grid-template-columns: repeat(${cols}, 1fr);
        gap: ${gap}px;
        ${cssObject}
      `}
    >
      {children}
    </div>
  );
};

export default Grid;
