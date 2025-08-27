import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { BookQuote } from '@/types/book';
import ErrorMessage from '../common/ErrorMessage';

export default function QuoteInputSection({
  quoteIndex,
  totalQuotes,
}: {
  quoteIndex: number;
  totalQuotes: number;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookQuote>();

  console.log('errors: ', errors);
  const pageNumError = errors.quotes?.[quoteIndex]?.pageNum?.message;
  const quoteError = errors.quotes?.[quoteIndex]?.quote?.message;

  return (
    <>
      {totalQuotes > 1 && (
        <>
          <input
            className={`input-${quoteIndex}`}
            {...register(`quotes.${quoteIndex}.pageNum`)}
            type="text"
            css={css`
              outline: none;
              padding: 4px 8px;
              ${pageNumError &&
              css`
                border: 1px solid #dc3545;
              `}
            `}
            placeholder="인용구 페이지를 입력해주세요."
          />
          {pageNumError && <ErrorMessage errorMessage={pageNumError} />}
        </>
      )}
      <textarea
        css={css`
          width: 100%;
          height: 100px;
          outline: none;
          padding: 4px 8px;
          resize: vertical;
          ${quoteError &&
          css`
            border: 1px solid #dc3545;
          `}
        `}
        className={`textarea-${quoteIndex}`}
        {...register(`quotes.${quoteIndex}.quote`)}
        placeholder="인용구를 입력해주세요."
      />
      {quoteError && <ErrorMessage errorMessage={quoteError} />}
    </>
  );
}
