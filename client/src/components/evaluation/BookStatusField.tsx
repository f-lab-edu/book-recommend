import { BOOK_STATUS_OPTIONS } from '@/constants/book';
import { Controller, useFormContext } from 'react-hook-form';
import Dropdown from '../drop-down/Dropdown';
import ErrorMessage from '../common/ErrorMessage';
import BookStatusPeriodStep from './BookStatusPeriodStep';
import { BookEvaluation } from '@/schema/bookEvaluation';
import { useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '@/theme';

const getLabel = (value: string) => {
  return BOOK_STATUS_OPTIONS.find((option) => option.value === value)?.label;
};

export default function BookStatusField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookEvaluation>();

  const [activeValue, setActiveValue] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <BookStatusPeriodStep.Title
      title="독서 상태"
      description="독서 상태를 선택해주세요."
    >
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange } }) => (
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <div
              css={css`
                cursor: pointer;
                width: 100%;
                display: flex;
                justify-content: space-between;
                border: 1px solid ${theme.colors.secondary};
                padding: ${theme.spacing.sm} ${theme.spacing.md};
              `}
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(true);
              }}
            >
              <span>{activeValue || '상태'}</span>
              {<span>▼</span>}
              {/* {activeValue === '' && <span>▼</span>} */}
            </div>
            <Dropdown
              options={BOOK_STATUS_OPTIONS}
              onOptionSelect={(selectedValue) => {
                const label = getLabel(selectedValue);
                setActiveValue(label || '');
                return onChange(selectedValue);
              }}
              isError={!!errors.status}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </div>
        )}
      />
      <ErrorMessage errorMessage={errors.status?.message || ''} />
    </BookStatusPeriodStep.Title>
  );
}
