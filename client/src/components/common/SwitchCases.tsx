import React from 'react';

interface SwitchCasesProps<T extends string> {
  value: T;
  cases: Record<T, React.ReactNode>;
  fallback?: React.ReactNode;
}

export default function SwitchCases<T extends string>({
  value,
  cases,
  fallback = null
}: SwitchCasesProps<T>) {
  return <>{cases[value] ?? fallback}</>;
} 