import { css } from '@emotion/react';
import { theme } from '@/theme';
import Datepicker from '../date-picker/Datepicker';
import { useFormContext } from 'react-hook-form';
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

export default function BookStatusPeriodValidation() {
  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useFormContext<BookStatusFormData>();

  return (
    <>
      <BookStatusSection
        control={control}
        errors={errors}
      />
      <BookPeriodSection
        control={control}
        errors={errors}
      />
    </>
  );
}

BookStatusPeriodValidation.Title = BookStatusPeriodTitle;
