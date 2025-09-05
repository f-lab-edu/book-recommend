import { css } from '@emotion/react';
import AutoCompleteInput from '../input/AutoCompleteInput';
import { getAutoComplete } from '@/remotes/book';

interface SearchInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onOptionSelect: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  keyword,
  setKeyword,
  onSearch,
  onOptionSelect,
  placeholder = '검색할 도서명을 입력하세요.',
}: SearchInputProps) => {
  const fetchAutoComplete = (keyword: string) => {
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
        keyword={keyword}
        setKeyword={setKeyword}
        fetchAutoComplete={fetchAutoComplete}
        onSearch={onSearch}
        onOptionSelect={onOptionSelect}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
