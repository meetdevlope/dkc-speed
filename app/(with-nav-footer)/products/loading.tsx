import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductListSkeleton from "components/product-list/ProductListSkeleton";
import React from "react";

const LoadingProducts = () => {
  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <div className="my-6 flex gap-2">
          <div className="shimmer-loading h-10 w-96" />
          <div className="shimmer-loading mb-1.5 h-10 w-20" />
        </div>
        <ProductListSkeleton />
      </div>
    </MaxWidthWrapper>
  );
};

export default LoadingProducts;
