import { ComponentPropsWithoutRef } from 'react';

type DateInputProps = ComponentPropsWithoutRef<'input'> & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | readonly string[] | undefined;
  disabled: boolean;
  className?: string;
};

export default function DateInput({
  onChange,
  value,
  disabled,
  className,
}: DateInputProps) {
  return (
    <input
      type="date"
      onChange={onChange}
      value={value}
      disabled={disabled}
      className={className}
    />
  );
}
