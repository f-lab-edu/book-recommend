import React from "react";
import {
  cardStyle,
  headerStyle,
  infoStyle,
  contentStyle,
  footerStyle,
  priceStyle,
  skeletonCover,
  skeletonTitle,
  skeletonText,
  skeletonTextShort,
  skeletonContentTitle,
  skeletonContentLine,
  skeletonContentLineShort,
  skeletonPrice,
  skeletonIsbn
} from "@/styles/bookDetail.styles";

export default React.memo(function BookDetailSkeleton() {
  return (
    <div css={cardStyle}>
      <div css={headerStyle}>
        <div css={skeletonCover} />
        <div css={infoStyle}>
          <div css={skeletonTitle} />
          <div css={skeletonText} />
          <div css={skeletonTextShort} />
          <div css={skeletonTextShort} />
        </div>
      </div>

      <div css={contentStyle}>
        <div css={skeletonContentTitle} />
        <div css={skeletonContentLine} />
        <div css={skeletonContentLine} />
        <div css={skeletonContentLine} />
        <div css={skeletonContentLineShort} />
      </div>

      <div css={footerStyle}>
        <div css={priceStyle}>
          <div css={skeletonPrice} />
        </div>
        <div css={skeletonIsbn} />
      </div>
    </div>
  );
}); 