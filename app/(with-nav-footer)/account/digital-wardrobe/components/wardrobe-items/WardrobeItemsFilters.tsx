"use client";

import SearchInputURLParam from "components/SearchInputURLParam";
import React from "react";
import { WardrobeCollection } from "../../action";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "utils/helpers";

interface WardrobeItemsFiltersProps {
  collectionList: WardrobeCollection[];
}

const WardrobeItemsFilters: React.FC<WardrobeItemsFiltersProps> = (props) => {
  const { collectionList } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCollectionId = searchParams.get("collection");

  const handleCollectionClick = (collectionId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCollectionId === collectionId) {
      params.delete("collection");
    } else {
      params.set("collection", collectionId);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-x-4 md:flex-row">
      <div className="w-full md:max-w-sm">
        <SearchInputURLParam />
      </div>
      <div className="no-scrollbar mt-2 flex max-w-full gap-2 overflow-x-auto overflow-y-hidden pb-2">
        {Array.isArray(collectionList) &&
          collectionList?.length > 0 &&
          collectionList?.map((item, index) => {
            const isSelected = selectedCollectionId === item._id;
            return (
              <span
                key={index}
                className={cn(
                  "cursor-pointer rounded-sm border border-primary-500 px-3 py-1.5 text-xs text-nowrap",
                  isSelected
                    ? "bg-primary-500 text-white"
                    : "text-primary-500 hover:bg-primary-200/60",
                )}
                onClick={() => handleCollectionClick(item?._id)}
              >
                {item?.name}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default WardrobeItemsFilters;
