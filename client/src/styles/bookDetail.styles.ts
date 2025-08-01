import { css } from "@emotion/react";

export const containerStyle = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const cardStyle = css`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const headerStyle = css`
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

export const coverStyle = css`
  flex-shrink: 0;
`;

export const imageStyle = css`
  width: 100px;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const placeholderStyle = css`
  width: 100px;
  height: 140px;
  background: #e9ecef;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

export const infoStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const titleStyle = css`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

export const textStyle = css`
  font-size: 14px;
  margin: 0;
  color: #666;
`;

export const contentStyle = css`
  padding: 24px;
`;

export const contentTitleStyle = css`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
`;

export const contentTextStyle = css`
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  margin: 0;
  white-space: pre-wrap;
`;

export const footerStyle = css`
  padding: 16px 24px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const priceStyle = css`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const priceTextStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const salePriceStyle = css`
  font-size: 14px;
  font-weight: 600;
  color: #dc3545;
  text-decoration: line-through;
`;

export const isbnStyle = css`
  font-size: 12px;
  color: #999;
  margin: 0;
`;