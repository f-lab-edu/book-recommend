import { theme } from '@/theme';
import { css } from '@emotion/react';
import DropdownList from './DropdownList';
import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

type DropdownProps = {
  options: readonly { label: string; value: string }[];
  defaultValue?: string;
  onChange: (value: string) => void;
  isError?: boolean;
  needsFolded?: boolean;
  isFetching?: boolean;
};

export type HandleItemSelectType = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => void;

export default function Dropdown({
  options,
  defaultValue,
  onChange,
  isError,
  needsFolded = false,
  isFetching = false,
}: DropdownProps) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [activeValue, setActiveValue] = useState<string>(defaultValue || '');
  const [isOpen, setIsOpen] = useState(needsFolded ? false : true);

  const handleDropdownOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  const handleItemSelect: HandleItemSelectType = ({ label, value }) => {
    setActiveValue(label);
    handleDropdownClose();
    onChange(value);
  };

  useClickOutside({ ref: dropDownRef, callback: handleDropdownClose });

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        // height: 40px;
        // border: 1px solid ${isError
          ? theme.colors.error
          : theme.colors.primary};
        border-radius: ${theme.borderRadius.sm};
        padding: ${theme.spacing.sm} ${theme.spacing.md};
      `}
      ref={dropDownRef}
      onClick={handleDropdownOpen}
    >
      {/* {isOpen ? ( */}
      <DropdownList
        options={options}
        handleClick={handleItemSelect}
        isFetching={isFetching}
      />
      {/* ) : (
        <span>{activeValue || defaultValue || '선택1'}</span>
      )} */}
    </div>
  );
}
