import { getToken } from "utils/getToken";
import { MyDKCBags } from "./myDKCBags.types";

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/order/return-bag/get`;

export const getMyDKCBags = async (): Promise<MyDKCBags[]> => {
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
      throw new Error(`Failed to fetch my dkc bags: ${response.statusText}`);
    }

    const output = await response.json();
    const data: MyDKCBags[] = output?.data;
    return data;
  } catch (error) {
    console.error("Error fetching dkc bags:", error);
    throw error;
  }
};
