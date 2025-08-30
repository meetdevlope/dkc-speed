"use client";

import { useQuery } from "@tanstack/react-query";
import { getSearchSuggestions } from "app/(with-nav-footer)/action";
import PopularSearches from "app/(without-nav-footer)/text-search/components/PopularSearches";
import RecentSearches from "app/(without-nav-footer)/text-search/components/RecentSearches";
import Icon from "components/icon/Icon";
import { Input } from "components/Input";
import { useDebounce } from "hooks/useDebounce";
import { useToggle } from "hooks/useToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { RecentSearchUtil } from "utils/recentSearchUtil";
import { ROUTES } from "utils/routes";

const SearchDesk = () => {
  const { close, isOpen, open } = useToggle();
  const route = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputMobileRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 500);

  const handleOpen = () => {
    document.body.classList.add("no-scroll");
    open();
  };

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputMobileRef.current?.focus();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    document.body.classList.remove("no-scroll");
    setSearch("");
    close();
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [close]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClose]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  const { data: suggestions, isPending } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => getSearchSuggestions(debouncedSearch),
    enabled: debouncedSearch.length > 0,
    staleTime: 1,
  });

  return (
    <div className="ml-1 lg:ml-2">
      <Icon
        name="search"
        iconType="stroke"
        size={20}
        className="mt-0.5 block stroke-[1.3px] lg:hidden"
        onClick={handleOpen}
      />
      <Input
        variant="transparent"
        placeholder="Search for..."
        className="hidden pl-0 lg:block"
        value={search}
        ref={inputRef}
        onClick={handleOpen}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search?.length > 0) {
            setSearch("");
            handleClose();
            route.push(ROUTES.PRODUCTS.ROOT + "?search=" + search);
          }
        }}
      />

      <div
        className={`absolute top-[60px] right-0 left-0 z-[1010] flex-1 border-t border-t-neutral-100 bg-white shadow-xl transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        ref={divRef}
      >
        <div className="mx-auto flex min-h-[564px] p-2 pt-0 lg:max-w-8xl lg:p-8">
          <div className="flex w-full flex-col gap-y-3 p-4 lg:mt-2 lg:gap-y-8">
            <div className="block lg:hidden">
              <Input
                variant="transparent"
                placeholder="Search for..."
                className="pl-0"
                value={search}
                ref={inputMobileRef}
                onClick={handleOpen}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search?.length > 0) {
                    setSearch("");
                    handleClose();
                    route.push(ROUTES.PRODUCTS.ROOT + "?search=" + search);
                  }
                }}
                rightElement={
                  <Icon
                    name="close"
                    iconType="stroke"
                    onClick={() => {
                      setSearch("");
                    }}
                  />
                }
              />
            </div>
            {search?.length > 0 ? (
              <div>
                {suggestions && suggestions?.length > 0 && (
                  <>
                    {!isPending && (
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
                              handleClose();
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
                {isPending && (
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
              <div className="flex gap-x-10">
                <div className="flex min-w-72 flex-col gap-y-8">
                  <RecentSearches onOptionClick={handleClose} />
                  <PopularSearches
                    popularSearches={popularSearches}
                    onOptionClick={handleClose}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`absolute top-[60px] right-0 bottom-0 left-0 z-40 h-dvh bg-black/30 transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={handleClose}
      />
    </div>
  );
};

export default SearchDesk;

const popularSearches = ["Shirt", "Pant", "T shirt", "Shorts", "Belt"];
