import { cookies } from "next/headers";

export const getDeviceId = () => {
  const id = cookies().get("dkc-device-id")?.value;
  return id || null;
};
