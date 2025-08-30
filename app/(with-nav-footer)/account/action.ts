import { fetchData } from "utils/apiCaller";

export const getUserDashboardData = async (
  token: string,
): Promise<UserDashboardData> => {
  return fetchData<UserDashboardData>(`/auth/user_dashboard`, {
    token: token,
    errorMessage: "rented-dates",
    shouldNotThrowErrorOnCatch: true,
  });
};

export interface UserDashboardData {
  items_sold: number;
  my_items: number;
  my_earnings_points: number;
  my_earnings_cash: number;
  my_brand_earnings_points: number;
}
