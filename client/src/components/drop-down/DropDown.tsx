import useDropdown from '@/hooks/useDropdownState';
import { theme } from '@/theme';
import { css } from '@emotion/react';
import DropdownList from './DropdownList';
import { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

type DropdownProps = {
  options: readonly { label: string; value: string }[];
  defaultValue?: string;
  onChange: (value: string) => void;
  isError?: boolean;
};

export default function Dropdown({ options, defaultValue, onChange, isError }: DropdownProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { isOpen, activeValue, handleDropdownOpen, handleDropdownClose, handleItemSelect } = useDropdown({
    defaultValue,
    onChange,
  });
  useClickOutside({ ref: dropDownRef, callback: handleDropdownClose });

  return (
    <div
      css={css`
        position: relative;
        height: 40px;
        width: 100%;
        border: 1px solid ${isError ? theme.colors.error : theme.colors.primary};
        border-radius: ${theme.borderRadius.sm};
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        cursor: pointer;
      `}
      ref={dropDownRef}
      onClick={handleDropdownOpen}
    >
      {isOpen ? (
        <DropdownList
          options={options}
          handleClick={handleItemSelect}
        />
      ) : (
        <span>{activeValue || defaultValue || '선택'}</span>
      )}
    </div>
  );
}
