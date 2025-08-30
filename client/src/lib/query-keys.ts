export type QueryType = 'bestseller' | 'ItemNewSpecial' | 'ItemEditorChoice';
type FilterType = {
  startIndex: number;
  maxResults: number;
};

export const QUERY_KEYS = {
  // books: (queryType: QueryType, filter?: FilterType) => {
  //   const filterValues = filter ? Object.values(filter) : [];
  //   return [queryType, ...filterValues] as const;
  // },
  books: {
    default: (queryType: string) => [queryType],
    bestseller: (filter: FilterType = { startIndex: 0, maxResults: 5 }) =>
      [...QUERY_KEYS.books.default('bestseller'), filter] as const,
    newbooks: (filter: FilterType = { startIndex: 0, maxResults: 5 }) =>
      [...QUERY_KEYS.books.default('ItemNewSpecial'), filter] as const,
  },
  recommend: {
    music: (queryType: QueryType, filter: FilterType) => {
      const filterValues = filter ? Object.values(filter) : [];
      return [queryType, ...filterValues] as const;
    },
  },
};
