import AccountCard, {
  AccountCardTypes,
} from "app/(with-nav-footer)/account/components/AccountCard";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import React from "react";
import { FamilyMemberOverview } from "../../../action";

interface FamilyMemberCardsProps {
  overview: FamilyMemberOverview;
}

const FamilyMemberCards: React.FC<FamilyMemberCardsProps> = async (props) => {
  const { overview } = props;

  const digitalWardrobeCardsData: AccountCardTypes[] = [
    {
      icon: "wardrobe",
      title: "Total Items",
      data: overview?.totalItems,
    },
    {
      icon: "shirt",
      title: "Purchased Items",
      data: overview?.purchasedItems,
    },
    {
      icon: "shirt",
      title: "DKC Items",
      data: overview?.dkcItems,
    },
    {
      icon: "wallet",
      title: "Total Value",
      data: <CurrencyDisplay amount={overview?.totalValue} />,
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {digitalWardrobeCardsData?.map((item, index) => (
        <AccountCard key={index} {...item} />
      ))}
    </div>
  );
};

export default FamilyMemberCards;
