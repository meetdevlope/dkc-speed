"use client";
import Accordion from "components/Accordion";
import { Button } from "components/Button";
import Checkbox from "components/Checkbox";
import Chip from "components/Chip";
import Divider from "components/Divider";
import Drawer from "components/Drawer";
import Icon from "components/icon/Icon";
import { useToggle } from "hooks/useToggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { PageFilters } from "types/collection.types";

type FiltersProps = {
  data: PageFilters[];
};

type FiltersType = Record<string, string[]>;

const Filters: React.FC<FiltersProps> = ({ data }) => {
  const { close, isOpen, open } = useToggle();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersType>(() => {
    const initialFilters: FiltersType = {};
    const validKeys = new Set(data.map((item) => item.label));
    searchParams.forEach((value, key) => {
      if (validKeys.has(key)) {
        initialFilters[key] = initialFilters[key]
          ? [...initialFilters[key], value]
          : [value];
      }
    });
    return initialFilters;
  });

  const [tempFilters, setTempFilters] = useState<FiltersType>({});

  useEffect(() => {
    if (filters) {
      setTempFilters(filters);
    }
  }, [filters]);

  const createQueryString = useCallback(
    (updatedFilters: FiltersType) => {
      const params = new URLSearchParams(searchParams.toString());

      const filterKeys = new Set(data.map((item) => item.label));

      const keysToCheck: string[] = [];
      params.forEach((_, key) => {
        keysToCheck.push(key);
      });

      keysToCheck.forEach((key) => {
        if (filterKeys.has(key)) {
          params.delete(key);
        }
      });

      Object.entries(updatedFilters).forEach(([key, values]) => {
        values.forEach((value) => {
          if (value) params.append(key, value);
        });
      });

      return params.toString() ? `?${params.toString()}` : "";
    },
    [searchParams, data],
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key] || [];
      let updatedFilters;
      if (currentValues.includes(value)) {
        const updatedValues = currentValues.filter((v) => v !== value);
        if (updatedValues.length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [key]: removed, ...rest } = prev;
          updatedFilters = rest;
        } else {
          updatedFilters = {
            ...prev,
            [key]: updatedValues,
          };
        }
      } else {
        updatedFilters = {
          ...prev,
          [key]: [...currentValues, value],
        };
      }
      setTempFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const handleApply = () => {
    const queryString = createQueryString(filters);
    router.push(pathname + queryString);
    close();
  };

  const handleClearFilters = () => {
    setFilters({});
    setTempFilters({});

    const params = new URLSearchParams(searchParams.toString());
    const filterKeys = new Set(data.map((item) => item.label));

    const keysToCheck: string[] = [];
    params.forEach((_, key) => {
      keysToCheck.push(key);
    });

    keysToCheck.forEach((key) => {
      if (filterKeys.has(key)) {
        params.delete(key);
      }
    });

    const queryString = params.toString() ? `?${params.toString()}` : "";
    router.push(pathname + queryString);

    close();
  };

  return (
    <div className="relative">
      <button
        onClick={open}
        className="font-mediu font-secondarym flex cursor-pointer items-center gap-2 text-sm"
      >
        FILTERS
        <Icon name="filter" iconType="stroke" className="stoke-2" size={18} />
      </button>
      <Drawer isOpen={isOpen} onClose={close} direction="right">
        <div className="flex h-full flex-col py-5">
          <div>
            <div className="flex items-center justify-between px-4">
              <h5 className="font-medium">Filter by</h5>
              <Icon name="close" iconType="stroke" onClick={close} />
            </div>
            <Divider className="my-4" />
            <div className="px-4">
              {Object.values(filters).length > 0 && (
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, values]) =>
                      values.map((value) => (
                        <Chip key={`${key}-${value}`} label={value} />
                      )),
                    )}
                  </div>
                  <Divider />
                </div>
              )}
              <div
                className="no-scrollbar flex flex-col gap-3 overflow-y-auto"
                style={{
                  maxHeight: "calc(100dvh - 150px)",
                }}
              >
                {data.map((item, index) => {
                  return (
                    <div key={index}>
                      <Accordion
                        items={[
                          {
                            title: item.label,
                            id: index.toString(),
                            content: (
                              <div className="grid grid-cols-2 gap-2">
                                {item.options.map((option, i) => {
                                  return (
                                    <Checkbox
                                      key={i}
                                      label={option.label}
                                      checked={
                                        tempFilters[item.label]?.includes(
                                          option.label,
                                        ) || false
                                      }
                                      id={option.label}
                                      onChange={() =>
                                        handleFilterChange(
                                          item.label,
                                          option.label,
                                        )
                                      }
                                    />
                                  );
                                })}
                              </div>
                            ),
                          },
                        ]}
                        allowMultiple
                      />
                    </div>
                  );
                })}
                {Array.isArray(data) && data?.length < 1 && (
                  <div className="fall">
                    <h6>No filters to show</h6>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 z-10 flex w-full items-center gap-4 bg-white px-4 pb-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleClearFilters}
              disabled={Object.keys(filters).length < 1}
              size="md"
            >
              Clear Filters
            </Button>
            <Button size="md" className="w-full" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Filters;
