import { useQuery } from "@tanstack/react-query";
import { getTaxExtraCharges } from "app/(with-nav-footer)/products/order-dkc-bag/action";

export const useGetTaxAndCharges = (
  disableAutoFetch = false,
  staleTime = 1000 * 60 * 60, // 1 hour
) => {
  const queryResult = useQuery({
    queryKey: ["tax-and-charges"],
    queryFn: getTaxExtraCharges,
    staleTime: staleTime,
    enabled: !disableAutoFetch,
  });
  return queryResult;
};
