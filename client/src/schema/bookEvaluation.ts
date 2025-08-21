import { BOOK_STATUS_OPTIONS, PERIOD_REQUIREMENT } from '@/constants/book';
import { z } from 'zod';

export const bookStatusPeriodSchema = z
  .object({
    status: z.enum(
      BOOK_STATUS_OPTIONS.map((option) => option.value),
      {
        error: '독서 상태를 선택해주세요.',
      },
    ),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const [isStartDateRequired, isEndDateRequired] =
      PERIOD_REQUIREMENT[data.status];

    if (isStartDateRequired && !data.startDate) {
      ctx.addIssue({
        code: 'custom',
        message: '독서 시작일을 선택해주세요.',
        path: ['startDate'],
      });
    }

    if (isEndDateRequired && !data.endDate) {
      ctx.addIssue({
        code: 'custom',
        message: '독서 종료일을 선택해주세요.',
        path: ['endDate'],
      });
    }

    if (data.startDate && data.endDate) {
      if (data.startDate > data.endDate) {
        ctx.addIssue({
          code: 'custom',
          message: '독서 시작일이 종료일보다 늦습니다.',
          path: ['startDate'],
        });
      }
    }
  });

export const bookRatingReviewSchema = z
  .object({
    rating: z.number().min(0.5, {
      message: '도서 평점을 선택해주세요',
    }),
    review: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.rating > 0 && (data.rating <= 1 || data.rating >= 5)) {
      if (data.review === '') {
        ctx.addIssue({
          code: 'custom',
          message: '독후감을 입력해주세요.',
          path: ['review'],
        });
      } else if (data.review && data.review.length < 100) {
        ctx.addIssue({
          code: 'custom',
          message: '독후감은 최소 100자 이상이어야 합니다.',
          path: ['review'],
        });
      }
    }
  });

export const bookQuoteSchema = z.object({
  quotes: z.array(
    z.object({
      pageNum: z.number(),
      quote: z.string(),
    }),
  ),
});

export const bookPublishSchema = z.object({
  publish: z.boolean(),
});

export const bookEvaluationSchema = bookStatusPeriodSchema
  .extend(bookRatingReviewSchema.shape)
  .extend(bookQuoteSchema.shape)
  .extend(bookPublishSchema.shape);

export type BookEvaluation = z.infer<typeof bookEvaluationSchema>;
