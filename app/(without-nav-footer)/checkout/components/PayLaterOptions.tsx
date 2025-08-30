import { useQuery } from "@tanstack/react-query";
import { ImageComponent } from "components/image-component/ImageComponent";
import { PaymentMode, useCheckoutStore } from "store/checkout";
import { PaymentOptionType } from "types/cart.types";
import { getPaymentOptions } from "../action";

type PayLaterOptionsProps = {
  onClick: (passedPayLater?: PaymentOptionType) => void;
};

const PayLaterOptions: React.FC<PayLaterOptionsProps> = (props) => {
  const { onClick } = props;

  const { data: paymentOptions, isLoading } = useQuery({
    queryFn: getPaymentOptions,
    queryKey: ["payment-options"],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { setPaymentMethodId, setPaymentMode } = useCheckoutStore();

  const handleOnClick = (option: PaymentOptionType) => {
    setPaymentMethodId(option.key);
    setPaymentMode(PaymentMode.PAY_LATER);
    if (option?.key) {
      onClick(option);
    }
  };

  return (
    <div className="my-8 grid grid-cols-2 gap-2 px-4 lg:grid-cols-4">
      {Array.isArray(paymentOptions?.buyNowPayLater) &&
        paymentOptions?.buyNowPayLater?.length > 0 &&
        paymentOptions?.buyNowPayLater?.map((option, index) => (
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
              className="max-h-7"
              width={60}
              height={30}
            />
          </button>
        ))}
      {isLoading &&
        Array(4)
          .fill(null)
          ?.map((_, i) => (
            <div key={i} className="shimmer-loading h-10 w-full rounded-lg" />
          ))}
    </div>
  );
};

export default PayLaterOptions;
