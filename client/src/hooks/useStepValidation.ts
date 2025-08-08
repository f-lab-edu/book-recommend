import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ValidationResult {
  isValid: boolean;
  error: string | null;
  isbn: string | null;
  step: string | null;
  isLoading: boolean;
}

export function useStepValidation(): ValidationResult {
  const router = useRouter();
  const { isbn, step, isReady } = router.query;
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: false,
    error: null,
    isbn: null,
    step: null,
    isLoading: true,
  });

  useEffect(() => {
    // 로딩 중일 때는 기존 상태 유지
    if (!isReady) {
      return;
    }

    // 모든 validation 로직을 한 번에 처리
    let newValidationResult: ValidationResult;

    const isbnString = isbn as string;
    const stepString = step as string;

    if (!isbnString || isbnString === "") {
      newValidationResult = {
        isValid: false,
        error: "ISBN 번호가 없습니다.",
        isbn: null,
        step: null,
        isLoading: false,
      };
    } else {
      const stepNumber = Number(stepString) || 1;

      if (stepNumber < 1 || stepNumber > 5) {
        newValidationResult = {
          isValid: false,
          error: "잘못된 단계입니다.",
          isbn: isbnString,
          step: stepString,
          isLoading: false,
        };
      } else {
        newValidationResult = {
          isValid: true,
          error: null,
          isbn: isbnString,
          step: stepString || "1",
          isLoading: false,
        };
      }
    }

    setValidationResult(newValidationResult);
  }, [isReady, isbn, step]);

  return validationResult;
}
