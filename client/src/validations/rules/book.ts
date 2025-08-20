import { FieldValues } from 'react-hook-form';

export const bookPeriodRules = {
  startDate: {
    required: (isRequired: boolean) =>
      isRequired ? '시작일을 선택해주세요.' : false,
    validate: (value: string, isRequired: boolean) => {
      if (isRequired === false) return true;
      if (value == '') return '시작일을 선택해주세요.';
      return true;
    },
  },
  endDate: {
    required: (isRequired: boolean) =>
      isRequired ? '종료일을 선택해주세요.' : false,
    validate: (value: string, formValues: FieldValues, isRequired: boolean) => {
      if (isRequired === false) return true;
      if (value == '') return '종료일을 선택해주세요.';
      if (formValues.startDate && value < formValues.startDate) {
        return '종료일은 시작일보다 늦어야 합니다.';
      }
      return true;
    },
  },
};
