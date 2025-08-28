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

export const bookRatingSchema = z.object({
  rating: z.number().min(0.5, {
    message: '도서 평점을 선택해주세요',
  }),
});

export const bookReviewSchema = z
  .object({
    rating: bookRatingSchema.shape.rating,
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

// export const commaSeparatedNumbersSchema = z.string().transform((val) => {
//   const _trimmedComma = val.replace(/,/g, '');
//   if (isNaN(Number(_trimmedComma))) {
//     return '';
//   }
//   return Number(_trimmedComma).toLocaleString();
// });

export const commaSeparatedNumbersSchema = (name: string) =>
  z
    .string()
    .superRefine((data, ctx) => {
      console.log('data: ', data);

      if (data === '' || data === '0') {
        ctx.addIssue({
          code: 'custom',
          message: '인용구 페이지를 입력해주세요.',
          path: [name],
        });
      }

      const _trimmedComma = data.replace(/,/g, '');
      if (isNaN(Number(_trimmedComma))) {
        ctx.addIssue({
          code: 'custom',
          message: '숫자만 입력해주세요.',
          path: [name],
        });
      }
    })
    .transform((val) => {
      const _trimmedComma = val.replace(/,/g, '');
      if (isNaN(Number(_trimmedComma))) {
        return '';
      }
      return Number(_trimmedComma).toLocaleString();
    });

export const bookQuoteSchema = (name: string) =>
  z.object({
    quotes: z
      .array(
        z.object({
          pageNum: commaSeparatedNumbersSchema(name).optional(),
          quote: z.string().optional(),
        }),
      )
      .superRefine((data, ctx) => {
        if (data.length > 1) {
          let quoteIndex = 0;
          const isPageNumEmpty = data.some((item, index) => {
            if (item.pageNum === '' || item.pageNum === '0') {
              quoteIndex = index;
              return true;
            }
            return false;
          });
          if (isPageNumEmpty) {
            ctx.addIssue({
              code: 'custom',
              message: '인용구 페이지를 입력해주세요.',
              path: [quoteIndex, 'pageNum'],
            });
          }
          const isQuoteEmpty = data.some((item, index) => {
            if (
              item.pageNum &&
              (item.quote === '' || item.quote?.trim() === '')
            ) {
              quoteIndex = index;
              return true;
            }
            return false;
          });
          if (isQuoteEmpty) {
            ctx.addIssue({
              code: 'custom',
              message: '인용구를 입력해주세요.',
              path: [quoteIndex, 'quote'],
            });
          }
          return;
        }
      }),
  });

export const bookPublishSchema = z.object({
  publish: z.boolean(),
});

export const bookEvaluationSchema = bookStatusPeriodSchema
  .extend(bookReviewSchema.shape)
  .extend(bookQuoteSchema('quotes').shape)
  .extend(bookPublishSchema.shape);

export type BookEvaluation = z.infer<typeof bookEvaluationSchema>;
