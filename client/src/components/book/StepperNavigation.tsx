import { bookStepperButtonWrapperStyle } from '@/styles/bookStepper.styles';
import useStepNavigation from '@/hooks/useStepNavigation';
import { useRouter } from 'next/router';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { theme } from '@/theme';
import { css } from '@emotion/react';
import { BookEvaluation } from '@/schema/bookEvaluation';

export default function StepperNavigation() {
  const router = useRouter();
  const { isbn, step } = router.query;

  const minStep = 1;
  const maxStep = 5;

  const { handlePrevious, goNext } = useStepNavigation({
    isbn: isbn as string,
    step: step as string,
    minStep,
    maxStep,
  });

  const { handleSubmit } = useFormContext<BookEvaluation>();

  const isPreviousButtonDisabled = (step as string) === minStep.toString();

  const onSubmit: SubmitHandler<BookEvaluation> = (data) => {
    goNext();
  };

  return (
    <div css={bookStepperButtonWrapperStyle}>
      <button
        css={css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.background};
          border: none;
          border-radius: ${theme.borderRadius.md};
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          cursor: pointer;
          font-size: ${theme.fontSize.sm};
          transition: all 0.3s ease;
        `}
        onClick={handlePrevious}
        disabled={isPreviousButtonDisabled}
      >
        이전
      </button>
      <button onClick={handleSubmit(onSubmit)}>다음</button>
    </div>
  );
}
