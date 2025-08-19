import { useCallback, useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { css } from '@emotion/react';
import {
  Controller,
  FieldError,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import ErrorMessage from '../common/ErrorMessage';
import { FieldPath } from 'react-hook-form';

const useStarRatingHandle = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const starRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = useCallback(
    (index: number, onChange: (value: number) => void) => {
      setRating(index);
      onChange(index);
    },
    [],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent, starIndex: number) => {
      const starElement = starRefs.current[starIndex];
      if (!starElement) return;

      const rect = starElement.getBoundingClientRect();
      // 별 내 위치한 마우스 x 좌표
      const mouseX = event.clientX - rect.left;
      const starWidth = rect.width;

      // 별의 절반 위치
      const halfStar = starWidth / 2;
      let ratingValue;

      if (mouseX < halfStar) {
        ratingValue = starIndex + 0.5;
      } else {
        ratingValue = starIndex + 1;
      }

      setHoverRating(ratingValue);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setHoverRating(0);
  }, []);

  const renderStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const isHalfStar = (hoverRating || rating) === starIndex + 0.5;
    const isFullStar = (hoverRating || rating) >= starValue;

    if (isHalfStar) {
      return (
        <div
          key={starValue}
          css={css`
            position: relative;
          `}
        >
          {/* 왼쪽 절반 (채워진 부분) */}
          <div
            css={css`
              position: absolute;
              overflow: hidden;
              width: 50%;
            `}
          >
            <Star
              fill="gold"
              strokeWidth={0}
            />
          </div>
          {/* 오른쪽 절반 (빈 부분) */}
          <Star
            fill="#ededed"
            strokeWidth={0}
          />
        </div>
      );
    }

    return (
      <Star
        key={starValue}
        strokeWidth={0}
        fill={isFullStar ? 'gold' : '#ededed'}
      />
    );
  };

  return {
    rating,
    hoverRating,
    starRefs,
    renderStar,
    handleClick,
    handleMouseMove,
    handleMouseLeave,
  };
};

const StarRating = <T extends FieldValues>({
  totalStars = 5,
  name,
}: {
  totalStars?: number;
  name: FieldPath<T>;
}) => {
  const {
    rating,
    hoverRating,
    starRefs,
    renderStar,
    handleClick,
    handleMouseMove,
    handleMouseLeave,
  } = useStarRatingHandle();

  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const errorMessage =
    (errors as { [name: string]: FieldError })[name]?.message || '';

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: '별점을 선택해주세요.' }}
        render={({ field: { onChange } }) => (
          <div
            css={css`
              display: flex;
            `}
          >
            {[...Array(totalStars)].map((_, index) => {
              const starValue = index + 1;

              return (
                <div
                  key={starValue}
                  css={css`
                    cursor: pointer;
                    margin-right: 4px;
                    position: relative;
                  `}
                  ref={(el) => {
                    starRefs.current[index] = el;
                  }}
                  onClick={() => handleClick(hoverRating || rating, onChange)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {renderStar(index)}
                </div>
              );
            })}
          </div>
        )}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default StarRating;
