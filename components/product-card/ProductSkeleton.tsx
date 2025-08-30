import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="shimmer-loading aspect-3/4 h-full min-h-64 w-full" />
      <div className="shimmer-loading mt-1 h-5 w-2/3" />
      <div className="shimmer-loading h-3 w-full" />
      <div className="shimmer-loading mt-1.5 h-4 w-1/2" />
    </div>
  );
};

export default ProductSkeleton;
