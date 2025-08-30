import MaxWidthWrapper from "components/MaxWidthWrapper";
import React from "react";

const RecommendationSkeleton = () => {
  return (
    <MaxWidthWrapper className="my-10 px-4">
      <div className="shimmer-loading h-7 w-72 rounded" />
      <div className="shimmer-loading mt-1 h-4 w-48 rounded" />
      <div className="mt-4 flex gap-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="shimmer-loading h-96 w-full rounded" />
          ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default RecommendationSkeleton;
