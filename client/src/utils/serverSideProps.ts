import { GetServerSideProps } from "next";
import { QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { useBookDetail } from "@/hooks/useBooks";
import { deConcatIsbn } from "@/utils/utils";

export const createBookDetailServerSideProps = (): GetServerSideProps => {
  return async ({ params, query }) => {
    const queryClient = new QueryClient();
    const isbn = params?.isbn as string;
    const step = query?.step as string;

    // 서버 사이드 validation
    if (!isbn || isbn === "") {
      return {
        redirect: {
          destination: "/",
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

    // 데이터 prefetch
    await queryClient.prefetchQuery(useBookDetail(deConcatIsbn(isbn)));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
};
