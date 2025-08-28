import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import RHFTextarea from '../textarea/RHFTextarea';

const BookReviewStep = () => {
  const { watch } = useFormContext();
  const rating = Number(watch('rating'));
  const shouldWriteReview = rating <= 1 || rating >= 5;

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 8px;
      `}
    >
      <h2>독후감</h2>
      <RHFTextarea
        name={'review'}
        disabled={shouldWriteReview === false}
      />
    </div>
  );
};

export default BookReviewStep;
