"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "app/(with-nav-footer)/brand/all/action";
import { useState } from "react";
import { Brand } from "types/brand.types";

const BrandCheckerInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<Brand[]>([]);

  const queryParams = new URLSearchParams();
  queryParams.append("pageSize", "1000");

  const { data, isLoading } = useQuery({
    queryFn: () => getAllBrands(queryParams.toString()),
    queryKey: ["all-brands"],
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const filtered = data?.data
      .filter((brand) => brand.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 3);

    setSearchResults(filtered || []);
  };

  return (
    <div className="w-full max-w-md">
      {!isLoading && (
        <input
          type="text"
          className="w-full rounded border border-primary-300 bg-primary-100 px-4 py-2 text-sm focus:outline-none"
          placeholder="Type brand name to check"
          value={inputValue}
          onChange={handleChange}
        />
      )}

      {isLoading && (
        <div className="shimmer-loading h-[42px] w-full rounded-md"></div>
      )}

      {!isLoading && inputValue.trim() !== "" && (
        <div className="mt-3 space-y-2">
          {searchResults.length > 0 &&
            searchResults.map((brand) => (
              <div
                key={brand?._id}
                className="flex items-center justify-between rounded border border-neutral-200 bg-white px-3 py-2 shadow-sm"
              >
                <span className="text-sm">{brand?.name}</span>
                <span className="rounded bg-primary-200 px-2 py-0.5 text-[10px] font-medium text-primary-500">
                  Accepted
                </span>
              </div>
            ))}{" "}
          {searchResults?.length < 1 && (
            <div className="text-sm text-gray-300">
              No brand available with name - {inputValue}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrandCheckerInput;
