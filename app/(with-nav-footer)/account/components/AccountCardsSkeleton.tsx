import React from "react";

const AccountCardsSkeleton = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="flex h-full flex-col gap-y-4 rounded-md p-4 shadow"
          >
            <div className="flex items-center gap-x-2">
              <div className="shimmer-loading size-9 min-w-9 rounded-md" />
              <div className="shimmer-loading h-9 w-full rounded-md" />
            </div>
            <div className="shimmer-loading h-6 w-full rounded-md" />
          </div>
        ))}
    </div>
  );
};

export default AccountCardsSkeleton;
