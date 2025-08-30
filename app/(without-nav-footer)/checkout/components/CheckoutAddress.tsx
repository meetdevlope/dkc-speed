import { useQuery } from "@tanstack/react-query";
import { getAddress } from "app/(with-nav-footer)/account/(with-max-width)/personal-details/action";
import { getCountryList } from "app/(without-nav-footer)/register/action";
import AddressForm, { AddressInputTypes } from "components/address/AddressForm";
import Checkbox from "components/Checkbox";
import React from "react";
import { useCheckoutStore } from "store/checkout";

type CheckoutAddressProps = {
  formRef?: React.RefObject<any>;
  token: string;
};
const CheckoutAddress: React.FC<CheckoutAddressProps> = (props) => {
  const { formRef, token } = props;

  const setSaveForFuture = useCheckoutStore().setSaveForFuture;

  const handleSaveForFuture = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveForFuture(event.target.checked);
  };

  const { data: savedAddress } = useQuery({
    queryKey: ["get-address"],
    queryFn: () => getAddress(token),
  });

  const currentAddress = savedAddress?.[0];

  const { data: countryOptions } = useQuery({
    queryFn: () => getCountryList(),
    queryKey: ["all-countries"],
    staleTime: 1000 * 60 * 5,
  });

  const transformedInitialValues: AddressInputTypes | undefined =
    currentAddress && countryOptions
      ? {
          ...currentAddress,
          country: countryOptions
            .map((c) => ({
              label: c.name,
              value: c.iso,
            }))
            .find((c) => c.value === currentAddress.country) ?? {
            label: currentAddress.country,
            value: currentAddress.country,
          },
        }
      : undefined;

  return (
    <div className="mt-8">
      <AddressForm
        ref={formRef}
        initialValues={transformedInitialValues}
        hideCountry
      />
      <div className="mt-1 flex items-center gap-x-2 pl-2">
        <Checkbox id="save-address" onChange={handleSaveForFuture} />{" "}
        <label htmlFor="save-address">Save for next time</label>
      </div>
    </div>
  );
};

export default CheckoutAddress;
