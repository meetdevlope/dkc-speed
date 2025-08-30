"use client";

import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { PageFilters } from "types/collection.types";

interface QuickFiltersProps {
  quickFilters: PageFilters;
}

const QuickFilters: React.FC<QuickFiltersProps> = ({ quickFilters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeQuickFilter = useMemo(() => {
    return searchParams.get(quickFilters?.label) || null;
  }, [searchParams, quickFilters?.label]);

  const createQueryString = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(quickFilters?.label, value);
      } else {
        params.delete(quickFilters?.label);
      }

      return params.toString() ? `?${params.toString()}` : "";
    },
    [searchParams, quickFilters?.label],
  );

  const handleQuickFilterChange = useCallback(
    (value: string) => {
      const isCurrentlyActive = activeQuickFilter === value;
      const newValue = isCurrentlyActive ? null : value;
      const queryString = createQueryString(newValue);

      router.push(pathname + queryString);
      router.refresh();
    },
    [activeQuickFilter, createQueryString, pathname, router],
  );

  const handleClearQuickFilters = useCallback(() => {
    const queryString = createQueryString(null);
    router.push(pathname + queryString);
    router.refresh();
  }, [createQueryString, pathname, router]);

  if (!quickFilters || !quickFilters?.options?.length) return null;

  const hasActiveFilter = activeQuickFilter !== null;

  return (
    <div className="no-scrollbar overflow-x-auto py-4">
      <div className="mx-auto flex w-max gap-x-4">
        {quickFilters.options.map((item) => {
          const isActive = activeQuickFilter === item?.label;

          return (
            <Button
              key={item.id}
              variant={isActive ? "primary" : "outline"}
              size="sm"
              onClick={() => {
                handleQuickFilterChange(item?.label);
              }}
            >
              {item?.label}
            </Button>
          );
        })}
        {hasActiveFilter && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearQuickFilters}
            endIcon={<Icon name="close" iconType="stroke" size={18} />}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuickFilters;
