import { useState } from 'react';

type UseDropdownProps = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export type HandleItemSelectType = ({ label, value }: { label: string; value: string }) => void;

export default function useDropdown({ defaultValue, onChange }: UseDropdownProps) {
  const [activeValue, setActiveValue] = useState<string>(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);

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

  return { activeValue, isOpen, handleDropdownOpen, handleDropdownClose, handleItemSelect };
}
