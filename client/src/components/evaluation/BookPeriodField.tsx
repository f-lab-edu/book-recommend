import { css } from '@emotion/react';
import BookStatusPeriodStep, {
  BookStatus,
  BookStatusFormData,
} from './BookStatusPeriodStep';
import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import {
  BOOK_STATUS_COMPLETED,
  BOOK_STATUS_ON_HOLD,
  BOOK_STATUS_READING,
  BOOK_STATUS_WANT_TO_READ,
  PERIOD_REQUIREMENT,
  BOOK_STATUS_NONE,
} from '@/constants/book';
import RHFDateRangeInput from '../input/RHFDateRangeInput';

// 독서 상태에 따른 기간 필수 여부 정의
const getPeriodRequiredStatus = (status: BookStatus) => {
  switch (status) {
    case BOOK_STATUS_COMPLETED:
      return PERIOD_REQUIREMENT[BOOK_STATUS_COMPLETED];
    case BOOK_STATUS_WANT_TO_READ:
      return PERIOD_REQUIREMENT[BOOK_STATUS_WANT_TO_READ];
    case BOOK_STATUS_READING:
    case BOOK_STATUS_ON_HOLD:
      return PERIOD_REQUIREMENT[BOOK_STATUS_READING];
    default:
      return PERIOD_REQUIREMENT[BOOK_STATUS_NONE];
  }
};

export default function BookPeriodField() {
  const {
    watch,
    formState: { errors },
  } = useFormContext<BookStatusFormData>();

  const watchedStatus = watch('status');
  const requiredPeriod = getPeriodRequiredStatus(watchedStatus);
  const isPeriodRequired = requiredPeriod.some((isRequired) => isRequired);
  const isEndDateRequired = requiredPeriod[1];

  // const { startDate, endDate } = bookPeriodRules;

  return (
    <BookStatusPeriodStep.Title
      title="독서기간"
      description={
        isPeriodRequired
          ? '독서 기간을 선택해주세요.'
          : '독서 상태를 먼저 선택해주세요.'
      }
    >
      <div
        css={css`
          display: flex;
          gap: 16px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            opacity: ${isPeriodRequired ? 1 : 0.5};
            pointer-events: ${isPeriodRequired ? 'auto' : 'none'};
          `}
        >
          <span>시작일</span>
          <RHFDateRangeInput
            name="startDate"
            disabled={!isPeriodRequired}
            className={`
              border: ${errors.startDate ? '1px solid red' : 'none'};
            `}
          />
          <ErrorMessage errorMessage={errors.startDate?.message || ''} />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            opacity: ${isEndDateRequired ? 1 : 0.5};
            pointer-events: ${isEndDateRequired ? 'auto' : 'none'};
          `}
        >
          <span>종료일</span>
          <RHFDateRangeInput
            name="endDate"
            disabled={!isPeriodRequired}
            className={`
              border: ${errors.endDate ? '1px solid red' : 'none'};
            `}
          />
          <ErrorMessage errorMessage={errors.endDate?.message || ''} />
        </div>
      </div>
    </BookStatusPeriodStep.Title>
  );
}
