"use client";

import React, { useEffect, useState } from "react";
import CheckoutDetails from "./CheckoutDetails";
import OrderSummary from "./OrderSummary";
import { useGetCartQuery } from "hooks/queries/useGetCartQuery";
import NoData from "components/NoData";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "utils/getUser";
import { useAuthStore } from "store/auth";
import Link from "next/link";
import { Button } from "components/Button";
import { ROUTES } from "utils/routes";

type CheckoutRendererProps = {
  token: string;
  deviceId: string;
};

const CheckoutRenderer: React.FC<CheckoutRendererProps> = (props) => {
  const { deviceId, token } = props;

  const [couponConfig, setCouponConfig] = useState<any>();
  const setUser = useAuthStore((state) => state.setUser);

  const { data: cartData } = useGetCartQuery(token, deviceId);
  const { data: userData, isPending: isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: () => getUser(token, deviceId),
    enabled: !!token && !!deviceId,
  });

  useEffect(() => {
    if (userData && !isLoading) {
      setUser(userData);
    }
  }, [isLoading, setUser, userData]);

  if (Array.isArray(cartData) && cartData?.length < 1)
    return (
      <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-y-4 overflow-hidden">
        <NoData title={"No products found in cart"} />
        <Link href={ROUTES.SHOP}>
          <Button size="md">Go to Home</Button>
        </Link>
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row">
      <div className="ml-auto w-full lg:w-[55%] lg:py-6 xl:w-[50%]">
        <CheckoutDetails
          token={token as string}
          deviceId={deviceId as string}
          setCouponConfig={setCouponConfig}
          couponConfig={couponConfig}
        />
      </div>
      <div className="bg-beige hidden w-full px-6 py-10 lg:block lg:w-[45%] xl:w-[40%]">
        <OrderSummary
          token={token as string}
          deviceId={deviceId as string}
          setCouponConfig={setCouponConfig}
        />
      </div>
    </div>
  );
};

export default CheckoutRenderer;
