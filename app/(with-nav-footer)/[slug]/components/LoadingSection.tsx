import MaxWidthWrapper from "components/MaxWidthWrapper";
import React from "react";

const LoadingSection = () => {
  return (
    <MaxWidthWrapper className="w-full space-y-6 px-4 py-8 md:px-8 lg:px-12 xl:px-0">
      <div className="h-12 w-full animate-pulse rounded-md bg-gray-200" />
      <div className="h-8 w-3/4 animate-pulse rounded-md bg-gray-200" />
      <div className="h-64 w-full animate-pulse rounded-md bg-gray-200" />
      <div className="h-32 w-2/3 animate-pulse rounded-md bg-gray-200" />
    </MaxWidthWrapper>
  );
};

export default LoadingSection;
