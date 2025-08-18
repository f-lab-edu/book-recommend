import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Textarea from './Textarea';
import { useEffect } from 'react';
import { FieldPath } from 'react-hook-form';

type RHFTextareaProps<T extends FieldValues> = {
  name: FieldPath<T>;
  disabled?: boolean;
  rules?: {
    required?: string | boolean;
    validate?: (value: string) => string | boolean;
  };
};

export default function RHFTextarea<T extends FieldValues>({
  name,
  disabled,
  rules,
  ...props
}: RHFTextareaProps<T>) {
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<{ [key: string]: string }>();

  const rating = Number(watch(`${name}`));

  useEffect(() => {
    trigger(name);
  }, [rating, trigger]);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          ...(rules || {
            required: '독후감을 입력해주세요.',
            validate: (value) => {
              if (disabled == false && value.length < 100) {
                return '독후감을 100자 이상 입력해주세요.';
              }
            },
          }),
        }}
        render={({ field }) => (
          <>
            <Textarea
              {...field}
              {...props}
              disabled={disabled}
            />
            <ErrorMessage errorMessage={errors[name]?.message || ''} />
          </>
        )}
      />
    </>
  );
}
