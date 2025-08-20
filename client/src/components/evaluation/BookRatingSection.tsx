import { css } from '@emotion/react';
import RHFRating from '../rating/RHFRating';
import { FORM_FIELDS } from '../../constants/formFields';

const BookRatingSection = () => {
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
      <RHFRating
        name={FORM_FIELDS.BOOK_EVALUATION.RATING}
        rules={{ required: '별점을 선택해주세요.' }}
      />
    </div>
  );
};

export default BookRatingSection;
