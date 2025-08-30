import { BaseApiResponse } from "types/baseApiTypes";
import { fetchData } from "utils/apiCaller";

export const getBrandCouponsList = async (
  token: string,
): Promise<CouponType[]> => {
  return fetchData<CouponType[]>(`/discount/points-redeem/active/list`, {
    token: token,
    errorMessage: "my-points-coupon-list",
  });
};
export const getDkcCouponsList = async (
  token: string,
): Promise<DiscountType[]> => {
  return fetchData<DiscountType[]>(`/discount/dkc-coupons`, {
    token: token,
    errorMessage: "my-points-coupon-list",
  });
};

export const redeemCoupon = async (
  token: string,
  id: string,
  type: "brand-coupon" | "dkc-coupon",
): Promise<CouponType | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/discount/points-redeem/redeem/${type}/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const response: BaseApiResponse<CouponType> = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response.data;
  } catch (error) {
    console.log(error, "Catch Error while redeem coupon");
    throw error;
  }
};

export type CouponType = {
  _id?: string;
  points: number;
  quantity: number;
  brand: [string];
  title: string;
  description: string;
  photo: string;
  createdDate: string;
  updatedDate: string;
};

export type DiscountType = {
  _id: string;
  title: string;
  visibleOnWeb: boolean;
  points: number;
  description?: string;
  couponCode: string;
  startDate?: string;
  endDate?: string;
  discountRef?: string;
  createdDate?: string;
  updatedDate?: string;
  active?: boolean;
  limitUsageCondition?: LimitUsageConditionEnum[];
  minPurchaseCondition?: MinPurchaseConditionEnum;
  minPurchaseValue?: number;
  details: {
    productQuery?: any[];
  };
};

export type MinPurchaseConditionEnum =
  | "no_condtion"
  | "min_amount"
  | "min_quantity";

export type LimitUsageConditionEnum =
  | "one_use_per_customer"
  | "number_of_times_used";
