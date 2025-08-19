import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import Textarea from './Textarea';
import { FieldPath } from 'react-hook-form';

type RHFTextareaProps<T extends FieldValues> = {
  name: FieldPath<T>;
  disabled?: boolean;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  render?: (
    field: ControllerRenderProps<T, FieldPath<T>>,
  ) => React.ReactElement;
};

const useFormFieldHelpers = <T extends FieldValues>() => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const getErrorMessage = (name: FieldPath<T>) => {
    const error = (errors as { [name: string]: FieldError })[name];

    if (error?.message) {
      return error.message;
    }

    return '';
  };

  return { control, getErrorMessage };
};

export default function RHFTextarea<T extends FieldValues>({
  name,
  disabled,
  rules,
  render,
  ...props
}: RHFTextareaProps<T>) {
  const { control, getErrorMessage } = useFormFieldHelpers<T>();

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => {
          if (render != undefined) {
            return render(field);
          }
          return (
            <>
              <Textarea
                {...field}
                {...props}
                disabled={disabled}
              />
              <ErrorMessage errorMessage={getErrorMessage(name)} />
            </>
          );
        }}
      />
    </>
  );
}
