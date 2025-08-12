import { BOOK_STATUS_OPTIONS } from '@/constants/book';
import { Controller, FieldErrors, useFormContext } from 'react-hook-form';
import Dropdown from '../drop-down/Dropdown';
import ErrorMessage from '../common/ErrorMessage';
import BookStatusPeriodStep, {
  BookStatusFormData,
} from './BookStatusPeriodStep';

export default function BookStatusField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookStatusFormData>();

  return (
    <BookStatusPeriodStep.Title
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
    </BookStatusPeriodStep.Title>
  );
}
