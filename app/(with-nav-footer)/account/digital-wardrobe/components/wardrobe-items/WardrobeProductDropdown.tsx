import { useQuery } from "@tanstack/react-query";
import CustomSelect, {
  CustomSelectProps,
  DropdownOption,
} from "components/Select";
import React from "react";
import { getWardrobeItems, WardrobeListType } from "../../action";

interface WardrobeProductsDropdownProps
  extends Omit<CustomSelectProps, "options"> {
  autoFetch?: boolean;
  token: string;
}

const WardrobeProductDropdown: React.FC<WardrobeProductsDropdownProps> = (
  props,
) => {
  const { autoFetch = true, token = "", ...rest } = props;

  const { data, isLoading } = useQuery({
    queryFn: () => getWardrobeItems(token, WardrobeListType.DKC),
    queryKey: ["wardrobe-items"],
    staleTime: 1000 * 60 * 5,
    enabled: autoFetch,
  });

  const wardrobeItems: DropdownOption[] =
    data?.map((item) => ({
      label: item?.name,
      value: item?._id,
    })) || [];

  return <CustomSelect options={wardrobeItems} loading={isLoading} {...rest} />;
};

export default WardrobeProductDropdown;
