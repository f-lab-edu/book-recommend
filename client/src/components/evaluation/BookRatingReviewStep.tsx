import { css } from '@emotion/react';
import StarRating from '../rating/StarRating';
import RHFTextarea from '../textarea/RHFTextarea';
import { useFormContext } from 'react-hook-form';

const BookRatingReviewStep = () => {
  const { watch } = useFormContext();
  const rating = Number(watch('rating'));
  const shouldWriteReview = rating <= 1 || rating >= 5;

  return (
    <div
      css={css`
        display: flex;
        gap: 16px;
        width: 100%;
      `}
    >
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
      <div
        css={css`
          display: flex;
          flex-basis: 70%;
          flex-direction: column;
          gap: 8px;
        `}
      >
        <h2>독후감</h2>
        <RHFTextarea
          name="review"
          disabled={shouldWriteReview === false}
        />
      </div>
    </div>
  );
};

export default BookRatingReviewStep;
