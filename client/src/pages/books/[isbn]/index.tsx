import BookEvaluationStepper from '@/components/book/BookEvaluationStepper';
// import { BookDetailErrorFallback } from '@/components/common/ErrorFallbacks';
import SuspenseBoundary from '@/components/common/SuspenseBoundary';
import BookDetailPageValidator from '@/components/validator/BookDetailPageValidator';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { createBookDetailServerSideProps } from '@/utils/serverSideProps';
import dynamic from 'next/dynamic';

export const getServerSideProps = createBookDetailServerSideProps();
const BookDetailErrorFallback = dynamic(
  () =>
    import('@/components/common/ErrorFallbacks').then(
      (mod) => mod.BookDetailErrorFallback,
    ),
  {
    ssr: false,
  },
);

export default function BookDetailPage({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <BookDetailPageValidator>
        <SuspenseBoundary
          rejectedFallback={(props) => <BookDetailErrorFallback {...props} />}
        >
          <BookEvaluationStepper />
        </SuspenseBoundary>
      </BookDetailPageValidator>
    </HydrationBoundary>
  );
}
