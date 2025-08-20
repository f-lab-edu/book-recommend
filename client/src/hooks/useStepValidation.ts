import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ValidationResult {
  isValid: boolean;
  error: string | null;
  isbn: string | null;
  step: string;
}

export function useStepValidation(): ValidationResult {
  const router = useRouter();
  const { isbn, step } = router.query;

  let validationResult: ValidationResult = {
    isValid: false,
    error: null,
    isbn: null,
    step: '1',
  };

  const isbnString = isbn as string;
  const stepString = step as string;

  if (!isbnString || isbnString === '') {
    validationResult = {
      ...validationResult,
      error: 'ISBN 번호가 없습니다.',
    };
  } else {
    const stepNumber = Number(stepString) || 1;

    if (stepNumber < 1 || stepNumber > 5) {
      validationResult = {
        ...validationResult,
        error: '잘못된 단계입니다.',
        isbn: isbnString,
        step: stepString,
      };
    } else {
      validationResult = {
        isValid: true,
        error: null,
        isbn: isbnString,
        step: stepString || '1',
      };
    }
  }

  return validationResult;
}
