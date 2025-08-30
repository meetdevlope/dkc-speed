import { CurrencyDisplay } from "components/CurrencyDisplay";
import React from "react";
import { UserDashboardData } from "../account/action";
import AccountCard, {
  AccountCardTypes,
} from "../account/components/AccountCard";
import { ROUTES } from "utils/routes";

interface AccountCardsDataProps {
  data: UserDashboardData;
}

const AccountCardsData: React.FC<AccountCardsDataProps> = (props) => {
  const {
    items_sold,
    my_earnings_cash,
    my_earnings_points,
    my_items,
    my_brand_earnings_points,
  } = props.data || {};

  const accountData: AccountCardTypes[] = [
    {
      icon: "box",
      title: "Items Sold",
      data: items_sold,
      link: ROUTES.ACCOUNT.MY_ITEMS,
    },
    {
      icon: "shirt",
      title: "My Items",
      data: my_items,
      link: ROUTES.ACCOUNT.MY_ITEMS,
    },
    {
      icon: "bank-note",
      title: "My Earings",
      data: <CurrencyDisplay amount={my_earnings_cash} />,
      link: ROUTES.ACCOUNT.MY_EARNINGS,
    },
    {
      icon: "coin",
      title: "My Credit Points",
      data: my_earnings_points ? my_earnings_points + " pts" : null,
      link: ROUTES.ACCOUNT.MY_EARNINGS,
    },
    {
      icon: "coin",
      title: "My Brand Credit Points",
      data: my_brand_earnings_points ? my_brand_earnings_points + " pts" : null,
      link: ROUTES.ACCOUNT.MY_EARNINGS,
    },
    {
      icon: "leaf",
      title: "My Impact",
      link: ROUTES.ACCOUNT.MY_IMPACT,
      data: "View details",
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {accountData?.map((item, index) => <AccountCard key={index} {...item} />)}
    </div>
  );
};

export default AccountCardsData;
