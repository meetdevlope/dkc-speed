import { cookies } from "next/headers";

export const getToken = () => {
  const token = cookies().get("dkc-token")?.value;
  return token || null;
};
