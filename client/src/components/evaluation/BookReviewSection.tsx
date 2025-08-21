import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import RHFTextarea from '../textarea/RHFTextarea';
import { useEffect } from 'react';
import { FORM_FIELDS } from '../../constants/formFields';

const BookReviewSection = () => {
  const { watch, trigger } = useFormContext();
  const rating = Number(watch(FORM_FIELDS.BOOK_EVALUATION.RATING));
  const shouldWriteReview = rating <= 1 || rating >= 5;

  return (
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
        name={'review'}
        disabled={shouldWriteReview === false}
      />
    </div>
  );
};

export default BookReviewSection;
