import { css } from '@emotion/react';
import BookStatusPeriodValidation, { BookStatus, BookStatusFormData } from './BookStatusPeriodValidation';
import { Control, Controller, FieldErrors, useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import {
  BOOK_STATUS_COMPLETED,
  BOOK_STATUS_ON_HOLD,
  BOOK_STATUS_READING,
  BOOK_STATUS_WANT_TO_READ,
} from '@/constants/book';

const BOOK_STATUS_NONE = '';
const PeriodRequirement = {
  [BOOK_STATUS_COMPLETED]: [true, true],
  [BOOK_STATUS_WANT_TO_READ]: [false, false],
  [BOOK_STATUS_READING]: [true, false],
  [BOOK_STATUS_ON_HOLD]: [true, false],
  [BOOK_STATUS_NONE]: [false, false],
} as const;

// 독서 상태에 따른 기간 필수 여부 정의
const getPeriodRequiredStatus = (status: BookStatus) => {
  switch (status) {
    case BOOK_STATUS_COMPLETED:
      return PeriodRequirement[BOOK_STATUS_COMPLETED];
    case BOOK_STATUS_WANT_TO_READ:
      return PeriodRequirement[BOOK_STATUS_WANT_TO_READ];
    case BOOK_STATUS_READING:
    case BOOK_STATUS_ON_HOLD:
      return PeriodRequirement[BOOK_STATUS_READING];
    default:
      return PeriodRequirement[BOOK_STATUS_NONE];
  }
};

export default function BookPeriodSection({
  control,
  errors,
}: {
  control: Control<BookStatusFormData>;
  errors: FieldErrors<BookStatusFormData>;
}) {
  const { watch } = useFormContext<BookStatusFormData>();
  const watchedStatus = watch('status');
  const requiredPeriod = getPeriodRequiredStatus(watchedStatus);
  const isPeriodRequired = requiredPeriod.some((isRequired) => isRequired);
  const isEndDateRequired = requiredPeriod[1];

  return (
    <BookStatusPeriodValidation.Title
      title="독서기간"
      description={isPeriodRequired ? '독서 기간을 선택해주세요.' : '독서 상태를 먼저 선택해주세요.'}
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
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: isPeriodRequired ? '시작일을 선택해주세요.' : false,
              validate: (value) => {
                if (!isPeriodRequired) return true;
                if (!value) return '시작일을 선택해주세요.';
                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="date"
                value={value}
                onChange={onChange}
                disabled={!isPeriodRequired}
                css={css`
                  border: ${errors.startDate ? '1px solid red' : 'none'};
                `}
              />
            )}
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
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: isEndDateRequired ? '종료일을 선택해주세요.' : false,
              validate: (value, formValues) => {
                if (!isEndDateRequired) return true;
                if (!value) return '종료일을 선택해주세요.';
                if (formValues.startDate && value < formValues.startDate) {
                  return '종료일은 시작일보다 늦어야 합니다.';
                }
                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="date"
                value={value}
                onChange={onChange}
                disabled={!isPeriodRequired}
                css={css`
                  border: ${errors.endDate ? '1px solid red' : 'none'};
                `}
              />
            )}
          />
          <ErrorMessage errorMessage={errors.endDate?.message || ''} />
        </div>
      </div>
    </BookStatusPeriodValidation.Title>
  );
}
