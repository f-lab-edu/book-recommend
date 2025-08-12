import { css } from '@emotion/react';
import { theme } from '@/theme';
import BookStatusSection from './BookStatusSection';
import BookPeriodSection from './BookPeriodSection';
import { BOOK_STATUS_OPTIONS } from '@/constants/book';

// STATUS_OPTIONS의 value 값들을 타입으로 추출
export type BookStatus = (typeof BOOK_STATUS_OPTIONS)[number]['value'] | '';

export type BookStatusFormData = {
  status: BookStatus;
  startDate?: string;
  endDate?: string;
};

const BookStatusPeriodTitle = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
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
          font-size: 20px;
          font-weight: 700;
        `}
      >
        {title}
      </h1>
      <p
        css={css`
          font-size: 16px;
        `}
      >
        {description}
      </p>
      {children}
    </div>
  );
};

export default function BookStatusPeriodStep() {
  return (
    <form
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
      <BookStatusSection />
      <BookPeriodSection />
    </form>
  );
}

BookStatusPeriodStep.Title = BookStatusPeriodTitle;
