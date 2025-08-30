import { DropdownOption } from "components/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SortBy = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedSort(val);

    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", val);

    const queryString = params.toString();
    const newUrl = pathname + (queryString ? `?${queryString}` : "");

    router.push(newUrl);
  };

  return (
    <select
      value={selectedSort}
      onChange={handleChange}
      className="styled-select cursor-pointer text-center font-secondary text-sm outline-none md:text-left"
    >
      <option value="" disabled>
        SORT BY
      </option>
      {sortDropdownOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export enum SortOptions {
  NEW_ARRIVALS = "New arrivals",
  PRICE_HIGH_TO_LOW = "Price High to Low",
  PRICE_LOW_TO_HIGH = "Price Low to High",
}

export const sortDropdownOptions: DropdownOption[] = [
  { label: SortOptions.NEW_ARRIVALS, value: "NEW_ARRIVALS" },
  { label: SortOptions.PRICE_HIGH_TO_LOW, value: "PRICE_HIGH_TO_LOW" },
  { label: SortOptions.PRICE_LOW_TO_HIGH, value: "PRICE_LOW_TO_HIGH" },
];

export default SortBy;
