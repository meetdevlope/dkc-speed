import MaxWidthWrapper from "components/MaxWidthWrapper";
import React from "react";

const ProductDetailsLoading = () => {
  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <div className="flex w-full justify-between">
          <div className="shimmer-loading h-8 w-[40%]" />
          <div className="shimmer-loading h-8 w-[10%]" />
        </div>
        <div className="mt-4 flex flex-col gap-8 md:gap-4 lg:flex-row lg:gap-8">
          <div className="hidden w-full grid-cols-1 gap-2 lg:grid lg:max-w-[60%] xl:grid-cols-2">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div
                  className={`shimmer-loading aspect-3/4 h-full w-full`}
                  key={i}
                />
              ))}
          </div>
          <div
            className={`shimmer-loading block aspect-3/4 h-full w-full lg:hidden`}
          />
          <div className="flex w-full flex-col lg:w-[40%]">
            <div className="shimmer-loading h-12 w-full" />
            <div className="shimmer-loading mt-1 h-12 w-full" />
            <div className="mt-4 flex flex-col gap-1.5">
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <div className="shimmer-loading h-2 w-full" key={i} />
                ))}
            </div>
            <div className="shimmer-loading mt-8 h-full" />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductDetailsLoading;
