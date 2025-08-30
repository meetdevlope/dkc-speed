import React from "react";
import RecommendationSkeleton from "../../components/RecommendationSkeleton";
import MaxWidthWrapper from "components/MaxWidthWrapper";

const loading = () => {
  return (
    <MaxWidthWrapper className="my-10 px-4">
      <RecommendationSkeleton />
    </MaxWidthWrapper>
  );
};

export default loading;
