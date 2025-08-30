import { UserWithTotalCartItems } from "types/user.types";

export const getUser = async (token: string, deviceId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/profile?userDeviceId=${deviceId}`,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      next: {
        tags: ["get-user"],
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  const response = await res.json();
  const data: UserWithTotalCartItems = response?.data;
  return data;
};
