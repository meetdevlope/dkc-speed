import { useEffect } from "react";
import { useCheckoutStore } from "store/checkout";
import { PaymentOptionType } from "types/cart.types";
import PaymentOptionsTile from "./PaymentOptionsTile";

const creditCardKey = "Credit/Debit Card";

type PaymentOptionsProps = {
  stripeRef: React.RefObject<any>;
};

const PaymentOptions: React.FC<PaymentOptionsProps> = (props) => {
  const { stripeRef } = props;

  const { setPaymentMethodId } = useCheckoutStore();

  const paymentOptions: PaymentOptionType[] = [];

  paymentOptions?.unshift({
    key: creditCardKey,
    bgColor: "white",
    logo: "https://dkc-media.s3.ap-south-1.amazonaws.com/cards.png",
    name: creditCardKey,
  });

  useEffect(() => {
    setPaymentMethodId(creditCardKey);
  }, []);

  return (
    <div className="mt-4 flex flex-col divide-y divide-primary-200 overflow-hidden rounded-lg border border-primary-200">
      {paymentOptions?.map((option, index) => (
        <PaymentOptionsTile
          key={index}
          name={option?.key}
          logo={option?.logo}
          stripeRef={stripeRef}
        />
      ))}
    </div>
  );
};

export default PaymentOptions;
