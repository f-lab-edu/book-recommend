import BookEvaluationStepper from "@/components/book/BookEvaluationStepper";
import { BookDetailErrorFallback } from "@/components/common/ErrorFallbacks";
import SuspenseBoundary from "@/components/common/SuspenseBoundary";
import BookDetailPageValidator from "@/components/validator/BookDetailPageValidator";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { createBookDetailServerSideProps } from "@/utils/serverSideProps";

export const getServerSideProps = createBookDetailServerSideProps();

export default function BookDetailPage({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <BookDetailPageValidator>
        <SuspenseBoundary rejectedFallback={BookDetailErrorFallback}>
          <BookEvaluationStepper />
        </SuspenseBoundary>
      </BookDetailPageValidator>
    </HydrationBoundary>
  );
}
