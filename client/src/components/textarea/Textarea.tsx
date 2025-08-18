import { theme } from '@/theme';
import { css } from '@emotion/react';

type TextareaProps = {
  disabled?: boolean;
};

export default function Textarea({ disabled, ...props }: TextareaProps) {
  return (
    <textarea
      disabled={disabled}
      css={css`
        width: 100%;
        height: 100px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        resize: vertical;
        max-height: 200px;
        min-height: 100px;
        outline: none;
        font-size: ${theme.fontSize.sm};
        ${disabled === true &&
        css`
          background-color: #f0f0f0;
        `}
      `}
      {...props}
    />
  );
}
