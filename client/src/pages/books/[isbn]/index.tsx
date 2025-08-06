import BookEvaluationStepper from "@/components/book/BookEvaluationStepper";
import { useStepValidation } from "@/hooks/useStepValidation";

export default function BookDetailPage() {
  const { step, isbn } = useStepValidation();

  return (
    <BookEvaluationStepper step={step} isbn={isbn} />
  )
} 