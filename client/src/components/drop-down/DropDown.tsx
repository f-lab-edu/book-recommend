import { theme } from '@/theme';
import { css } from '@emotion/react';
import DropdownList from './DropdownList';
import useClickOutside from '@/hooks/useClickOutside';
import { useRef } from 'react';

type DropdownProps = {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  options: readonly { label: string; value: string }[];
  onOptionSelect: (value: string) => void;
  isError?: boolean;
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
  onOptionSelect,
  isError,
  isFetching = false,
  isDropdownOpen,
  setIsDropdownOpen,
}: DropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDropdownOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleItemSelect: HandleItemSelectType = ({ label, value }) => {
    handleDropdownClose();
    onOptionSelect(value);
  };

  useClickOutside({
    ref: containerRef,
    callback: handleDropdownClose,
  });

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        // border: 1px solid ${isError
          ? theme.colors.error
          : theme.colors.primary};
        border-radius: ${theme.borderRadius.sm};
        padding: ${theme.spacing.sm} ${theme.spacing.md};
      `}
      ref={containerRef}
      onClick={handleDropdownOpen}
    >
      {isDropdownOpen && (
        <DropdownList
          options={options}
          handleClick={handleItemSelect}
          isFetching={isFetching}
        />
      )}
    </div>
  );
}
