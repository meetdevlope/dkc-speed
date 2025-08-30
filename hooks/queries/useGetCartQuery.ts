import { useQuery } from "@tanstack/react-query";
import { useCart } from "hooks/useCart";

export const useGetCartQuery = (token: string, deviceIdValue: string) => {
  const { getCart } = useCart(token, deviceIdValue);

  return useQuery({
    queryKey: ["get-cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(deviceIdValue),
  });
};
