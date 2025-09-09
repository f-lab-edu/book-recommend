import { css } from '@emotion/react';
import RHFRating from '../rating/RHFRating';

const BookRatingStep = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
    >
      <h2>독서 추천 여부</h2>
      <RHFRating
        name={'rating'}
        // render={() => <input />}
      />
    </div>
  );
};

export default BookRatingStep;
