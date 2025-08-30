import BagCartItem from "components/product-display/BagCartItem";
import ProductCartItem from "components/product-display/ProductCartItem";
import { CartTypeEnum } from "enums/cartType.enum";
import React from "react";
import { BagCart, CartResponse, ProductCart } from "types/cart.types";

export type SummaryItemProps = {
  cartData: CartResponse;
  token: string;
  deviceId: string;
};

const SummaryItem: React.FC<SummaryItemProps> = (props) => {
  const {
    cartData: { cart, details },
    deviceId,
    token,
  } = props;
  if (cart.type === CartTypeEnum.bag) {
    return (
      <div className="flex items-center justify-between pr-2">
        <BagCartItem
          type={CartTypeEnum.bag}
          quantity={cart.quantity}
          id={cart?._id || ""}
          token={token}
          deviceId={deviceId}
          price={(details as BagCart).price}
          bagType={(details as BagCart).type}
          brandId={(details as BagCart).brandId}
          viewOnly
        />
      </div>
    );
  } else {
    const { skuId, forRent, rentStartDate, rentEndDate, rentDays } = props
      .cartData.details as ProductCart;
    const { token, deviceId } = props;

    return (
      <ProductCartItem
        deviceId={deviceId}
        token={token}
        skuId={skuId}
        forRent={forRent}
        rentStartDate={rentStartDate}
        rentEndDate={rentEndDate}
        noDelete
        // viewMode
        rentDays={rentDays}
      />
    );
  }
};

export default SummaryItem;
