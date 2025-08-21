import { BookQuote } from '@/types/book';
import { css } from '@emotion/react';
import { FieldArrayWithId } from 'react-hook-form';

export default function QuoteList({
  quotes,
  handleRemoveQuote,
}: {
  quotes: FieldArrayWithId<BookQuote, 'quotes', 'id'>[];
  handleRemoveQuote: (index: number) => void;
}) {
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
          flex-direction: column;
          gap: 4px;
        `}
      >
        {/* <p>{field.pageNum}페이지</p> */}
        <p>{field.quote}</p>
      </div>
      <button
        css={css`
          width: 48px;
          height: 50%;
          background-color: #000;
          color: #fff;
        `}
        onClick={() => handleRemoveQuote(index)}
      >
        삭제
      </button>
    </div>
  ));
}
