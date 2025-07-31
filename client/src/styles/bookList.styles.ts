import { theme } from "@/theme";
import { css } from "@emotion/react";

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
  padding: ${theme.spacing.sm};
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
`;

export const bookImageContainerStyle = css`
  width: 100px;
  height: 150px;
  object-fit: cover;
  overflow: hidden;
`;