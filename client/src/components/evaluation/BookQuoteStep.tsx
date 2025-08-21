import { css } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useBookDetail } from '@/hooks/useBooks';
import { deConcatIsbn } from '@/utils/utils';
import QuoteList from '../quote/QuoteList';
import QuoteInputSection from '../quote/QuoteInputSection';
import { BookQuote } from '@/types/book';
import QuoteActionButtons from '../quote/QuoteActionButtons';
import { theme } from '@/theme';

const useQuoteManagement = (isbn: string) => {
  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useFormContext<BookQuote>();

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(
    useBookDetail(deConcatIsbn(isbn)).queryKey,
  );

  const totalPageNum =
    (data as { pageNum: number })?.pageNum ||
    Math.floor(Math.random() * 301) + 100;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  const count = fields.length;
  const errorMessage = errors.quotes?.[count]?.pageNum?.message || '';

  const handleAddQuote = () => {
    if (isSubmitting) return;

    const pageNum = getValues(`quotes.${count}.pageNum`) || 0;
    const quote = getValues(`quotes.${count}.quote`) || '';

    if (quote === '') return;

    append({
      pageNum,
      quote,
    });

    handleReset();
  };

  const handleReset = () => {
    setValue(`quotes.${count}.pageNum`, null);
    setValue(`quotes.${count}.quote`, '');
  };

  const handleRemoveQuote = (index: number) => {
    remove(index);
  };

  return {
    formState: { errors, isSubmitting },
    fields,
    count,
    errorMessage,
    handleAddQuote,
    handleRemoveQuote,
    handleReset,
  };
};

export default function BookQuoteStep({ isbn }: { isbn: string }) {
  const {
    formState: { errors, isSubmitting },
    fields,
    count,
    errorMessage,
    handleAddQuote,
    handleRemoveQuote,
    handleReset,
  } = useQuoteManagement(isbn);

  console.log('BookQuoteStep 실행: ', fields);

  return (
    <BookQuoteStep.Title title="인용구">
      <QuoteInputSection quoteIndex={count} />
      <QuoteActionButtons
        handleReset={handleReset}
        handleAddQuote={handleAddQuote}
        isSubmitting={isSubmitting}
      />
      <QuoteList
        quotes={fields}
        handleRemoveQuote={handleRemoveQuote}
      />
    </BookQuoteStep.Title>
  );
}

const BookQuoteTitle = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: ${theme.spacing.sm};
      `}
    >
      <h3
        css={css`
          font-size: ${theme.fontSize.lg};
          font-weight: ${theme.fontWeight.bold};
        `}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

BookQuoteStep.Title = BookQuoteTitle;
