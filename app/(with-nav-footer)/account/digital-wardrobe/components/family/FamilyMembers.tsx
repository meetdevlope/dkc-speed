import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import Link from "next/link";
import React from "react";
import { cn } from "utils/helpers";
import { getFamilyMembers } from "../../action";
import WardrobeMemberCard from "../wardrobe-items/WardrobeMemberCard";
import AddFamilyMember from "./AddFamilyMember";

interface FamilyMembersProps {
  token: string;
  isFromPage?: boolean;
}

const FamilyMembers: React.FC<FamilyMembersProps> = async (props) => {
  const { token, isFromPage } = props;

  const familyMembers = await getFamilyMembers(token);

  return (
    <div
      className={cn(
        "px-4 py-8 md:px-6 md:py-16 lg:px-10",
        isFromPage ? "bg-white" : "bg-primary-500",
      )}
    >
      <MaxWidthWrapper>
        <div className="flex items-center justify-between gap-y-2 md:flex-row">
          <h4 className="font-semibold text-white">FAMILY MEMBERS</h4>
          <AddFamilyMember token={token || ""}>
            <Button
              size="sm"
              startIcon={
                <Icon
                  name="plus"
                  className={cn("stroke-[1.5px] text-white")}
                  iconType="stroke"
                />
              }
              variant="outline"
              className={cn("border-white text-white hover:bg-primary-400/30")}
            >
              Add member
            </Button>
          </AddFamilyMember>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(familyMembers) &&
            familyMembers?.length > 0 &&
            familyMembers?.map((item, index) => (
              <WardrobeMemberCard key={index} data={item} />
            ))}
        </div>
        {(!familyMembers ||
          !Array.isArray(familyMembers) ||
          familyMembers?.length < 1) && (
          <h6 className="text-center text-white">
            No family members added yet. Please click on Add member to create
            one
          </h6>
        )}
        <div className="p-4">
          <h6 className="mt-1 text-gray-300">
            *Environmental impact data is calculated using DKC’s ReLuxe Impact™
            method.{" "}
            <Link
              href={"/sustainability-commitment"}
              className="text-white underline"
            >
              Learn more
            </Link>
          </h6>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default FamilyMembers;
