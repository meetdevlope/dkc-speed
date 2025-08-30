"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "app/(with-nav-footer)/brand/all/action";
import CustomSelect, { CustomSelectProps } from "components/Select";
import React from "react";

interface BrandsDropdownProps extends Omit<CustomSelectProps, "options"> {
  autoFetch?: boolean;
}

const BrandsDropdown: React.FC<BrandsDropdownProps> = (props) => {
  const { autoFetch = true, ...rest } = props;

  const queryParams = new URLSearchParams();
  queryParams.append("pageSize", "1000");

  const { data, isLoading } = useQuery({
    queryFn: () => getAllBrands(queryParams?.toString()),
    queryKey: ["all-brands"],
    staleTime: 1000 * 60 * 5,
    enabled: autoFetch,
  });

  const brandsData = data?.data;

  const brandOptions =
    brandsData?.map((item) => ({
      label: item?.name,
      value: item?._id || "",
    })) || [];

  return (
    <CustomSelect
      label="Brand"
      options={brandOptions}
      loading={isLoading}
      {...rest}
    />
  );
};

export default BrandsDropdown;
