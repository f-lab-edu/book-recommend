import { css } from '@emotion/react';
import AutoCompleteInput from '../input/AutoCompleteInput';
import { getAutoComplete } from '@/remotes/book';

interface SearchInputProps {
  onSearch: (keyword: string) => void;
  onOptionSelect: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  onSearch,
  onOptionSelect,
  placeholder = '검색할 도서명을 입력하세요.',
}: SearchInputProps) => {
  const fetchOptions = (keyword: string) => {
    return getAutoComplete(keyword);
  };

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <AutoCompleteInput
        fetchOptions={fetchOptions}
        onSearch={onSearch}
        onOptionSelect={onOptionSelect}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
