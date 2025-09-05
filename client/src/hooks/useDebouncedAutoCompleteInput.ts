import { useQuery } from '@tanstack/react-query';
import { AutoCompleteResponse } from '@/types/book';
import { useEffect, useState } from 'react';

type UseAutoCompleteInputProps = {
  keyword: string;
  fetchOptions: (
    keyword: string,
  ) => Promise<readonly AutoCompleteResponse[] | null>;
  needDebounce?: boolean;
  delay?: number;
};

export default function useDebouncedAutoCompleteInput({
  keyword,
  fetchOptions,
  delay = 500,
}: UseAutoCompleteInputProps) {
  const [dbouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, delay);
    return () => clearTimeout(timer);
  }, [keyword]);

  return useQuery<readonly AutoCompleteResponse[] | null>({
    queryKey: ['autocomplete', dbouncedKeyword],
    queryFn: () => fetchOptions(dbouncedKeyword),
  });
}
