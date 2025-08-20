import { css } from '@emotion/react';
import BookRatingSection from './BookRatingSection';
import BookReviewSection from './BookReviewSection';

const BookRatingReviewStep = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 16px;
        width: 100%;
      `}
    >
      <BookRatingSection />
      <BookReviewSection />
    </div>
  );
};

export default BookRatingReviewStep;
