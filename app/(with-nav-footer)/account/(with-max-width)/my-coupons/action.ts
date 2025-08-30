import { fetchData } from "utils/apiCaller";
import { CouponType, DiscountType } from "../redeem-coupons/action";

export const getMyCouponsList = async (
  token: string,
): Promise<MyCouponListType[]> => {
  return fetchData<MyCouponListType[]>(`/discount/points-redeem/my-coupons`, {
    token: token,
    errorMessage: "my-points-coupon-list",
  });
};

export const getBrandCouponsDetails = async (
  token: string,
  id: string,
): Promise<CouponType> => {
  return fetchData<CouponType>(`/discount/points-redeem/details/${id}`, {
    token: token,
    errorMessage: "coupon-details",
  });
};

export const getDkcCouponsDetails = async (
  token: string,
  id: string,
): Promise<DiscountType> => {
  return fetchData<DiscountType>(`/discount/details/${id}`, {
    token: token,
    errorMessage: "coupon-details",
  });
};

export type MyCouponListType = {
  _id?: string;
  userId: string;
  redeemCode: string;
  orderId: string;
  transactionId: string;
  amount: number;
  createdDate: string;
  isWithdrawn: boolean;
  isChargesDeducted: boolean;
  authenticationCharges: number;
  shipmentCharges: number;
  bagRefId: string;
  couponRefId: string;
  couponCode: string;
  productId: string;
  commissionType: "cash" | "credit";
  addedFromBrandBag: boolean;
  isBrandCoupon: boolean;
};
