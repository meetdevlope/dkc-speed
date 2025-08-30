"use client";

import Icon from "components/icon/Icon";
import { Input } from "components/Input";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const searchKey = "search";

const SearchInputURLParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get(searchKey) || "";
  const [search, setSearch] = useState<string>(initialSearch);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set(searchKey, debouncedSearch);
    } else {
      params.delete(searchKey);
    }

    if (params.toString() !== searchParams.toString()) {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [debouncedSearch]);

  return (
    <div>
      <Input
        variant="transparent"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftElement={
          <Icon
            name="search"
            iconType="stroke"
            size={20}
            className="block stroke-[1.3px]"
          />
        }
      />
    </div>
  );
};

export default SearchInputURLParam;
