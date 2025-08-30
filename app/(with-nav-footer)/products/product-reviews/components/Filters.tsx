"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getFilterQueryParams = (
    filterOption: ReviewsFiltersOption,
  ): { dbField: string; isAscending: boolean } => {
    switch (filterOption) {
      case ReviewsFiltersOption.RECENT:
        return { dbField: "createdDate", isAscending: false };
      case ReviewsFiltersOption.ASCENDING:
        return { dbField: "ratings", isAscending: true };
      case ReviewsFiltersOption.DESCENDING:
        return { dbField: "ratings", isAscending: false };
      default:
        return { dbField: "createdDate", isAscending: false };
    }
  };

  const handleChange = (event) => {
    const filterValue = event.target.value as ReviewsFiltersOption;
    const { dbField, isAscending } = getFilterQueryParams(filterValue);

    const params = new URLSearchParams(searchParams.toString());
    params.set("dbField", dbField);
    params.set("isAscending", isAscending.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <select
      name="review-filters"
      id="review-filters"
      className="text-description text-sm"
      onChange={handleChange}
    >
      <option value={ReviewsFiltersOption.RECENT}>Most Recent</option>
      <option value={ReviewsFiltersOption.DESCENDING}>Highest Rated</option>
      <option value={ReviewsFiltersOption.ASCENDING}>Lowest Rated</option>
    </select>
  );
};

export enum ReviewsFiltersOption {
  RECENT = "recent",
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

export default Filters;
