import { useRouter } from 'next/navigation';

export default function useStepNavigation({
  isbn,
  step,
  minStep,
  maxStep,
}: {
  isbn: string;
  step: string;
  minStep: number;
  maxStep: number;
}) {
  const router = useRouter();

  const handlePrevious = () => {
    const previousStep = Number(step) - 1;
    if (previousStep < minStep) {
      return;
    }
    router.push(`/books/${isbn}?step=${previousStep}`);
  };
  const goNext = () => {
    const nextStep = Number(step) + 1;
    if (nextStep > maxStep) {
      return;
    }
    router.push(`/books/${isbn}?step=${nextStep}`);
  };

  return { handlePrevious, goNext };
}
