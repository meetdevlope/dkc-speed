"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import BrandRedeemCard from "./BrandRedeemCard";
import { CouponType, DiscountType } from "../action";
import NoData from "components/NoData";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import PageHeader from "components/PageHeader";
import { ROUTES } from "utils/routes";
import ToggleButton, { ToggleButtonType } from "components/ToggleButton";
import DKCRedeemCard from "./DKCRedeemCard";

type Props = {
  brandCouponData: CouponType[];
  dkcCouponData: DiscountType[];
  brandEarningPoints: number;
  creditWalletEarningPoints: number;
  token: string;
};

const RedeemCouponWrapper: React.FC<Props> = (props) => {
  const {
    brandCouponData,
    dkcCouponData,
    brandEarningPoints: pBrandEarningPoints,
    creditWalletEarningPoints: pCreditWalletEarningPoints,
    token,
  } = props;
  const [brandEarningPoints, setBrandEarningPoints] =
    useState(pBrandEarningPoints);
  const [creditWalletEarningPoints, setCreditWalletEarningPoints] = useState(
    pCreditWalletEarningPoints,
  );

  const [selectedTab, setSelectedTab] = useState<"dkc" | "brand">("dkc");
  const handlePointsDeduct = useCallback(
    (points: number) => {
      if (selectedTab === "dkc") {
        setCreditWalletEarningPoints((prev) => prev - points);
      } else {
        setBrandEarningPoints((prev) => prev - points);
      }
    },
    [selectedTab],
  );
  const visiblePoint = useMemo(() => {
    if (selectedTab === "dkc") {
      return creditWalletEarningPoints;
    } else {
      return brandEarningPoints;
    }
  }, [brandEarningPoints, creditWalletEarningPoints, selectedTab]);
  useEffect(() => {
    if (pBrandEarningPoints) {
      setBrandEarningPoints(pBrandEarningPoints);
    }
    if (pCreditWalletEarningPoints) {
      setCreditWalletEarningPoints(pCreditWalletEarningPoints);
    }
  }, [pBrandEarningPoints, pCreditWalletEarningPoints, selectedTab]);
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex flex-col items-start gap-2 pl-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pl-0">
        <PageHeader>Redeem Coupons</PageHeader>
        <h6>
          Total {selectedTab === "brand" ? "Brand" : "Earned"} Points:{" "}
          <strong>{visiblePoint} pts</strong>
        </h6>
      </div>
      <div className="px-4">
        <ToggleButton
          options={couponTypeOptions}
          onSelectionChange={(val) => setSelectedTab(val)}
          initialSelected="dkc"
          size="sm"
          className="w-1/3"
        />
      </div>
      <div className="mb-4 p-4">
        {Array.isArray(brandCouponData) &&
        selectedTab === "brand" &&
        brandCouponData?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {brandCouponData.map((item) => (
              <BrandRedeemCard
                token={token}
                key={item?._id}
                data={item}
                pointEarned={brandEarningPoints}
                selectedTab={selectedTab}
                handlePointsDeduct={handlePointsDeduct}
              />
            ))}
          </div>
        ) : (
          selectedTab === "brand" && (
            <div className="mt-4">
              <NoData title="No coupouns available" />
            </div>
          )
        )}
        {Array.isArray(dkcCouponData) &&
        selectedTab === "dkc" &&
        dkcCouponData?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {dkcCouponData.map((item) => (
              <DKCRedeemCard
                token={token}
                key={item?._id}
                data={item}
                pointEarned={creditWalletEarningPoints}
                handlePointsDeduct={handlePointsDeduct}
              />
            ))}
            {brandCouponData.map((item) => (
              <BrandRedeemCard
                token={token}
                key={item?._id}
                data={item}
                selectedTab={selectedTab}
                pointEarned={creditWalletEarningPoints}
                handlePointsDeduct={handlePointsDeduct}
              />
            ))}
          </div>
        ) : (
          selectedTab === "dkc" && (
            <div className="mt-4">
              <NoData title="No coupouns available" />
            </div>
          )
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
    label: "Redeem Coupons",
    href: ROUTES.ACCOUNT.REDEEM_COUPONS,
  },
];

const couponTypeOptions: ToggleButtonType[] = [
  {
    key: "dkc",
    value: "DKC coupons",
  },
  {
    key: "brand",
    value: "Brand coupons",
  },
];

export default RedeemCouponWrapper;
