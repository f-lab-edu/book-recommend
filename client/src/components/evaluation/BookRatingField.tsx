import { css } from '@emotion/react';
import StarRating from '../rating/StarRating';
import { FORM_FIELDS } from '../../constants/formFields';

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
      <StarRating name={FORM_FIELDS.BOOK_EVALUATION.RATING} />
    </div>
  );
};

export default BookRatingField;
