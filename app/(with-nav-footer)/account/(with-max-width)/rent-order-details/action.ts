import { MyRentals } from "types/rent.types";
import { fetchData } from "utils/apiCaller";
import { OrderPaymentDetails } from "../order-details/[id]/orderDetails.types";
import toast from "react-hot-toast";
import { BaseApiResponse } from "types/baseApiTypes";

export type RentalDetailsParams =
  | { rentOrderId: string; orderReferenceId?: never; skuId?: never }
  | { rentOrderId?: never; orderReferenceId: string; skuId: string };

export const getRentDetails = async (
  token: string,
  params: RentalDetailsParams,
): Promise<RentOrderDetailsResponse> => {
  const urlParams = new URLSearchParams();

  const { orderReferenceId, rentOrderId, skuId } = params;

  if (rentOrderId) {
    urlParams.append("rentOrderId", rentOrderId);
  } else if (orderReferenceId && skuId) {
    urlParams.append("orderReferenceId", orderReferenceId);
    urlParams.append("skuId", skuId);
  }

  const url = `/order/rent-order/details?${urlParams.toString()}`;

  return fetchData<RentOrderDetailsResponse>(url, {
    token: token,
    errorMessage: "rent-order-details",
  });
};

export type RentOrderDetailsResponse = {
  details: MyRentals;
  paymentDetails: OrderPaymentDetails;
};

export const returnRentProduct = async (
  token: string,
  id: string,
): Promise<string> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/rent-order/initiate-return/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data: BaseApiResponse<string> = await res.json();

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

export const returnRentConfirm = async (
  token: string,
  id: string,
): Promise<string> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/rent-order/confirm-return/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data: BaseApiResponse<string> = await res.json();

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
