"use client";

import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import { CartTypeEnum } from "enums/cartType.enum";
import { useToggle } from "hooks/useToggle";
import React, { useRef } from "react";
import { CartResponse, ProductCart } from "types/cart.types";
import { RentUtils } from "utils/rent";

type TotalDepositProps = {
  label: string;
  cartResponse: CartResponse[];
};

const TotalDeposit: React.FC<TotalDepositProps> = (props) => {
  const { cartResponse, label } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  const { isOpen, toggle } = useToggle();

  if (cartResponse?.every((e) => e.cart.type !== CartTypeEnum.product_rent)) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center">
        <span className={`text-neutral-400`}>{label}</span>
        <span
          className={`fall mr-2 ml-auto rounded-full bg-blue-light p-1 hover:cursor-pointer hover:bg-blue-50`}
          onClick={toggle}
        >
          <span
            className={`transition-all duration-300 ease-in-out ${isOpen ? "-scale-100" : "scale-100"}`}
          >
            <Icon
              name="chevron"
              size={18}
              iconType="stroke"
              color="var(--neutral-400)"
            />
          </span>
        </span>
        <CurrencyDisplay
          className="font-medium"
          amount={RentUtils.getTotalDeposit(cartResponse)}
        />
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen
            ? `${contentRef.current?.scrollHeight || 1000}px`
            : "0px",
        }}
      >
        <div ref={contentRef} className="pt-4 pb-3">
          <div className="flex flex-col gap-y-1 rounded-lg bg-white p-2 lg:bg-blue-light">
            {cartResponse
              ?.filter((e) => e.cart.type === CartTypeEnum.product_rent)
              ?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="max-w-[80%] truncate text-neutral-400">
                    {(item.details as ProductCart).name}
                  </span>
                  <CurrencyDisplay
                    amount={(item.details as ProductCart).depositAmount}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalDeposit;
