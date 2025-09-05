import { css } from '@emotion/react';
import { theme } from '@/theme';
import { useInfiniteBookSearch } from '@/hooks/useInfiniteBookSearch';
import SearchInput from '../search/SearchInput';
import SearchResults from '../search/SearchResults';
import { useRouter } from 'next/router';

const MAX_RESULTS = 10;

const BookSearchList = () => {
  const router = useRouter();

  const {
    data: searchResults,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    setKeyword,
    keyword,
    handleSearch,
  } = useInfiniteBookSearch(MAX_RESULTS);

  const handleSelectItem = (isbn: string) => {
    router.push(`/books/${isbn}`);
  };

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
        keyword={keyword}
        setKeyword={setKeyword}
        onSearch={handleSearch}
        onOptionSelect={handleSelectItem}
        placeholder="검색할 도서명을 입력하세요."
      />

      <SearchResults
        results={searchResults || []}
        isLoadMore={isFetchingNextPage}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default BookSearchList;
