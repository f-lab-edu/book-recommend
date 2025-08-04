import BookEvaluationStepper from "@/components/book/BookEvaluationStepper";
import { BookDetailErrorFallback } from "@/components/common/ErrorFallbacks";
import SuspenseBoundary from "@/components/common/SuspenseBoundary";

export default function BookDetailPage() {

  return (
    <SuspenseBoundary
      rejectedFallback={BookDetailErrorFallback}
    >
      <BookEvaluationStepper />
    </SuspenseBoundary>
  )
} 