import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';

export default function GlobalNav() {
  return (
    <nav
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
      `}
    >
      <Link href="/">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={24}
          height={24}
        />
      </Link>
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 16px;
        `}
      >
        <Link href="/search">
          <Image
            src="/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
        </Link>
        <Link href="/mypage">
          <Image
            src="/icons/heart.svg"
            alt="heart"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </nav>
  );
}
