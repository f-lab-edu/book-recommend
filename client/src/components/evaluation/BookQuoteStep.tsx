import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useBookDetail } from '@/hooks/useBooks';
import { deConcatIsbn } from '@/utils/utils';
import QuoteList from '../quote/QuoteList';
import QuoteInputSection from '../quote/QuoteInputSection';
import QuoteActionButtons from '../quote/QuoteActionButtons';
import { theme } from '@/theme';
import {
  BookEvaluation,
  bookQuoteSchema,
  commaSeparatedNumbersSchema,
} from '@/schema/bookEvaluation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Book } from '@/types/book';

const useQuoteManagement = (isbn: string) => {
  const {
    control,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    setError,
  } = useFormContext<BookEvaluation>();

  const { data } = useQuery(useBookDetail(deConcatIsbn(isbn)));

  if (data == undefined) {
    throw new Error('책 정보를 찾을 수 없습니다.');
  }

  const totalPageNum =
    (data as Book & { pageNum: number })?.pageNum ||
    Math.floor(Math.random() * 301) + 100;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  const count = fields.length;
  const errorMessage = errors.quotes?.[count]?.quote?.message || '';

  const handleAddQuote = (onSuccess?: () => void) => {
    if (isSubmitting) return;

    const count = fields.length;

    const pageNum = getValues(`quotes.${count}.pageNum`) || '0';
    const quote = getValues(`quotes.${count}.quote`) || '';
    const quoteSchema = bookQuoteSchema(`quotes.${count}.pageNum`);

    if (fields.length > 1) {
      if (pageNum === '0') {
        try {
          quoteSchema.parse({ pageNum, quote });
        } catch (error) {
          setValue(`quotes.${count}.pageNum`, '', { shouldValidate: true });
        }
      }
      return;
    }

    if (quote === '') {
      setError(`quotes.${count}.quote`, {
        message: '인용구를 입력해주세요.',
      });
      return;
    }

    append({ pageNum, quote });
    onSuccess?.();
    handleReset();
  };

  const handleReset = useCallback(() => {
    setValue(`quotes.${count}.pageNum`, '');
    setValue(`quotes.${count}.quote`, '');
  }, []);

  const handleRemoveQuote = useCallback((index: number) => {
    remove(index);
  }, []);

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

const useQuoteStateHandle = () => {
  const [isAddQuote, setIsAddQuote] = useState(false);

  const handleOpenQuote = () => {
    setIsAddQuote(true);
  };

  const handleCloseQuote = () => {
    setIsAddQuote(false);
  };

  return { isAddQuote, handleOpenQuote, handleCloseQuote };
};

export default function BookQuoteStep({ isbn }: { isbn: string }) {
  const {
    formState: { isSubmitting },
    fields,
    count,
    handleAddQuote,
    handleRemoveQuote,
    handleReset,
  } = useQuoteManagement(isbn);

  const { isAddQuote, handleOpenQuote, handleCloseQuote } =
    useQuoteStateHandle();

  return (
    <BookQuoteStep.Title title="인용구">
      {isAddQuote ? (
        <>
          <QuoteInputSection
            quoteIndex={count}
            totalQuotes={fields.length}
          />
          <QuoteActionButtons
            handleAddQuote={() => handleAddQuote(handleCloseQuote)}
            handleReset={handleReset}
            isSubmitting={isSubmitting}
          />
        </>
      ) : (
        <button
          css={css`
            background-color: ${theme.colors.primary};
            color: ${theme.colors.background};
            border: none;
            border-radius: ${theme.borderRadius.sm};
            padding: ${theme.spacing.sm} ${theme.spacing.md};
            cursor: pointer;
            font-size: ${theme.fontSize.sm};
            font-weight: ${theme.fontWeight.bold};
            margin-top: ${theme.spacing.md};
          `}
          onClick={handleOpenQuote}
        >
          인용구 추가
        </button>
      )}
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
