import { CustomerCommission } from "enums/customerCommission.enum";
import toast from "react-hot-toast";
import { BaseApiResponse } from "types/baseApiTypes";
import { fetchData } from "utils/apiCaller";

export const changeCommissionType = async (
  token: string,
  type: CustomerCommission,
): Promise<boolean> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-comission-type`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comissionType: type }),
      },
    );

    const data: BaseApiResponse<boolean> = await res.json();

    if (!res.ok) {
      toast.error(`${data?.message}`);
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    const msg = error as string;
    throw new Error(msg);
  }
};

export const getCommissionList = async (
  token: string,
): Promise<Record<string, boolean>> => {
  return fetchData<Record<string, boolean>>(`/auth/commission-earned`, {
    token: token,
    errorMessage: "commission-earned-list",
  });
};

export type CommissionListTypes = {
  orderId: string;
  userId: string;
  amount: number;
  createdDate: Date;
  productId: string;
  commissionType: CustomerCommission;
  addedFromBrandBag?: boolean;
  isWithdrawn: boolean;
  transactionId: string;
  couponCode: string;
  isChargesDeducted: boolean;
  authenticationCharges: number;
  shipmentCharges: number;
};
