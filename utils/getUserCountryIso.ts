import { cookies } from "next/headers";

export const getCountryIso = () => {
  const iso = cookies().get("dkc-user-country")?.value;
  return iso || "GB";
};
