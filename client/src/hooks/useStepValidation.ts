import { STEP_COMPONENTS } from "@/components/book/BookEvaluationStepper";
import { useSearchParams, useParams, redirect } from "next/navigation";

export function useStepValidation() {
  const { isbn } = useParams();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");

  if (!step || !Object.keys(STEP_COMPONENTS).includes(step)) {
    redirect(`/books/${isbn}?step=1`);
  }

  return {
    step,
    isbn: isbn as string,
  };
} 