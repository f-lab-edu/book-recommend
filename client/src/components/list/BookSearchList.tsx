import { css } from '@emotion/react';
import { theme } from '@/theme';
import { useBookSearch } from '@/hooks/useBookSearch';
import SearchInput from '../search/SearchInput';
import SearchResults from '../search/SearchResults';

const BookSearchList = () => {
  const { searchResults, isLoading, error, searchBooks, selectBook } =
    useBookSearch();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: ${theme.spacing.lg};
      `}
    >
      <SearchInput
        onSearch={searchBooks}
        onOptionSelect={selectBook}
        placeholder="검색할 도서명을 입력하세요."
      />

      <SearchResults
        results={searchResults}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default BookSearchList;
