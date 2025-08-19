import { css } from '@emotion/react';
import StarRating from '../rating/StarRating';

const BookRatingField = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-basis: 30%;
        flex-direction: column;
        gap: 8px;
      `}
    >
      <h2>독서 추천 여부</h2>
      <StarRating />
    </div>
  );
};

export default BookRatingField;
