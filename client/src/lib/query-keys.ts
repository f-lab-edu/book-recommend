export type QueryType = 'bestseller' | 'ItemNewSpecial' | 'ItemEditorChoice';
type FilterType = {
  startIndex: number;
  maxResults: number;
};

export const QUERY_KEYS = {
  books: {
    default: ['books'],
    bestseller: (filter: FilterType = { startIndex: 0, maxResults: 5 }) =>
      [QUERY_KEYS.books.default, 'best-seller', filter] as const,
    newbooks: (filter: FilterType = { startIndex: 0, maxResults: 5 }) =>
      [QUERY_KEYS.books.default, 'item-new-special', filter] as const,
    autocomplete: (keyword: string) =>
      [QUERY_KEYS.books.default, 'auto-complete', keyword] as const,
    infinite: (...args: unknown[]) =>
      [QUERY_KEYS.books.default, 'infinite', ...args] as const,
  },
  recommend: {
    music: (queryType: QueryType, filter: FilterType) => {
      const filterValues = filter ? Object.values(filter) : [];
      return [queryType, ...filterValues] as const;
    },
  },
};
