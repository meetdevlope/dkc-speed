"use client";

import BagCartItem from "components/product-display/BagCartItem";
import ProductCartItem from "components/product-display/ProductCartItem";
import { CartTypeEnum } from "enums/cartType.enum";
import React, { useMemo } from "react";
import { BagCart, CartResponse, ProductCart } from "types/cart.types";

type ProductDisplayProps = {
  cartData: CartResponse;
  token: string;
  deviceId: string;
  viewOnly?: boolean;
  showViewRentDetailsButton?: boolean;
  orderReferenceId?: string;
  enableReturn?: boolean;
};

const ProductDisplay: React.FC<ProductDisplayProps> = (props) => {
  const {
    cartData: { cart, details },
    deviceId,
    token,
    viewOnly,
    showViewRentDetailsButton,
    orderReferenceId = "",
    enableReturn,
  } = props;

  const bagPrice = useMemo(() => {
    if (cart.type === CartTypeEnum.bag) {
      return Number(cart.quantity) * Number(details?.price);
    }
  }, [cart.quantity, cart.type, details?.price]);

  if (cart.type === CartTypeEnum.bag) {
    return (
      <BagCartItem
        type={CartTypeEnum.bag}
        quantity={cart.quantity}
        id={cart?._id || ""}
        token={token}
        deviceId={deviceId}
        price={(details as BagCart).price}
        bagType={(details as BagCart).type}
        brandId={(details as BagCart).brandId}
        viewOnly={viewOnly}
        enableReturn={enableReturn}
        bagPrice={bagPrice}
        bagQuantity={cart?.quantity || 0}
      />
    );
  } else {
    const { skuId, forRent, rentStartDate, rentEndDate, rentDays } =
      details as ProductCart;
    return (
      <ProductCartItem
        deviceId={deviceId}
        token={token}
        skuId={skuId}
        cartId={cart?._id || ""}
        forRent={forRent}
        rentStartDate={rentStartDate}
        rentEndDate={rentEndDate}
        rentDays={rentDays}
        noDelete={viewOnly}
        showViewRentDetailsButton={showViewRentDetailsButton}
        orderReferenceId={orderReferenceId}
      />
    );
  }
};

export default ProductDisplay;
