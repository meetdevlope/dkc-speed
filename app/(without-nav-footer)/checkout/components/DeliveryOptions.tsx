import { useQuery } from "@tanstack/react-query";
import { getShipmentOptions } from "app/(with-nav-footer)/cart/action";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import React, { useEffect } from "react";
import { useCheckoutStore } from "store/checkout";
import { ShipmentOptionsResponse } from "types/cart.types";
import { cn } from "utils/helpers";

type DeliveryOptionsProps = {
  token: string;
  className?: string;
  countryIso: string;
};

const DeliveryOptions: React.FC<DeliveryOptionsProps> = (props) => {
  const { className, token, countryIso } = props;

  const { isPending, data: deliveryOptions } = useQuery({
    queryKey: ["shipment-options", countryIso],
    queryFn: () => getShipmentOptions(token, countryIso),
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const setSelectedShipment = useCheckoutStore().setShipment;
  const selectedShipment = useCheckoutStore().shipment;

  const handleClick = (option: ShipmentOptionsResponse) => {
    setSelectedShipment(option);
  };

  useEffect(() => {
    if (
      deliveryOptions &&
      Array.isArray(deliveryOptions) &&
      deliveryOptions?.length > 0
    ) {
      setSelectedShipment(deliveryOptions[0]);
    }
  }, [deliveryOptions]);

  return (
    <div className={cn(className)}>
      <div className="mt-4">
        {Array.isArray(deliveryOptions) &&
          !isPending &&
          deliveryOptions?.length > 0 && (
            <div>
              <h5 className="mt-6 mb-2 font-medium">Delivery</h5>
              <div className="flex flex-col gap-y-2">
                {deliveryOptions?.map((option) => (
                  <div
                    key={option._id}
                    className={`flex cursor-pointer items-start gap-x-4 rounded-xl border bg-primary-100 p-4 transition-all ${selectedShipment === option ? "border-primary-400" : "border-primary-200"}`}
                    onClick={() => handleClick(option)}
                  >
                    <input
                      type="radio"
                      name="shipment-option"
                      id="shipment-option"
                      className="mt-1.5 accent-primary-500"
                      checked={selectedShipment === option}
                      onChange={() => handleClick(option)}
                    />
                    <div className="w-full">
                      <div className="flex w-full items-center justify-between">
                        <h5 className="font-medium text-neutral-500">
                          {option?.name}
                        </h5>
                        <CurrencyDisplay
                          className="text-base"
                          amount={option?.cost}
                        />
                      </div>
                      <div
                        className="mt-2 [&>*]:list-inside [&>*]:list-disc"
                        dangerouslySetInnerHTML={{
                          __html: option?.description,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        {isPending && (
          <div className="flex w-full flex-col gap-y-3">
            {Array(2)
              .fill(null)
              ?.map((_, i) => (
                <div
                  key={i}
                  className="w-full rounded-lg border border-neutral-100 bg-white p-3"
                >
                  <div className="shimmer-loading h-6 w-full rounded-lg" />
                  <div className="shimmer-loading mt-4 h-3 w-full rounded-lg" />
                  <div className="shimmer-loading mt-1 h-3 w-full rounded-lg" />
                  <div className="shimmer-loading mt-1 h-3 w-full rounded-lg" />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryOptions;
