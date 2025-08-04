import { useRouter } from "next/router";
import { useEffect } from "react";

export function useStepValidation() {
  const router = useRouter();
  const { isbn, step, isReady } = router.query;

  useEffect(() => {
    if (!isReady) {
      console.error('router is not ready');
    }

    if (isbn == null || isbn == '') {
      throw new Error('isbn 번호가 없습니다.');
    }

  }, [isReady, isbn, router]);


  return {
    step: (step as string) || '1',
    isbn: isbn as string,
  }
} 