import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Icon from "components/icon/Icon";
import PageHeader from "components/PageHeader";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { ROUTES } from "utils/routes";
import AccountCardsData from "../components/AccountCardsData";
import Logout from "./components/Logout";
import AccountCardsSkeleton from "./components/AccountCardsSkeleton";
import { Suspense } from "react";
import { getUserDashboardData } from "./action";
import MaxWidthWrapper from "components/MaxWidthWrapper";
const TrustBadges = dynamic(
  () => import("../../(with-nav-footer)/shop/components/TrustBadges"),
);

const MyAccountScreen = async () => {
  const token = getToken();
  const deviceId = getDeviceId();

  const userDashboardData = await getUserDashboardData(token || "");

  return (
    <MaxWidthWrapper>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>Account</PageHeader>

      <div className="px-4">
        <Suspense fallback={<AccountCardsSkeleton />}>
          <AccountCardsData data={userDashboardData} />
        </Suspense>
        <div className="my-4 grid grid-cols-1 gap-x-10 md:my-6 md:grid-cols-2 lg:my-10">
          {accountNavs.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="mt-4 flex items-center justify-between border-b border-b-neutral-100 py-2 text-sm font-medium text-neutral-500"
            >
              {item.title}
              <Icon
                name="chevron"
                color="var(--neutral-400)"
                iconType="stroke"
                className="-rotate-90"
                size={22}
              />
            </Link>
          ))}
          <Logout deviceId={deviceId as string} token={token as string} />
        </div>
      </div>
      <TrustBadges />
    </MaxWidthWrapper>
  );
};

export default MyAccountScreen;

const breadcrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Account",
    href: ROUTES.ACCOUNT.ROOT,
  },
];

type AccountNav = {
  title: string;
  link: string;
};

const accountNavs: AccountNav[] = [
  {
    title: "Register a bag",
    link: ROUTES.ACCOUNT.VERIFY_BAG_RETURN("bag-number"),
  },
  // { title: "Commission Earned", link: "#" },
  { title: "My Rentals", link: ROUTES.ACCOUNT.MY_RENTALS },
  { title: "Digital Wardrobe", link: ROUTES.ACCOUNT.DIGITAL_WARDROBE.ROOT },
  { title: "My Items", link: ROUTES.ACCOUNT.MY_ITEMS },
  { title: "Pre Orders", link: ROUTES.ACCOUNT.MY_PRE_ORDERS.ROOT },
  { title: "My DKC Bags", link: ROUTES.ACCOUNT.My_DKC_BAGS },
  { title: "Order history", link: ROUTES.ACCOUNT.ORDER_HISTORY },
  { title: "Personal details", link: ROUTES.ACCOUNT.PERSONAL_DETAILS },
  { title: "My Coupons", link: ROUTES.ACCOUNT.MY_COUPONS },
  { title: "Redeem Coupons", link: ROUTES.ACCOUNT.REDEEM_COUPONS },
  { title: "Contact us", link: ROUTES.CONTACT_US },
];
