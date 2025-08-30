"use client";

import AddToCartButton from "app/(with-nav-footer)/products/components/add-to-cart/AddToCartButton";
import { BagCartEnum } from "enums/bagCartType.enum";
import { CartTypeEnum } from "enums/cartType.enum";
import React, { useMemo } from "react";
import { useCartStore } from "store/cart";
import { Brand } from "types/brand.types";
import { BagCart } from "types/cart.types";

type BrandAddToCartProps = {
  token: string;
  deviceId: string;
  brandId: string;
  brandDetails: Brand;
  pricePerBag: number;
};

const BrandAddToCart: React.FC<BrandAddToCartProps> = (props) => {
  const {
    deviceId,
    token,
    brandId = "brandId",
    brandDetails,
    pricePerBag,
  } = props;
  const cartData = useCartStore((state) => state.data);

  const { name, bagImage } = brandDetails;

  const isInCart = useMemo(
    () => cartData?.some((e) => (e?.details as BagCart).brandId === brandId),
    [brandId, cartData],
  );

  return (
    <AddToCartButton
      deviceId={deviceId || ""}
      token={token || ""}
      cartType={CartTypeEnum.bag}
      bagType={BagCartEnum.brand}
      brandId={brandId}
      disableMessage={isInCart ? "Item already in cart" : ""}
      disabled={isInCart}
      name={"DKC X " + name}
      image={bagImage}
      price={pricePerBag}
    />
  );
};

export default BrandAddToCart;
