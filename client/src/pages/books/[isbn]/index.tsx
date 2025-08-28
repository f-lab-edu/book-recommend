import BookEvaluationStepper from '@/components/book/BookEvaluationStepper';
import SuspenseBoundary from '@/components/common/SuspenseBoundary';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import { createBookDetailServerSideProps } from '@/utils/serverSideProps';
import dynamic from 'next/dynamic';
import BookDetailSkeleton from '@/components/book/BookDetailSkeleton';

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
      <SuspenseBoundary
        loading={<BookDetailSkeleton />}
        rejectedFallback={(props) => <BookDetailErrorFallback {...props} />}
      >
        <BookEvaluationStepper />
      </SuspenseBoundary>
    </HydrationBoundary>
  );
}
