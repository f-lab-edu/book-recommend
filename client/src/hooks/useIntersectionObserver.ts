import { useEffect, useRef } from "react";

type IntersectionObserverProps = {
  onIntersect: () => void;
  options?: IntersectionObserverInit;
}

export function useIntersectionObserver({ onIntersect, options }: IntersectionObserverProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    }, options);

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [onIntersect, options]);

  return { observerRef };
}