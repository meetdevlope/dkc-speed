import { useQuery } from "@tanstack/react-query";
import { getBagConfig } from "app/(with-nav-footer)/products/order-dkc-bag/action";

export const useGetBagConfig = (
  disableAutoFetch = false,
  staleTime = 1000 * 60 * 60, // 1 hour
) => {
  const queryResult = useQuery({
    queryKey: ["bag-config"],
    queryFn: getBagConfig,
    enabled: !disableAutoFetch,
    staleTime: staleTime,
  });

  return queryResult;
};
