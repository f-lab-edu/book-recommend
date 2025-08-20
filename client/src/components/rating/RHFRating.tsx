import { css } from '@emotion/react';
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import { FieldPath } from 'react-hook-form';
import StarRating from './StarRating';

type RenderFunction<T extends FieldValues> = (
  field: ControllerRenderProps<T, FieldPath<T>>,
) => React.ReactElement;

const RHFRating = <T extends FieldValues>({
  name,
  rules,
  render,
}: {
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  render?: RenderFunction<T>;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const errorMessage =
    (errors as { [name: string]: FieldError })[name]?.message || '';

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          if (render != undefined) {
            return render(field);
          }
          return <StarRating {...field} />;
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default RHFRating;
