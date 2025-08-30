import { fetchData } from "utils/apiCaller";
import { getToken } from "utils/getToken";
import { Order } from "./orderDetails.types";

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/order/details/`;

export const getOrderDetails = async (id: string): Promise<Order> => {
  try {
    const token = getToken();

    const response = await fetch(URL + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order history: ${response.statusText}`);
    }

    const output = await response.json();
    const data: Order = output?.data;
    return data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const getReturnBagStatus = async (
  token: string,
  orderId: string,
): Promise<Record<string, boolean>> => {
  return fetchData<Record<string, boolean>>(`/order/details/${orderId}/sku`, {
    token: token,
    errorMessage: "bag-status-details",
  });
};
