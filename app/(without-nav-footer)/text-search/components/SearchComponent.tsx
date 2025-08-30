"use client";

import { useQuery } from "@tanstack/react-query";
import { getSearchSuggestions } from "app/(with-nav-footer)/action";
import PageHeader from "components/PageHeader";
import { useDebounce } from "hooks/useDebounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RecentSearchUtil } from "utils/recentSearchUtil";
import { ROUTES } from "utils/routes";
import PopularSearches from "./PopularSearches";
import RecentSearches from "./RecentSearches";

type SearchComponentProps = {
  allRecentSearches: string[];
  popularSearches: string[];
};

const SearchComponent: React.FC<SearchComponentProps> = (props) => {
  const { popularSearches } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);
  const route = useRouter();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => getSearchSuggestions(debouncedSearch),
    enabled: debouncedSearch.length > 0,
    staleTime: 1,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <PageHeader>
        <div className="flex w-full items-stretch justify-between rounded bg-blue-light px-2">
          <input
            ref={inputRef}
            type="text"
            className="w-full border-none bg-transparent py-2 text-sm outline-none"
            placeholder="Zara purple dress"
            value={search}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search?.length > 0) {
                RecentSearchUtil.storeRecentlySearched(search);
                setSearch("");
                route.push(ROUTES.PRODUCTS.ROOT + "?search=" + search);
              }
            }}
          />
        </div>
      </PageHeader>
      <div className="mt-2 flex flex-col gap-y-8 p-4">
        {search?.length > 0 ? (
          <div>
            {suggestions && suggestions?.length > 0 && (
              <>
                {!isLoading && (
                  <>
                    <div className="mb-4">
                      <span className="text-xs font-medium text-neutral-400">
                        SUGGESTIONS
                      </span>
                    </div>
                    {suggestions?.map((item, index) => (
                      <div
                        key={index}
                        className="w-full"
                        onClick={() => {
                          RecentSearchUtil.storeRecentlySearched(item);
                          setSearch("");
                        }}
                      >
                        <Link
                          href={ROUTES.PRODUCTS.ROOT + "?search=" + item}
                          className="block w-full rounded px-2 py-3 hover:bg-neutral-50"
                        >
                          {item}
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
            {isLoading && (
              <div className="flex flex-col gap-y-3">
                {Array(6)
                  .fill(null)
                  .map((item) => (
                    <div key={item}>
                      <div className="shimmer-loading h-10 w-full rounded" />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <RecentSearches />
            <PopularSearches popularSearches={popularSearches} />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
