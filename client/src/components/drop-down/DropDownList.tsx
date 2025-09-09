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
        top: 0;
        left: 0;
        border: ${options.length > 0 || isFetching
          ? '1px solid ' + theme.colors.secondary
          : 'none'};
        width: 100%;
        height: ${isFetching ? '200px' : 'auto'};
        max-height: 200px;
        overflow-y: auto;
        background: white;
        z-index: 10;
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
