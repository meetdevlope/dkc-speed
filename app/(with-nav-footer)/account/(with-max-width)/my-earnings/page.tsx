import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import PageHeader from "components/PageHeader";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import { getUserDashboardData } from "../../action";
import AccountCard, { AccountCardTypes } from "../../components/AccountCard";
import { getCommissionList } from "./action";
import CommissionToggle from "./components/CommissionToggle";
import CommissionListItem from "./components/CommissionListItem";
import NoData from "components/NoData";
import Link from "next/link";

const MyEarningsScreen = async () => {
  const token = await getToken();

  const commissionList = await getCommissionList(token || "");
  const userDashboardData = await getUserDashboardData(token || "");
  const { my_earnings_cash, my_earnings_points, my_brand_earnings_points } =
    userDashboardData || {};

  const accountData: AccountCardTypes[] = [
    {
      icon: "bank-note",
      title: "My Earings",
      data: <CurrencyDisplay amount={my_earnings_cash} />,
    },
    {
      icon: "coin",
      title: "My Credit Points",
      data: my_earnings_points + " pts",
    },
    {
      icon: "coin",
      title: "My Brand Credit Points",
      data: my_brand_earnings_points ? my_brand_earnings_points + " pts" : null,
    },
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex flex-col items-start gap-2 pl-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pl-0">
        <PageHeader>My Earnings</PageHeader>
        <Link
          className="hover:text-primary-500 hover:underline"
          href={ROUTES.ACCOUNT.REDEEM_COUPONS}
        >
          Redeem Coupons
        </Link>
      </div>
      <div className="p-4">
        <CommissionToggle token={token || ""} />
        <div className="mt-6 grid grid-cols-2 gap-4 md:mt-10 lg:grid-cols-4">
          {accountData?.map((item, index) => (
            <AccountCard key={index} {...item} />
          ))}
        </div>
        <h5 className="mt-8 font-medium md:mt-10">Commission List</h5>
        {Array.isArray(commissionList) && commissionList?.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {commissionList?.map((item, index) => (
              <CommissionListItem key={index} {...item} />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <NoData title="No commission found" />
          </div>
        )}
      </div>
    </div>
  );
};

const breadcrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Account",
    href: ROUTES.ACCOUNT.ROOT,
  },
  {
    label: "My Earnings",
    href: ROUTES.ACCOUNT.MY_EARNINGS,
  },
];

export default MyEarningsScreen;
