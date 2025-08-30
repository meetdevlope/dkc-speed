import MaxWidthWrapper from "components/MaxWidthWrapper";
import React from "react";

const LoadingMyItemDetails = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-2 p-4 md:flex-row">
        <div className="shimmer-loading h-96 w-full md:w-[70%]" />
        <div className="shimmer-loading aspect-3/4 h-96 w-full md:w-[30%]" />
      </div>
    </MaxWidthWrapper>
  );
};

export default LoadingMyItemDetails;
