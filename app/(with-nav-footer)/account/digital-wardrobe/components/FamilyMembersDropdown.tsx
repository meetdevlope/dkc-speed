"use client";

import { useQuery } from "@tanstack/react-query";
import Icon from "components/icon/Icon";
import CustomSelect, {
  CustomSelectProps,
  DropdownOption,
} from "components/Select";
import React from "react";
import { getFamilyMembers } from "../action";
import AddFamilyMember from "./family/AddFamilyMember";

interface FamilyMembersDropdownProps
  extends Omit<CustomSelectProps, "options" | "placeholder"> {
  autoFetch?: boolean;
  token: string;
}

const FamilyMembersDropdown: React.FC<FamilyMembersDropdownProps> = (props) => {
  const { autoFetch = true, token = "", ...rest } = props;

  const { data, isLoading } = useQuery({
    queryFn: () => getFamilyMembers(token),
    queryKey: ["family-members"],
    staleTime: 1000 * 60 * 5,
    enabled: autoFetch,
  });

  const familyMembers: DropdownOption[] =
    data?.map((item) => ({
      label: item?.member?.name,
      value: item?.member?._id,
    })) || [];

  return (
    <div className="relative">
      <CustomSelect
        options={familyMembers}
        loading={isLoading}
        placeholder={
          isLoading
            ? "Loading..."
            : familyMembers?.length < 1
              ? "Add Member"
              : "Select Member"
        }
        {...rest}
      />
      <AddFamilyMember token={token}>
        <div className="absolute top-0 right-0 flex cursor-pointer items-center gap-x-1">
          <Icon name="plus" iconType="stroke" size={16} />
          <h6 className="font-medium">Add</h6>
        </div>
      </AddFamilyMember>
    </div>
  );
};

export default FamilyMembersDropdown;
