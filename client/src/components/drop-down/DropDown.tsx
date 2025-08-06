import useDropDownManage from '@/hooks/useDropDownManage';
import { theme } from '@/theme';
import { css } from '@emotion/react';
import DropDownList from './DropDownList';
import { useRef } from 'react';
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside';

type DropDownProps = {
  options: readonly { label: string; value: string }[];
  defalutValue?: string;
  onChange: (value: string) => void;
};

export default function DropDown({ options, defalutValue, onChange }: DropDownProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { isOpen, activeValue, handleDropDownOpen, handleClickDropClose, handleClickItem } = useDropDownManage({
    defalutValue,
    onChange,
  });
  useCloseOnClickOutside({ ref: dropDownRef, callback: handleClickDropClose });

  return (
    <div
      css={css`
        position: relative;
        height: 40px;
        width: 100%;
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.borderRadius.sm};
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        cursor: pointer;
      `}
      ref={dropDownRef}
      onClick={handleDropDownOpen}
    >
      {isOpen ? (
        <DropDownList
          options={options}
          handleClick={handleClickItem}
        />
      ) : (
        <span>{activeValue || defalutValue || options[0].label}</span>
      )}
    </div>
  );
}
