import { ReturnBagStatusTypes } from "enums/returnBagType.enum";
import { Product } from "types/product.types";
import { getToken } from "utils/getToken";

export type ReturnBag = {
  skuId: string;
  shippingStatus: string;
  shippingStatusList: string;
  orderStatus: ReturnBagStatusTypes;
  orderStatusList: string | null;
  numberOfInventory: number;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
};

export type OrderStatusList = {
  status: string;
  time: string;
};

export const getBagOrderDetails = async (id: string): Promise<ReturnBag> => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/order/return-bag/details?returnBagId=`;

    const token = getToken();

    const response = await fetch(URL + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bag details: ${response.statusText}`);
    }

    const output = await response.json();
    const data: ReturnBag = output?.data;
    return data;
  } catch (error) {
    console.error("Error fetching bag details:", error);
    throw error;
  }
};

export const getReturnBagProducts = async (
  skuId: string,
): Promise<Product[] | null> => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/product/inventory/bag-ref?bagRefId=`;

    const token = getToken();

    const response = await fetch(URL + skuId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bag products: ${response.statusText}`);
    }

    const output = await response.json();
    const data: Product[] = output?.data;
    return data;
  } catch (error) {
    console.error("Error fetching bag products:", error);
    throw error;
  }
};
