"use client";

import { useQuery } from "@tanstack/react-query";
import { getSearchSuggestions } from "app/(with-nav-footer)/action";
import { useDebounce } from "hooks/useDebounce";
import { useToggle } from "hooks/useToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "utils/helpers";
import { RecentSearchUtil } from "utils/recentSearchUtil";
import { ROUTES } from "utils/routes";
import ImageSearch from "./image-search/ImageSearch";

type SearchInput = {
  className?: string;
};

const SearchInput: React.FC<SearchInput> = (props) => {
  const { className } = props;

  const [search, setSearch] = useState<string>("");

  const {
    close: hideSuggestions,
    open: showSuggestions,
    isOpen: isOpenSuggestions,
  } = useToggle();
  const debouncedSearch = useDebounce(search, 500);
  const route = useRouter();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      showSuggestions();
      setSearch(e.target.value);
    },
    [setSearch, showSuggestions],
  );

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => getSearchSuggestions(debouncedSearch),
    enabled: debouncedSearch.length > 0,
    staleTime: 1,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef?.current &&
        !suggestionsRef?.current.contains(event.target as Node)
      ) {
        hideSuggestions();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn(
        `relative flex w-full rounded bg-blue-light px-2 py-1`,
        className,
      )}
      ref={suggestionsRef}
    >
      <input
        type="text"
        className="w-full border-none bg-transparent py-1 text-sm outline-none"
        placeholder="Zara purple dress"
        value={search}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search?.length > 0) {
            hideSuggestions();
            RecentSearchUtil.storeRecentlySearched(search);
            setSearch("");
            route.push(ROUTES.PRODUCTS.ROOT + "?search=" + search);
          }
        }}
      />

      <ImageSearch />
      {search.length > 0 && isOpenSuggestions && (
        <div className="absolute left-0 right-0 top-12 z-50 w-full border bg-white p-2">
          {suggestions && suggestions?.length > 0 && (
            <>
              {!isLoading && (
                <>
                  {suggestions?.map((item, index) => (
                    <div
                      key={index}
                      className="hover:bg-beige flex cursor-pointer items-center px-4"
                      onClick={() => {
                        RecentSearchUtil.storeRecentlySearched(item);
                        setSearch("");
                        hideSuggestions();
                      }}
                    >
                      <Link
                        href={ROUTES.PRODUCTS.ROOT + "?search=" + item}
                        className="w-full py-2"
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
            <div className="flex flex-col gap-y-1">
              {Array(4)
                .fill(null)
                .map((item) => (
                  <div
                    key={item}
                    className="hover:bg-beige flex h-10 cursor-pointer items-center"
                  >
                    <div className="shimmer-loading h-10 w-full rounded-sm" />
                  </div>
                ))}
            </div>
          )}
          {!isLoading &&
            search.length > 0 &&
            Array.isArray(suggestions) &&
            suggestions?.length < 1 && (
              <div className="flex h-10 items-center">
                <h6>
                  No suggestions found for -{" "}
                  <span className="font-semibold">{search}</span>
                </h6>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
