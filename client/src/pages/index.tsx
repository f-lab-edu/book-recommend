import BookList from '@/components/book/BookList';
import { BookListErrorFallback } from '@/components/common/ErrorFallbacks';
import HomeMain from '@/components/home/HomeMain';

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { getBookList } from '@/remotes/book';
import { QUERY_KEYS } from '@/lib/query-keys';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  try {
    const result = await Promise.allSettled([
      // Promise.reject(new Error('Something wrong')),
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.books.bestseller(),
        queryFn: () => getBookList('bestseller'),
        // queryFn: () => {
        //   throw new Error('Something wrong');
        // },
      }),

      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.books.newbooks(),
        queryFn: () => getBookList('ItemNewSpecial', { maxResults: 4 }),
      }),
    ]);

    result.some((result) => {
      if (result.status === 'rejected') {
        throw new Error(result.reason.message);
      }
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
        dehydratedState: dehydrate(queryClient),
        error: { message: (error as Error).message },
      },
    };
  }
};

export default function Home({
  dehydratedState,
  error,
}: {
  dehydratedState: DehydratedState;
  error: { message: string };
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
