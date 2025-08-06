import { css } from '@emotion/react';
import { theme } from '@/theme';
import Dropdown from '../drop-down/Dropdown';

const STATUS_OPTIONS = [
  { label: '읽고 싶은 책', value: 'want_to_read' },
  { label: '읽는 중', value: 'reading' },
  { label: '읽음', value: 'completed' },
  { label: '보류 중', value: 'on_hold' },
] as const;

export default function BookStatusPeriodValidation() {
  return (
    <div
      css={css`
        display: flex;
        padding: 16px;
        background-color: white;
        border-radius: 16px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        margin: ${theme.spacing.lg} 0;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: ${theme.spacing.md};
          margin-right: ${theme.spacing.xl};
        `}
      >
        <h1
          css={css`
            font-size: 24px;
            font-weight: 700;
          `}
        >
          독서 상태
        </h1>
        <p
          css={css`
            font-size: 16px;
          `}
        >
          독서 상태를 선택해주세요.
        </p>
        <Dropdown
          options={STATUS_OPTIONS}
          onChange={() => {}}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <h1
          css={css`
            font-size: 24px;
            font-weight: 700;
          `}
        >
          독서기간
        </h1>
        <p
          css={css`
            font-size: 16px;
          `}
        >
          독서 기간을 선택해주세요.
        </p>
        <div
          css={css`
            display: flex;
            gap: 16px;
          `}
        >
          <div css={css``}>
            <span>시작일</span>
          </div>
          <div css={css``}>
            <span>종료일</span>
          </div>
        </div>
      </div>
    </div>
  );
}
