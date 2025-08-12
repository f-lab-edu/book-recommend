import { useEffect } from 'react';

type ClickOutsideProps = {
  ref: React.RefObject<HTMLElement | null>;
  callback: () => void;
};

export default function useClickOutside({ ref, callback }: ClickOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
}
