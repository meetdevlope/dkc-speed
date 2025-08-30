"use client";

import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const LoadMore = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleLoadMore = () => {
    if (searchParams) {
      const currentPageSize = searchParams.get("pageSize");
      router.push(
        pathname +
          "?" +
          createQueryString(
            "pageSize",
            (Number(currentPageSize) + 1).toString(),
          ),
        {
          scroll: false,
        },
      );
    }
  };

  return (
    <div className="fall">
      <button className="text-sm hover:underline" onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMore;
