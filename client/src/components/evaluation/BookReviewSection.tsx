import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import RHFTextarea from '../textarea/RHFTextarea';
import { useEffect } from 'react';
import { FORM_FIELDS } from '../../constants/formFields';

const BookReviewSection = () => {
  const { watch, trigger } = useFormContext();
  const rating = Number(watch(FORM_FIELDS.BOOK_EVALUATION.RATING));
  const shouldWriteReview = rating <= 1 || rating >= 5;

  useEffect(() => {
    trigger(FORM_FIELDS.BOOK_EVALUATION.REVIEW);
  }, [rating, trigger]);

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
        name={FORM_FIELDS.BOOK_EVALUATION.REVIEW}
        disabled={shouldWriteReview === false}
        rules={{
          required:
            shouldWriteReview === true ? '독후감을 입력해주세요.' : false,
          validate: (value) => {
            if (shouldWriteReview === true && value.length < 100) {
              return '독후감을 100자 이상 입력해주세요.';
            }
            return true;
          },
        }}
      />
    </div>
  );
};

export default BookReviewSection;
