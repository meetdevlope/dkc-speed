"use client";

import { BagCartEnum } from "enums/bagCartType.enum";
import { CartTypeEnum } from "enums/cartType.enum";
import React, { useMemo } from "react";
import { useCartStore } from "store/cart";
import AddToCartButton from "../../components/add-to-cart/AddToCartButton";
import { BagCart } from "types/cart.types";

type NormalBagAddToCartProps = {
  token: string;
  deviceId: string;
  isBagAvailable: boolean;
  bagPrice: number;
};

const NormalBagAddToCart: React.FC<NormalBagAddToCartProps> = (props) => {
  const { deviceId, token, isBagAvailable, bagPrice } = props;

  const cartData = useCartStore((state) => state.data);

  const isDisabled = useMemo(
    () =>
      cartData?.some(
        (e) => (e?.details as BagCart).type === BagCartEnum.normal,
      ) || !isBagAvailable,
    [cartData, isBagAvailable],
  );

  return (
    <AddToCartButton
      token={token || ""}
      deviceId={deviceId || ""}
      cartType={CartTypeEnum.bag}
      bagType={BagCartEnum.normal}
      disabled={isDisabled}
      disableMessage={isDisabled ? "Not available at the moment" : ""}
      price={bagPrice}
    />
  );
};

export default NormalBagAddToCart;
