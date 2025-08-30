import { getToken } from "utils/getToken";
import { OrderHistory } from "./orderHistory.types";

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/order/get`;

export const getOrderHistory = async (): Promise<OrderHistory[]> => {
  try {
    const token = getToken();

    const response = await fetch(URL, {
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
    const data: OrderHistory[] = output?.data;
    return data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
