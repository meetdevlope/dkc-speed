"use client";

import ProductViewCard from "components/product-card/ProductViewCard";
import { CartTypeEnum } from "enums/cartType.enum";
import React from "react";
import { CartResponse, ProductCart } from "types/cart.types";

type DetailsProductItemsProps = {
  data: CartResponse[];
  orderId: string;
};

const DetailsProductItems: React.FC<DetailsProductItemsProps> = (props) => {
  const { data, orderId } = props;
  console.log(orderId, "orderId");

  return (
    <>
      {data.map((item, index) => {
        if (item.cart.type !== CartTypeEnum.bag) {
          const {
            image,
            name,
            price,
            forRent,
            rentEndDate,
            rentStartDate,
            skuId,
          } = item.details as ProductCart;
          return (
            <div key={index} className="rounded border p-2 md:p-3">
              <ProductViewCard
                image={image}
                name={name}
                price={price}
                forRent={forRent}
                rentStartDate={rentStartDate}
                rentEndDate={rentEndDate}
                skuId={skuId}
                orderReferenceId={orderId}
                showViewRentDetailsButton
              />
            </div>
          );
        }
      })}
    </>
  );
};

export default DetailsProductItems;
