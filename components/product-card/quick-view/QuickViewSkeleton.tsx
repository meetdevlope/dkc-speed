import React from "react";
type QuickViewSkeleton = {
  direction?: "vertical" | "horizontal";
};

const QuickViewSkeleton: React.FC<QuickViewSkeleton> = (props) => {
  const { direction } = props;
  const isVertical = direction === "vertical";

  return (
    <div className={`flex gap-10 ${isVertical ? "flex-col" : "flex-row"}`}>
      <div
        className={`shimmer-loading aspect-3/4 h-[450px] ${isVertical ? "w-full" : "w-[40%]"}`}
      />
      <div className="flex flex-grow flex-col gap-4">
        <div className="shimmer-loading h-8 w-full" />
        <div className="shimmer-loading h-6 w-full" />
        <div className="my-4 flex w-full flex-col gap-1.5">
          <div className="shimmer-loading h-3 w-full" />
          <div className="shimmer-loading h-3 w-full" />
          <div className="shimmer-loading h-3 w-full" />
          <div className="shimmer-loading h-3 w-full" />
        </div>
        <div className="shimmer-loading h-16 w-full" />
      </div>
    </div>
  );
};

export default QuickViewSkeleton;
