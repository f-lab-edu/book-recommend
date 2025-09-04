import { HandleItemSelectType } from './Dropdown';

import DropdownItem from './DropdownItem';
import { theme } from '@/theme';
import { css } from '@emotion/react';
import Loading from '../common/Loading';

type DropdownListProps = {
  options: readonly { label: string; value: string }[];
  handleClick: HandleItemSelectType;
  isFetching?: boolean;
};

export default function DropdownList({
  options,
  handleClick,
  isFetching,
}: DropdownListProps) {
  return (
    <div
      css={css`
        position: absolute;
        top: 100%;
        left: 0;
        // border: 1px solid ${theme.colors.secondary};
        // border-top: none;
        // padding: ${theme.spacing.sm} ${theme.spacing.md};
        // border-radius: 0 0 ${theme.borderRadius.sm} ${theme.borderRadius.sm};
        width: 100%;
        height: ${isFetching ? '200px' : options.length > 0 ? 'auto' : '0px'};
        max-height: 200px;
        overflow-y: auto;
        background: white;
        z-index: 10;

        ${isFetching
          ? css`
              height: 200px;
              border: 1px solid ${theme.colors.secondary};
            `
          : `${
              options.length == 0
                ? css`
                    height: 0px;
                    border: none;
                  `
                : css`
                    height: auto;
                    border: 1px solid ${theme.colors.secondary};
                  `
            }
        `}
      `}
    >
      {isFetching && (
        <div
          css={css`
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
          `}
        >
          <Loading />
        </div>
      )}
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
