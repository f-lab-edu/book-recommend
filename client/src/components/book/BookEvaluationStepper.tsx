import {
  bookStepperContainerStyle,
  bookStepperContentStyle,
} from '@/styles/bookStepper.styles';
import SwitchCases from '../common/SwitchCases';
import { useStepValidation } from '@/hooks/useStepValidation';
import { FormProvider, useForm } from 'react-hook-form';
import StepperNavigation from './StepperNavigation';
import BookRatingReviewStep from '../evaluation/BookRatingReviewStep';
import { theme } from '@/theme';
import { css } from '@emotion/react';
import BookDetail from './BookDetail';
import BookStatusPeriodStep from '../evaluation/BookStatusPeriodStep';
import BookQuoteStep from '../evaluation/BookQuoteStep';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bookEvaluationSchema,
  bookPublishSchema,
  bookQuoteSchema,
  bookRatingReviewSchema,
  bookStatusPeriodSchema,
} from '@/schema/bookEvaluation';
import { useMemo } from 'react';

export default function BookEvaluationStepper() {
  const { step, isbn, error } = useStepValidation();

  if (isbn == null || error != null) {
    throw new Error(error || '잘못된 접근입니다.');
  }

  const getSchemaForStep = (currentStep: string) => {
    switch (currentStep) {
      case '1':
        return bookStatusPeriodSchema;
      case '2':
      case '3':
        return bookRatingReviewSchema;
      case '4':
        return bookQuoteSchema;
      case '5':
        return bookPublishSchema;
      default:
        return bookEvaluationSchema; // 전체 스키마
    }
  };

  const resolver = useMemo(() => {
    return zodResolver(getSchemaForStep(step));
  }, [step]);

  const defaultValues = useMemo(() => {
    return {
      status: undefined,
      startDate: undefined,
      endDate: undefined,
      rating: 0,
      review: '',
      quotes: [],
      publish: false,
    };
  }, []);

  const form = useForm({
    resolver,
    defaultValues,
  });

  return (
    <div css={bookStepperContainerStyle}>
      <div css={bookStepperContentStyle}>
        <BookDetail isbn={isbn} />

        <FormProvider {...form}>
          <div
            css={css`
              display: flex;
              padding: 16px;
              background-color: white;
              border-radius: 16px;
              box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
              width: 100%;
              margin: ${theme.spacing.lg} 0;
            `}
          >
            <SwitchCases
              value={step}
              cases={{
                '1': <BookStatusPeriodStep />,
                '2': <BookRatingReviewStep />,
                '3': <div>평가 폼2 (구현 예정)</div>,
                '4': <BookQuoteStep isbn={isbn as string} />,
                '5': <div>평가 폼4 (구현 예정)</div>,
              }}
              fallback={<div>잘못된 단계입니다.</div>}
            />
          </div>
          <StepperNavigation />
        </FormProvider>
      </div>
    </div>
  );
}
