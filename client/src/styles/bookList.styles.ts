import { theme } from '@/theme';
import { css } from '@emotion/react';

export const bookListStyle = css`
  display: grid;
  width: 80%;
  margin: 0 auto;

  ${theme.breakpoints.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xs};
  }
  ${theme.breakpoints.tablet} {
    grid-template-columns: repeat(4, 1fr);
    gap: ${theme.spacing.sm};
  }
  ${theme.breakpoints.desktop} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.md};
  }
`;

export const bookCardStyle = css`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  transition: all 0.3s ease;
  height: 320px; /* 높이 통일 */
  background: white;
  width: 220px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: ${theme.colors.primary};
  }
`;

export const bookImageContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm};
  height: 160px; /* 이미지 높이 고정 */
  width: 100%;
`;
