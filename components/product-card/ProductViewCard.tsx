"use client";

import { CurrencyDisplay } from "components/CurrencyDisplay";
import { ImageComponent } from "components/image-component/ImageComponent";
import dayjs from "dayjs";
import React from "react";

type ProductViewCardProps = {
  image: string;
  name: string;
  size?: string;
  orderReferenceId?: string;
  skuId: string;
  price: number;
  forRent?: boolean;
  rentStartDate?: Date;
  rentEndDate?: Date;
  showViewRentDetailsButton?: boolean;
};

const ProductViewCard: React.FC<ProductViewCardProps> = (props) => {
  const { image, name, price, size, forRent, rentEndDate, rentStartDate } =
    props;

  return (
    <div>
      <div className="flex gap-4">
        <div className="shimmer-loading relative aspect-3/4 min-w-16 overflow-hidden rounded md:min-w-18">
          <ImageComponent
            fill
            src={image || ""}
            objectFit="cover"
            objectPosition="center"
            alt={`${name}-image`}
          />
        </div>
        <div className="my-auto flex w-full flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h6 className="one-lines-ellipsis font-medium">{name}</h6>
          </div>
          {size && (
            <p className="text-neutral-400">
              Size: <span className="capitalize">{size}</span>
            </p>
          )}
          <div className="flex h-full flex-col justify-center">
            <CurrencyDisplay amount={price} />
          </div>
        </div>
      </div>
      {forRent && (
        <div className="mt-1 rounded-md bg-blue-light p-1">
          <h6 className="text-center text-xs text-neutral-400">
            Rental period for this item:{" "}
            <span className="text-xs font-medium text-neutral-500">
              {dayjs(rentStartDate).format("DD MMM YY")}
            </span>{" "}
            to{" "}
            <span className="text-xs font-medium text-neutral-500">
              {dayjs(rentEndDate).format("DD MMM YY")}{" "}
            </span>
          </h6>
        </div>
      )}
    </div>
  );
};

export default ProductViewCard;
