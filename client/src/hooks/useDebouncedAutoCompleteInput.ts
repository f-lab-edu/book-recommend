import { useQuery } from '@tanstack/react-query';
import { AutoCompleteResponse } from '@/types/book';
import { useEffect, useState } from 'react';

type UseAutoCompleteInputProps = {
  keyword: string;
  fetchAutoComplete: (
    keyword: string,
  ) => Promise<readonly AutoCompleteResponse[] | null>;
  delay?: number;
};

export default function useDebouncedAutoCompleteInput({
  keyword,
  fetchAutoComplete,
  delay = 500,
}: UseAutoCompleteInputProps) {
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, delay);
    return () => clearTimeout(timer);
  }, [keyword]);

  return useQuery<readonly AutoCompleteResponse[] | null>({
    queryKey: ['autocomplete', debouncedKeyword],
    queryFn: () => fetchAutoComplete(debouncedKeyword),
  });
}
