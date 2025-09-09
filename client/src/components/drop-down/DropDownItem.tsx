import { theme } from '@/theme';
import { css } from '@emotion/react';
import { HandleItemSelectType } from './Dropdown';

type DropdownItemProps = {
  label: string;
  value: string;
  handleClick: HandleItemSelectType;
};

export default function DropdownItem({
  label,
  value,
  handleClick,
}: DropdownItemProps) {
  return (
    <div
      css={css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        cursor: pointer;
        transition: background-color 0.2s ease;
        &:hover {
          background-color: ${theme.colors.secondary};
        }
      `}
      onClick={(e) => {
        e.stopPropagation();
        handleClick({ label, value });
      }}
    >
      {label}
    </div>
  );
}
