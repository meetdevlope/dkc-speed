import React from "react";
import { getToken } from "utils/getToken";
import { getMyCouponsList } from "./action";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import { ROUTES } from "utils/routes";
import PageHeader from "components/PageHeader";
import NoData from "components/NoData";
import Link from "next/link";
import CouponCard from "./components/CouponCard";

const MyCouponsScreen = async () => {
  const token = await getToken();
  const myCouponsList = await getMyCouponsList(token || "");

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex flex-col items-start gap-2 pl-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pl-0">
        <PageHeader>My Coupons</PageHeader>
        <Link
          className="hover:text-primary-500 hover:underline"
          href={ROUTES.ACCOUNT.REDEEM_COUPONS}
        >
          Redeem Coupons
        </Link>
      </div>
      <div className="mb-4 p-4">
        {Array.isArray(myCouponsList) && myCouponsList?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {myCouponsList?.map((item) => (
              <CouponCard data={item} token={token || ""} key={item?._id} />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <NoData title="No coupouns redeemed" />
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
    label: "My Coupons",
    href: ROUTES.ACCOUNT.MY_COUPONS,
  },
];

export default MyCouponsScreen;
