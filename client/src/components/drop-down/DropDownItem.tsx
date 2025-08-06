import { handleClickItemType } from '@/hooks/useDropDownManage';
import { theme } from '@/theme';
import { css } from '@emotion/react';

type DropDownItemProps = {
  label: string;
  value: string;
  handleClick: handleClickItemType;
};

export default function DropDownItem({ label, value, handleClick }: DropDownItemProps) {
  return (
    <li
      key={value}
      className="drop-down-item"
      css={css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        border-bottom: 1px solid ${theme.colors.secondary};
        font-size: ${theme.fontSize.sm};
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          background-color: ${theme.colors.primary};
          color: white;
        }
      `}
      onClick={(ev) => {
        ev.stopPropagation();
        handleClick({ label, value });
      }}
    >
      {label}
    </li>
  );
}
