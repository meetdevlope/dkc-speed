import { totalDepositKey } from "components/cart/CartTotal";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import { useGetTaxAndCharges } from "hooks/queries/useGetTaxAndCharges";
import { useToggle } from "hooks/useToggle";
import React, { SetStateAction, useRef } from "react";
import { useCartStore } from "store/cart";
import { useCheckoutStore } from "store/checkout";
import CartUtils, { ExtraChargesModel } from "utils/cartTotal";
import { RentUtils } from "utils/rent";
import OrderSummary from "./OrderSummary";
import { DiscountResponse } from "types/product.types";

type OrderSummaryMobileProps = {
  token: string;
  deviceId: string;
  setCouponConfig: React.Dispatch<SetStateAction<DiscountResponse>>;
};

const OrderSummaryMobile: React.FC<OrderSummaryMobileProps> = (props) => {
  const { deviceId, token, setCouponConfig } = props;

  const { isOpen, toggle } = useToggle(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: taxAndExtraCharges } = useGetTaxAndCharges();

  const { data: cartData, myDiscounts } = useCartStore();
  const extraCharges: ExtraChargesModel[] =
    taxAndExtraCharges?.map((item) => ({
      label: item.key,
      amount: item.value,
      isPercentage: item.valueType === "percentage",
    })) ?? [];

  extraCharges.push({
    label: totalDepositKey,
    amount: RentUtils.getTotalDeposit(cartData),
    isPercentage: false,
  });

  const shipmentCharges = useCheckoutStore().shipment?.cost;

  const cartTotal = CartUtils.getCharges(
    cartData,
    extraCharges,
    myDiscounts,
    shipmentCharges || 0,
  );

  const { total } = cartTotal;

  return (
    <div className="block lg:hidden">
      <div className="flex items-center justify-between border border-neutral-100 bg-blue-light p-4">
        <span onClick={toggle} className="flex cursor-pointer gap-x-2">
          <h6 className="font-medium">Order Summary</h6>
          <span
            className={`transition-all duration-500 ease-in-out ${isOpen ? "-scale-100" : "scale-100"}`}
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
          className="ml-auto text-base font-medium"
          amount={total}
        />
      </div>
      <div
        className={`mb-4 overflow-hidden border-b-neutral-200 transition-all duration-500 ease-in-out ${isOpen ? "border-b" : ""}`}
        style={{
          maxHeight: isOpen
            ? `${contentRef.current?.scrollHeight ? contentRef.current?.scrollHeight + 50 : 1000}px`
            : "0px",
        }}
      >
        <div ref={contentRef} className="mt-4 px-4 pb-4">
          <OrderSummary
            token={token as string}
            deviceId={deviceId as string}
            setCouponConfig={setCouponConfig}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryMobile;
