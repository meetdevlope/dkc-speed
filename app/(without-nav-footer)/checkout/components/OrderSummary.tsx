"use client";

import CartTotal from "components/cart/CartTotal";
import ProductDisplay from "components/product-display/ProductDisplay";
import { useGetCartQuery } from "hooks/queries/useGetCartQuery";
import dynamic from "next/dynamic";
import React, { SetStateAction } from "react";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import DiscountCode from "./DiscountCode";
import { EnvironmentalFootprintTypes } from "enums/environmentalFootprint.enum";
import { CartTypeEnum } from "enums/cartType.enum";
import { DiscountResponse } from "types/product.types";
const EnvironmentalFootprint = dynamic(
  () =>
    import(
      "../../../(with-nav-footer)/products/[slug]/components/EnvironmentalFootprint"
    ),
);

type OrderSummaryProps = {
  token: string;
  deviceId: string;
  setCouponConfig: React.Dispatch<SetStateAction<DiscountResponse>>;
};

const OrderSummary: React.FC<OrderSummaryProps> = (props) => {
  const { deviceId, token, setCouponConfig } = props;
  const deviceIdClient = getDeviceIdClient();

  const deviceIdValue = deviceIdClient || deviceId;

  const { data: cartData, isLoading } = useGetCartQuery(token, deviceIdValue);

  const showEnvironmentalFootprint = cartData?.some(
    (e) => e?.cart?.type !== CartTypeEnum.bag,
  );

  return (
    <div className="lg:max-w-md">
      <h4 className="mb-10 hidden lg:block">Order Summary</h4>
      <div className="mr-auto flex flex-col gap-2">
        {!isLoading && cartData && cartData.length > 0 && (
          <>
            {cartData.map((item, index) => (
              <ProductDisplay
                key={index}
                cartData={item}
                deviceId={deviceId}
                token={token}
                viewOnly
              />
            ))}
          </>
        )}
        {isLoading && (
          <div className="flex flex-col gap-2">
            <div className="shimmer-loading h-[107px] w-full" />
            <div className="shimmer-loading h-[60px] w-full" />
            <div className="shimmer-loading h-[300px] w-full" />
          </div>
        )}
      </div>
      {showEnvironmentalFootprint && (
        <div className="mt-8 rounded-lg border border-neutral-100">
          <EnvironmentalFootprint
            dataType={EnvironmentalFootprintTypes.CART}
            token={token || ""}
          />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="my-12 lg:max-w-md">
            <DiscountCode
              token={token || ""}
              setCouponConfig={setCouponConfig}
            />
            {/* <MyDiscountsList token={token || ""} /> */}
          </div>
          <CartTotal />
        </>
      )}
    </div>
  );
};

export default OrderSummary;
