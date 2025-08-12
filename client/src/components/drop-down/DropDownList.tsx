import { HandleItemSelectType } from '@/hooks/useDropdownState';
import DropdownItem from './DropdownItem';
import { theme } from '@/theme';
import { css } from '@emotion/react';

type DropdownListProps = {
  options: readonly { label: string; value: string }[];
  handleClick: HandleItemSelectType;
};

export default function DropdownList({ options, handleClick }: DropdownListProps) {
  return (
    <div
      css={css`
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-top: none;
        border-radius: 0 0 ${theme.borderRadius.sm} ${theme.borderRadius.sm};
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
      `}
    >
      {options.map((option) => (
        <DropdownItem
          key={option.value}
          label={option.label}
          value={option.value}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
