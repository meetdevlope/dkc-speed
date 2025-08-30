import { ImageComponent } from "components/image-component/ImageComponent";
import React, { useRef } from "react";
import { useCheckoutStore } from "store/checkout";
import StripePaymentForm from "./StripePaymentForm";

type PaymentOptionsTileProps = {
  name: string;
  logo: string;
  stripeRef?: React.RefObject<any>;
};

const creditCardKey = "Credit/Debit Card";

const PaymentOptionsTile: React.FC<PaymentOptionsTileProps> = (props) => {
  const { name, logo, stripeRef } = props;

  const { setPaymentMethodId, paymentMethodId } = useCheckoutStore();

  const contentRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    setPaymentMethodId(name);
    setPaymentMethodId(name);
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-center gap-x-4 bg-primary-100 p-3"
        onClick={handleOnClick}
      >
        <input
          type="radio"
          className="accent-primary-500"
          checked={paymentMethodId === name}
        />
        <h6 className="font-medium capitalize"> {name} </h6>
        <ImageComponent
          src={logo}
          width={80}
          height={24}
          alt={name + "-alt"}
          className="ml-auto max-h-6"
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          maxHeight:
            paymentMethodId === name
              ? `${contentRef.current?.scrollHeight ? contentRef.current?.scrollHeight + 50 : 1000}px`
              : "0px",
        }}
      >
        <div ref={contentRef} className="p-3">
          {paymentMethodId === creditCardKey ? (
            <StripePaymentForm stripeRef={stripeRef} />
          ) : (
            <div className="p-3">
              <h6 className="text-center">
                After clicking Proceed to pay, you will be redirected to{" "}
                <span className="font-semibold capitalize">{name}</span> to
                complete your purchase securely.
              </h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentOptionsTile;
