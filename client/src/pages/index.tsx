import BookList from '@/components/book/BookList';
import { BookListErrorFallback } from '@/components/common/ErrorFallbacks';
import SuspenseBoundary from '@/components/common/SuspenseBoundary';
import HomeMain from '@/components/home/HomeMain';

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { getBestSellerBooks } from '@/remotes/book';

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  try {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ['bestseller'],
      queryFn: () => getBestSellerBooks(),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error('getServerSideProps error:', error);
    return {
      props: {
        dehydratedState: {},
      },
    };
  }
};

export default function Home({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) {
  return (
    <>
      <Head>
        <title>Book Recommend</title>
        <meta
          name="description"
          content="Book Recommend to Frontend Developer"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>

      <HydrationBoundary state={dehydratedState}>
        <HomeMain />
      </HydrationBoundary>

      {/* <SuspenseBoundary
        rejectedFallback={BookListErrorFallback}
      >
        <BookList />
      </SuspenseBoundary> */}
    </>
  );
}
