import BookDetailSkeleton from './BookDetailSkeleton';
import SuspenseBoundary from '../common/SuspenseBoundary';
import {
  bookStepperContainerStyle,
  bookStepperContentStyle,
} from '@/styles/bookStepper.styles';
import SwitchCases from '../common/SwitchCases';
import { useStepValidation } from '@/hooks/useStepValidation';
import BookStatusPeriodValidation from '../evaluation/BookStatusPeriodValidation';
import { FormProvider, useForm } from 'react-hook-form';
import StepperNavigation from './StepperNavigation';
import BookRatingReviewStep from '../evaluation/BookRatingReviewStep';
import { theme } from '@/theme';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import BookDetail from './BookDetail';

const BookDetailErrorFallback = dynamic(
  () =>
    import('../common/ErrorFallbacks').then(
      (mod) => mod.BookDetailErrorFallback,
    ),
  {
    ssr: false,
  },
);

export default function BookEvaluationStepper() {
  const { step, isbn } = useStepValidation();

  const form = useForm();

  return (
    <div css={bookStepperContainerStyle}>
      <div css={bookStepperContentStyle}>
        <SuspenseBoundary
          loading={<BookDetailSkeleton />}
          rejectedFallback={(props) => <BookDetailErrorFallback {...props} />}
        >
          <BookDetail isbn={isbn as string} />
        </SuspenseBoundary>

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
                '1': <BookStatusPeriodValidation />,
                '2': <BookRatingReviewStep />,
                '3': <div>평가 폼2 (구현 예정)</div>,
                '4': <div>평가 폼3 (구현 예정)</div>,
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
