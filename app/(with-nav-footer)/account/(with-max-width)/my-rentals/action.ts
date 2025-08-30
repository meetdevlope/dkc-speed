import { MyRentals } from "types/rent.types";
import { fetchData } from "utils/apiCaller";

export const getMyRentals = async (token: string): Promise<MyRentals[]> => {
  return fetchData<MyRentals[]>(`/order/rent-order/get`, {
    token: token,
    errorMessage: "my-rentals",
  });
};
