import { BOOK_STATUS_OPTIONS } from '@/constants/book';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import Dropdown from '../drop-down/Dropdown';
import ErrorMessage from '../common/ErrorMessage';
import BookStatusPeriodValidation, { BookStatusFormData } from './BookStatusPeriodValidation';

export default function BookStatusSection({
  control,
  errors,
}: {
  control: Control<BookStatusFormData>;
  errors: FieldErrors<BookStatusFormData>;
}) {
  return (
    <BookStatusPeriodValidation.Title
      title="독서 상태"
      description="독서 상태를 선택해주세요."
    >
      <Controller
        name="status"
        control={control}
        rules={{ required: '독서 상태를 선택해주세요.' }}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            options={BOOK_STATUS_OPTIONS}
            defaultValue={value}
            onChange={(selectedValue) => onChange(selectedValue)}
            isError={!!errors.status}
          />
        )}
      />
      <ErrorMessage errorMessage={errors.status?.message || ''} />
    </BookStatusPeriodValidation.Title>
  );
}
