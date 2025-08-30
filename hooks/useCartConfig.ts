import { useQuery } from "@tanstack/react-query";
import {
  BagConfigJSON,
  getBagConfig,
} from "app/(with-nav-footer)/products/order-dkc-bag/action";
import React from "react";
import { useCartUIConfigStore } from "store/cartUIConfigStore";
import { jsonParser } from "utils/helpers";

export const useCartUIConfigLoader = () => {
  const { setBagConfig, setConfigLoaded } = useCartUIConfigStore();
  const isConfigLoaded = useCartUIConfigStore((state) => state.isConfigLoaded);

  const { isPending, error, data } = useQuery({
    queryKey: ["bag-config"],
    queryFn: getBagConfig,
    enabled: !isConfigLoaded,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const bagConfig: BagConfigJSON = jsonParser(data?.json);

  React.useEffect(() => {
    if (data && !isConfigLoaded) {
      if (bagConfig) {
        setBagConfig({
          pricePerBag: bagConfig.bagPrice,
          bagImage: bagConfig.bagImage,
        });
      }

      setConfigLoaded(true);
    }
  }, [data, isConfigLoaded, setBagConfig, setConfigLoaded, bagConfig]);

  return { isPending, error };
};
