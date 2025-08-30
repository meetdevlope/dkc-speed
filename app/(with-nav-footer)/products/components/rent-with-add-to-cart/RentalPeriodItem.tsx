"use client";

import { CurrencyDisplay } from "components/CurrencyDisplay";
import { DiscountTypeEnum } from "enums/discountType.enum";
import React from "react";

type RentalPeriodItemProps = {
  days: string | number;
  price: string | number;
  discount: string | number;
  discountType: DiscountTypeEnum;
  selected: boolean;
  onClick: () => void;
};

const RentalPeriodItem: React.FC<RentalPeriodItemProps> = (props) => {
  const { days, discount, price, onClick, selected, discountType } = props;
  return (
    <div className={`flex cursor-pointer flex-col`} onClick={onClick}>
      <span className="mb-1 pr-2 text-right text-xs">
        Save{" "}
        {discountType === DiscountTypeEnum.percentage ? (
          ` ${discount}%`
        ) : (
          <CurrencyDisplay amount={discount} />
        )}
      </span>
      <div
        className={`flex justify-between rounded-lg border bg-primary-100 px-4 py-3 ${
          selected
            ? "border-primary-300 bg-primary-100"
            : "border-transparent bg-white"
        } `}
      >
        <h5> {days} days </h5>
        {price === "FREE" ? (
          <h6 className="font-medium">FREE</h6>
        ) : (
          <CurrencyDisplay amount={price} className="text-base font-semibold" />
        )}
      </div>
    </div>
  );
};

export default RentalPeriodItem;
