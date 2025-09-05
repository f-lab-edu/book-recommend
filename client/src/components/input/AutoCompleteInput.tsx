import { InputHTMLAttributes, useState } from 'react';
import { theme } from '@/theme';
import { css } from '@emotion/react';
import Dropdown from '../drop-down/Dropdown';
import Image from 'next/image';
import useDebouncedAutoCompleteInput from '@/hooks/useDebouncedAutoCompleteInput';

type Option = {
  value: string;
  label: string;
};

type AutoCompleteInputProps = InputHTMLAttributes<HTMLInputElement> & {
  fetchOptions: (keyword: string) => Promise<readonly Option[] | null>;
  placeholder?: string;
  onOptionSelect: (value: string) => void;
  onSearch?: (keyword: string) => void;
};

const AutoCompleteInput = ({
  onOptionSelect,
  fetchOptions,
  onSearch,
  ...props
}: AutoCompleteInputProps) => {
  const [keyword, setKeyword] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: options, isFetching } = useDebouncedAutoCompleteInput({
    keyword,
    fetchOptions,
    delay: 300,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    setIsDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(keyword);
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      `}
    >
      <div
        css={css`
          width: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          css={css`
            position: relative;
            display: flex;
            justify-self: center;
            width: 100%;
            height: 40px;
            border: 1px solid ${theme.colors.secondary};
            border-radius: ${theme.borderRadius.md};
            overflow: hidden;
          `}
        >
          <div
            css={css`
              width: 40px;
              height: 100%;
            `}
          >
            <Image
              css={css`
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: ${theme.spacing.sm};
              `}
              src="/icons/search.svg"
              alt="search"
              width={20}
              height={20}
            />
          </div>

          <input
            css={css`
              width: 100%;
              height: 100%;
              padding: ${theme.spacing.sm} ${theme.spacing.md};
              outline: none;
              border: none;
            `}
            {...props}
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
          />
        </div>

        <Dropdown
          options={options || []}
          onOptionSelect={onOptionSelect}
          isFetching={isFetching}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </div>
    </div>
  );
};

export default AutoCompleteInput;
