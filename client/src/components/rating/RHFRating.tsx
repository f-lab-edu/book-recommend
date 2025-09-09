import { css } from '@emotion/react';
import {
  Controller,
  FieldError,
  FieldValues,
  RegisterOptions,
  useFormContext,
  Control,
} from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import { FieldPath } from 'react-hook-form';
import StarRating from './StarRating';
import { createContext } from 'react';

const RatingContext = createContext<{
  name: string;
  control: unknown;
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
} | null>(null);

type RenderFunction = () // field: ControllerRenderProps<T, FieldPath<T>>,
=> React.ReactElement;

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
  render?: RenderFunction;
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
            return (
              <RatingContext.Provider
                value={{
                  name,
                  control,
                  value: field.value,
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                }}
              >
                {render()}
              </RatingContext.Provider>
            );
          }
          return <StarRating {...field} />;
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default RHFRating;
RHFRating.Star = StarRating;
