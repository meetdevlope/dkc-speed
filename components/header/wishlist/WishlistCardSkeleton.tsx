import React from "react";

const WishlistCardSkeleton = () => {
  return (
    <div className="flex gap-4">
      <div className="shimmer-loading aspect-3/4 min-w-20" />
      <div className="flex h-full w-full flex-col justify-between">
        <div className="shimmer-loading h-5 w-full" />
        <div className="shimmer-loading h-3 w-full" />
        <div className="shimmer-loading h-5 w-full" />
      </div>
      <div className="flex h-full w-32 flex-col justify-between">
        <div className="shimmer-loading h-[40%] w-full" />
        <div className="shimmer-loading h-[40%] w-full" />
      </div>
    </div>
  );
};

export default WishlistCardSkeleton;
