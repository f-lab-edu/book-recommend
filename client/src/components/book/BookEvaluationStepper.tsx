import BookDetail from "./BookDetail";
import BookDetailSkeleton from "./BookDetailSkeleton";
import useStepNavigation from "@/hooks/useStepNavigation";
import SuspenseBoundary from "../common/SuspenseBoundary";
import { bookStepperButtonWrapperStyle, bookStepperContainerStyle, bookStepperContentStyle } from "@/styles/bookStepper.styles";
import SwitchCases from "../common/SwitchCases";
import { useStepValidation } from "@/hooks/useStepValidation";
import { BookDetailErrorFallback } from "../common/ErrorFallbacks";

export const STEP_COMPONENTS = {
  '1': <div>평가 폼0 (구현 예정)</div>,
  '2': <div>평가 폼1 (구현 예정)</div>,
  '3': <div>평가 폼2 (구현 예정)</div>,
  '4': <div>평가 폼3 (구현 예정)</div>,
  '5': <div>평가 폼4 (구현 예정)</div>,
}

export default function BookEvaluationStepper() {
  const minStep = 1;
  const maxStep = Object.keys(STEP_COMPONENTS).length;

  const { step, isbn } = useStepValidation();
  const { handlePrevious, handleNext } = useStepNavigation({ isbn, step, minStep, maxStep });

  return (
    <div css={bookStepperContainerStyle}>
      <div css={bookStepperContentStyle}>
        <SuspenseBoundary
          loading={<BookDetailSkeleton />}
          rejectedFallback={BookDetailErrorFallback}
        >
          <BookDetail isbn={isbn} />
        </SuspenseBoundary>

        <SwitchCases
          value={step}
          cases={STEP_COMPONENTS}
          fallback={<div>잘못된 단계입니다.</div>}
        />

        <div css={bookStepperButtonWrapperStyle}>
          <button onClick={handlePrevious}>이전</button>
          <button onClick={handleNext}>다음</button>
        </div>
      </div>
    </div>
  );
}
