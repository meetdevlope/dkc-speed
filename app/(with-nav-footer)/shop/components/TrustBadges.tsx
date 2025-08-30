import Icon from "components/icon/Icon";
import { IconName } from "components/icon/Icons";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import React from "react";

const TrustBadges = () => {
  return (
    <MaxWidthWrapper>
      <section className="grid grid-cols-1 gap-x-4 gap-y-2 p-4 lg:grid-cols-3">
        {trustData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-md bg-blue-light p-3"
          >
            <div className="fall min-w-10">
              <Icon name={item.icon} iconType="stroke" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h6 className="font-medium text-neutral-500"> {item.title} </h6>
              <h6 className="text-neutral-400"> {item.description} </h6>
            </div>
          </div>
        ))}
      </section>
    </MaxWidthWrapper>
  );
};

export default TrustBadges;

type TrustBadge = {
  title: string;
  icon: IconName;
  description: string;
};

const trustData: TrustBadge[] = [
  {
    title: "100% SECURE SHOPPING",
    icon: "lock",
    description:
      "Shop the worlds finest designer brands with confidence on our secure website.",
  },
  {
    title: "AUTHORIZED STOCKIEST SINCE 2013",
    icon: "shirt",
    description:
      "EST 2013 - Your authorized source for the most-exclusive collections.",
  },
  {
    title: "EASY RETURNS",
    icon: "box",
    description:
      "Shop with peace of mind knowing you can return your purchase hassle-free.",
  },
];
