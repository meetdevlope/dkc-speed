import { getToken } from "utils/getToken";
import { getUserDashboardData } from "../../action";
import RedeemCouponWrapper from "./components/RedeemCouponWrapper";
import { getBrandCouponsList, getDkcCouponsList } from "./action";

const RedeemCoupons = async () => {
  const token = getToken();
  const brandCouponsList = await getBrandCouponsList(token || "");
  const dkcCouponsList = await getDkcCouponsList(token || "");
  const userDashboardData = await getUserDashboardData(token || "");
  const { my_brand_earnings_points, my_earnings_points } =
    userDashboardData || {};

  return (
    <RedeemCouponWrapper
      brandCouponData={brandCouponsList}
      dkcCouponData={dkcCouponsList}
      brandEarningPoints={my_brand_earnings_points}
      creditWalletEarningPoints={my_earnings_points}
      token={token || ""}
    />
  );
};

export default RedeemCoupons;
