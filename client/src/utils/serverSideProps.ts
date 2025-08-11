import { GetServerSideProps } from 'next';
import { QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { getBookDetail } from '@/remotes/book';
import { QUERY_KEYS } from '@/hooks/useBooks';
import { deConcatIsbn } from './utils';

export const createBookDetailServerSideProps = (): GetServerSideProps => {
  return async ({ params, query }) => {
    const queryClient = new QueryClient();
    const isbn = params?.isbn as string;
    const step = query?.step as string;

    // 서버 사이드 validation
    if (isbn == null || isbn === '') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const stepNumber = Number(step) || 1;
    if (stepNumber < 1 || stepNumber > 5) {
      return {
        redirect: {
          destination: `/books/${isbn}?step=1`,
          permanent: false,
        },
      };
    }

    const splitedIsbn = deConcatIsbn(isbn);

    // 데이터 prefetch
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.BOOK, QUERY_KEYS.DETAIL, splitedIsbn] as const,
      queryFn: () => getBookDetail(splitedIsbn),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
};
