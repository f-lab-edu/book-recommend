import { css } from '@emotion/react';
import BookRatingField from './BookRatingField';
import BookReviewField from './BookReviewField';

const BookRatingReviewStep = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 16px;
        width: 100%;
      `}
    >
      <BookRatingField />
      <BookReviewField />
    </div>
  );
};

export default BookRatingReviewStep;
