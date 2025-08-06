import { css } from '@emotion/react';
import DropDownItem from './DropDownItem';
import { handleClickItemType } from '@/hooks/useDropDownManage';
import { theme } from '@/theme';

type DropDownListProps = {
  options: readonly { label: string; value: string }[];
  handleClick: handleClickItemType;
};

export default function DropDownList({ options, handleClick }: DropDownListProps) {
  return (
    <ul
      css={css`
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        background-color: white;
        border-radius: ${theme.borderRadius.sm};
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      `}
    >
      {options.map(({ label, value }) => (
        <DropDownItem
          key={value}
          label={label}
          value={value}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
}
