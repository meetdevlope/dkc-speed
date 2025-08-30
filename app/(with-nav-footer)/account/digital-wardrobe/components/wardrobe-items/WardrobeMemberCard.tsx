import Icon from "components/icon/Icon";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { FamilyMemberResponse } from "../../action";
import MemberEnvironmentalFootprint from "../MemberEnvironmentalFootprint";

interface WardrobeMemberCardProps {
  data: FamilyMemberResponse;
}

const WardrobeMemberCard: React.FC<WardrobeMemberCardProps> = (props) => {
  const { data } = props;
  const { environmentFootprint, member, overview } = data || {};

  const age = dayjs().diff(member?.birthDate, "year");

  return (
    <Link href={`/account/digital-wardrobe/family-member/${member?._id}`}>
      <div className="flex h-full flex-col gap-y-6 rounded-lg bg-white p-4">
        <div className="flex w-full items-center gap-x-4">
          <div className="fall size-8 rounded-full bg-primary-500">
            <span className="text-white"> {member?.name?.[0] || "-"} </span>
          </div>
          <div className="w-full">
            <h5 className="font-medium text-primary-500">{member?.name}</h5>
            <div className="flex w-full items-center justify-between">
              <p className="text-neutral-500">
                {age} years old -{" "}
                <span className="capitalize">{member?.gender}</span>
              </p>
              {/* <Link
                href={`/account/digital-wardrobe/family-member/${member?._id}`}
                className="flex cursor-pointer items-center gap-x-1 rounded bg-gray-50 p-1 text-xs text-gray-700 capitalize hover:bg-gray-100"
              >
                <Icon name="eye" size={16} />
                View
              </Link> */}
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-x-4">
          {overview?.totalItems > 0 && (
            <div className="flex w-full items-center gap-x-2">
              <div className="fall size-12 shrink-0 rounded-lg bg-blue-light">
                <Icon
                  name="shirt"
                  iconType="stroke"
                  className="stroke-[1.5px]"
                />
              </div>
              <div>
                <h5 className="font-semibold">{overview?.totalItems} </h5>
                <p className="text-neutral-400">Total items</p>
              </div>
            </div>
          )}
          {overview?.purchasedItems > 0 && (
            <div className="flex w-full items-center gap-x-2">
              <div className="fall size-12 shrink-0 rounded-lg bg-blue-light">
                <Icon
                  name="cart"
                  iconType="stroke"
                  className="stroke-[1.5px]"
                />
              </div>
              <div>
                <h5 className="font-semibold"> {overview?.purchasedItems} </h5>
                <p className="text-neutral-400">Purchased items</p>
              </div>
            </div>
          )}
        </div>
        <div>
          <h6 className="mb-1 font-medium">Environmental Footprint</h6>
          <MemberEnvironmentalFootprint data={environmentFootprint} />
        </div>
        {/* <p className="text-center text-primary-500 underline">
        Increase Sustainability Impact by Reselling on DKC
      </p> */}
      </div>
    </Link>
  );
};

export default WardrobeMemberCard;
