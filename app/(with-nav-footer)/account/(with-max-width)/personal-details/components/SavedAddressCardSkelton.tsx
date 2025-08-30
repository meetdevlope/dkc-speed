export const SavedAddressCardSkeleton = () => (
  <div className="flex flex-col gap-4 bg-white p-4">
    <div className="mt-0.5 flex h-6 items-center justify-between">
      <div className="shimmer-loading h-full w-[50%]" />
      <div className="shimmer-loading h-full w-[20%]" />
    </div>
    <div className="flex flex-col gap-1">
      <div className="shimmer-loading h-4 w-full" />
      <div className="shimmer-loading h-4 w-full" />
      <div className="shimmer-loading h-4 w-full" />
    </div>
  </div>
);
