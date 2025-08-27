import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  useFormContext,
  UseFormStateReturn,
} from 'react-hook-form';
import DateInput from './DateInput';

type RHFDateRangeInputProps = {
  name: string;
  disabled: boolean;
  className: string;
  rules?: RegisterOptions;
  render?: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => React.ReactElement;
};

export default function RHFDateRangeInput({
  name,
  render,
  disabled,
  className,
  rules,
}: RHFDateRangeInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={
        render ||
        (({ field: { onChange, value } }) => (
          <DateInput
            onChange={onChange}
            value={value}
            disabled={disabled}
            className={className}
          />
        ))
      }
    />
  );
}
