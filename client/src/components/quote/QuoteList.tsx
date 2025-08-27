import { BookEvaluation } from '@/schema/bookEvaluation';
import { css } from '@emotion/react';
import { FieldArrayWithId, useFormContext } from 'react-hook-form';
import RHFCommaSeparatedInput from '../input/RHFCommaSeparatedInput';
import ErrorMessage from '../common/ErrorMessage';

export default function QuoteList({
  quotes,
  handleRemoveQuote,
}: {
  quotes: FieldArrayWithId<BookEvaluation, 'quotes', 'id'>[];
  handleRemoveQuote: (index: number) => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookEvaluation>();

  return quotes.map((field, index) => (
    <div
      key={field.id}
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
        border: 1px solid #000;
        padding: 4px 8px;
        border-radius: 4px;
      `}
    >
      <div
        css={css`
          display: flex;
          width: 100%;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <div
          css={css`
            display: flex;
            height: 100%;
            gap: 4px;
            align-items: center;
          `}
        >
          <RHFCommaSeparatedInput
            css={css`
              width: 200px;
              height: 100%;
              border: none;
              outline: none;
              background-color: #eee;
              font-size: 14px;
              padding: 4px 8px;
            `}
            name={`quotes.${index}.pageNum`}
            placeholder="인용구 페이지를 입력해주세요."
          />
          {errors.quotes?.[index]?.pageNum?.message && (
            <ErrorMessage
              errorMessage={errors.quotes?.[index]?.pageNum?.message as string}
            />
          )}
        </div>
        <div
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            position: relative;
          `}
        >
          <textarea
            css={css`
              width: 100%;
              height: 100%;
              outline: none;
              padding: 4px 8px;
              resize: none;
              border: none;
              background-color: #eee;
            `}
            {...register(`quotes.${index}.quote`)}
            placeholder="인용구를 입력해주세요."
          />
          {errors.quotes?.[index]?.quote?.message && (
            <ErrorMessage
              customCss={css`
                position: absolute;
                top: 3px;
                left: 12px;
              `}
              errorMessage={errors.quotes?.[index]?.quote?.message as string}
            />
          )}
        </div>
      </div>

      <button
        css={css`
          width: 48px;
          height: 100%;
          background-color: #ff0000;
          color: #fff;
        `}
        type="button"
        onClick={() => handleRemoveQuote(index)}
      >
        삭제
      </button>
    </div>
  ));
}
