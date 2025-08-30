"use client";

import { useQuery } from "@tanstack/react-query";
import { getOptionsList } from "app/(with-nav-footer)/product-valuation/action";
import CustomSelect, {
  CustomSelectProps,
  DropdownOption,
} from "components/Select";
import React from "react";
import { ageSizeId } from "utils/helpers";

interface SizeDropdownProps extends Omit<CustomSelectProps, "options"> {
  autoFetch?: boolean;
  token: string;
}

const SizeDropdown: React.FC<SizeDropdownProps> = (props) => {
  const { autoFetch = true, token = "", ...rest } = props;

  const { data: optionsList, isLoading } = useQuery({
    queryFn: () => getOptionsList(token),
    queryKey: ["product-options"],
    staleTime: 1000 * 60 * 5,
    enabled: autoFetch,
  });

  const sizeList =
    optionsList?.find((e) => e?._id === ageSizeId)?.valueArr || [];

  const sizeOptions: DropdownOption[] = sizeList?.map((size) => ({
    label: size,
    value: size,
  }));

  return <CustomSelect options={sizeOptions} loading={isLoading} {...rest} />;
};

export default SizeDropdown;
