import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { BookQuote } from '@/types/book';

export default function QuoteInputSection({
  quoteIndex,
}: {
  quoteIndex: number;
}) {
  const { register } = useFormContext<BookQuote>();

  return (
    <>
      <input
        className={`input-${quoteIndex}`}
        {...register(`quotes.${quoteIndex}.pageNum`)}
        type="text"
        css={css`
          outline: none;
          padding: 4px 8px;
        `}
        placeholder="인용구 페이지"
      />
      <textarea
        css={css`
          width: 100%;
          height: 100px;
          outline: none;
          padding: 4px 8px;
          resize: vertical;
        `}
        className={`textarea-${quoteIndex}`}
        {...register(`quotes.${quoteIndex}.quote`)}
        placeholder="인용구를 입력해주세요."
      />
    </>
  );
}
