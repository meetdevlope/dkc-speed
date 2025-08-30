import { useQuery } from "@tanstack/react-query";
import { ImageComponent } from "components/image-component/ImageComponent";
import React from "react";
import { PaymentMode, useCheckoutStore } from "store/checkout";
import { PaymentOptionType } from "types/cart.types";
import { getPaymentOptions } from "../action";

type ExpressCheckoutProps = {
  onClick: (passedExpressCheckout?: PaymentOptionType) => void;
  loading?: boolean;
};

const ExpressCheckout: React.FC<ExpressCheckoutProps> = (props) => {
  const { onClick, loading } = props;

  const { data: paymentOptions, isPending } = useQuery({
    queryFn: getPaymentOptions,
    queryKey: ["payment-options"],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { setPaymentMethodId, setExpressCheckout, setPaymentMode } =
    useCheckoutStore();

  const handleOnClick = (option: PaymentOptionType) => {
    setPaymentMethodId(option.key);
    setExpressCheckout(option);
    setPaymentMode(PaymentMode.EXPRESS);
    if (option?.key) {
      onClick(option);
    }
  };

  return (
    <div className="mt-4 px-4">
      <h6 className="text-center font-medium">Express Checkout</h6>
      <div className="my-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {Array.isArray(paymentOptions?.expressCheckout) &&
          paymentOptions?.expressCheckout?.length > 0 &&
          !loading &&
          paymentOptions?.expressCheckout?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOnClick(option)}
              style={{
                backgroundColor: option?.bgColor,
              }}
              className="fall h-10 w-full cursor-pointer rounded-lg text-sm"
            >
              <ImageComponent
                src={option?.logo}
                alt={option?.name + "-alt"}
                className="mx-auto max-h-7"
                width={60}
                height={30}
              />
            </button>
          ))}
        {(isPending || loading) &&
          Array(4)
            .fill(null)
            ?.map((_, i) => (
              <div key={i} className="shimmer-loading h-10 w-full rounded-lg" />
            ))}
      </div>
    </div>
  );
};

export default ExpressCheckout;
