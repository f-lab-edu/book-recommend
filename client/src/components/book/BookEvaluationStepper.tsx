import BookDetailSkeleton from './BookDetailSkeleton';
import SuspenseBoundary from '../common/SuspenseBoundary';
import {
  bookStepperContainerStyle,
  bookStepperContentStyle,
} from '@/styles/bookStepper.styles';
import SwitchCases from '../common/SwitchCases';
import { useStepValidation } from '@/hooks/useStepValidation';
import { FormProvider, useForm } from 'react-hook-form';
import StepperNavigation from './StepperNavigation';
import dynamic from 'next/dynamic';
import BookDetail from './BookDetail';
import BookStatusPeriodStep from '../evaluation/BookStatusPeriodStep';

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
  const { step, isbn, error } = useStepValidation();

  if (isbn == null || error != null) {
    throw new Error(error || '잘못된 접근입니다.');
  }

  const form = useForm();

  return (
    <div css={bookStepperContainerStyle}>
      <div css={bookStepperContentStyle}>
        <SuspenseBoundary
          loading={<BookDetailSkeleton />}
          rejectedFallback={(props) => <BookDetailErrorFallback {...props} />}
        >
          <BookDetail isbn={isbn} />
        </SuspenseBoundary>

        <FormProvider {...form}>
          <SwitchCases
            value={step}
            cases={{
              '1': <BookStatusPeriodStep />,
              '2': <div>평가 폼1 (구현 예정)</div>,
              '3': <div>평가 폼2 (구현 예정)</div>,
              '4': <div>평가 폼3 (구현 예정)</div>,
              '5': <div>평가 폼4 (구현 예정)</div>,
            }}
            fallback={<div>잘못된 단계입니다.</div>}
          />
          <StepperNavigation />
        </FormProvider>
      </div>
    </div>
  );
}
