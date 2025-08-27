import { ComponentPropsWithoutRef } from 'react';
import { FieldValues, useFormContext, UseFormSetValue } from 'react-hook-form';
import { commaSeparatedNumbersSchema } from '@/schema/bookEvaluation';

type RHFCommaSeparatedInputProps = ComponentPropsWithoutRef<'input'> & {
  name: string;
};

const useCommaSeparatedInputChangeHandler = (
  name: string,
  setValue: UseFormSetValue<FieldValues>,
) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (isNaN(Number(value))) {
      setValue(name, '', { shouldValidate: true });
      return;
    }

    // 실시간 validation
    try {
      if (value) {
        const parsedValue = commaSeparatedNumbersSchema(name).parse(value);
        setValue(name, parsedValue, { shouldValidate: true });
      } else {
        setValue(name, '', { shouldValidate: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        setValue(name, value, { shouldValidate: true });
      }
    }
  };

  return { handleInputChange };
};

const RHFCommaSeparatedInput = ({
  name,
  ...props
}: RHFCommaSeparatedInputProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const fieldError = errors[`${name}`];
  const { handleInputChange } = useCommaSeparatedInputChangeHandler(
    name,
    setValue,
  );

  return (
    <div>
      <input
        {...register(name)}
        type="text"
        placeholder="숫자를 입력하여 주세요."
        onChange={handleInputChange}
        {...props}
      />
      {fieldError?.message && (
        <div style={{ color: 'blue', fontSize: '12px', marginTop: '4px' }}>
          {fieldError.message as string}
        </div>
      )}
    </div>
  );
};

export default RHFCommaSeparatedInput;
