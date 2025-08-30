"use client";

import React from "react";
import CustomSelect, { CustomSelectProps } from "./Select";
import { getCountryList } from "app/(without-nav-footer)/register/action";
import { useQuery } from "@tanstack/react-query";

interface CountryDropdownProps extends Omit<CustomSelectProps, "options"> {
  autoFetch?: boolean;
}

const CountryDropdown: React.FC<CountryDropdownProps> = (props) => {
  const { autoFetch = true, ...rest } = props;

  const { data, isLoading } = useQuery({
    queryFn: () => getCountryList(),
    queryKey: ["all-countries"],
    staleTime: 1000 * 60 * 5,
    enabled: autoFetch,
  });

  const countryOptions =
    data?.map((item) => ({
      label: item?.name,
      value: item?.iso || "",
    })) || [];

  return (
    <CustomSelect
      label="Country"
      options={countryOptions}
      loading={isLoading}
      {...rest}
    />
  );
};

export default CountryDropdown;
