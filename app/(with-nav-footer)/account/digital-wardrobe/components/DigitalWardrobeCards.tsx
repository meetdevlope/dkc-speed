import React from "react";
import AccountCard, { AccountCardTypes } from "../../components/AccountCard";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import { getToken } from "utils/getToken";
import {
  getWardrobeOverviewAndEnvFootprint,
  WardrobeListType,
} from "../action";
import { ROUTES } from "utils/routes";

const DigitalWardrobeCards = async () => {
  const token = getToken();
  const response = await getWardrobeOverviewAndEnvFootprint(token || "");
  const overview = response?.overview || {};

  console.log("token here");

  const digitalWardrobeCardsData: AccountCardTypes[] = [
    {
      icon: "wardrobe",
      title: "Total Items",
      data: overview?.totalItems,
      link: ROUTES.ACCOUNT.DIGITAL_WARDROBE.ALL_WARDROBE_ITEMS,
    },
    {
      icon: "users",
      title: "Family Members",
      data: overview?.familyMember,
      link: ROUTES.ACCOUNT.DIGITAL_WARDROBE.ALL_FAMILY_MEMBERS,
    },
    {
      icon: "shirt",
      title: "Purchased Items",
      data: overview?.dkcItems,
      link:
        ROUTES.ACCOUNT.DIGITAL_WARDROBE.ALL_WARDROBE_ITEMS +
        `?type=${WardrobeListType.DKC}`,
    },
    {
      icon: "wallet",
      title: "Total Value",
      data: <CurrencyDisplay amount={overview?.totalValue} />,
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4">
      {digitalWardrobeCardsData?.map((item, index) => (
        <AccountCard key={index} {...item} />
      ))}
    </div>
  );
};

export default DigitalWardrobeCards;
