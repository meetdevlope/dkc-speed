import CustomSelect, {
  CustomSelectProps,
  DropdownOption,
} from "components/Select";
import React from "react";
import { getOptionsList } from "../action";
import { useQuery } from "@tanstack/react-query";
import { conditionId } from "utils/helpers";

interface ProductConditionDropdownProps
  extends Omit<CustomSelectProps, "options"> {
  autoFetch?: boolean;
  token: string;
}

const ProductConditionDropdown: React.FC<ProductConditionDropdownProps> = (
  props,
) => {
  const { autoFetch = true, token = "", ...rest } = props;

  const { data: optionsList, isLoading } = useQuery({
    queryFn: () => getOptionsList(token),
    queryKey: ["product-options"],
    staleTime: 1000 * 60 * 5,
    enabled: autoFetch,
  });

  const sizeList =
    optionsList?.find((e) => e?._id === conditionId)?.valueArr || [];

  const conditionOptions: DropdownOption[] = sizeList?.map((size) => ({
    label: size,
    value: size,
  }));

  return (
    <CustomSelect options={conditionOptions} loading={isLoading} {...rest} />
  );
};

export default ProductConditionDropdown;
