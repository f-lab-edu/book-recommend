export const BOOK_STATUS_WANT_TO_READ = 'want_to_read';
export const BOOK_STATUS_READING = 'reading';
export const BOOK_STATUS_COMPLETED = 'completed';
export const BOOK_STATUS_ON_HOLD = 'on_hold';

export const BOOK_STATUS_OPTIONS = [
  { label: '읽고 싶은 책', value: BOOK_STATUS_WANT_TO_READ },
  { label: '읽는 중', value: BOOK_STATUS_READING },
  { label: '읽음', value: BOOK_STATUS_COMPLETED },
  { label: '보류 중', value: BOOK_STATUS_ON_HOLD },
] as const;
