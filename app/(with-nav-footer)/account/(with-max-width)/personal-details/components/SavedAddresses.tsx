"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddressForm, {
  AddressFormHandle,
  AddressInputTypes,
} from "components/address/AddressForm";
import { Button } from "components/Button";
import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import React, { useRef } from "react";
import { editAddress, getAddress } from "../action";
import SavedAddressCard from "./SavedAddressCard";
import { SavedAddressCardSkeleton } from "./SavedAddressCardSkelton";
import { EditAddressRequest } from "types/address.types";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";
import { getCountryList } from "app/(without-nav-footer)/register/action";

type SavedAddressesProps = {
  token: string;
};

const SavedAddresses: React.FC<SavedAddressesProps> = (props) => {
  const { token } = props;

  const { isOpen, open, close } = useToggle();

  const queryClient = useQueryClient();
  const addressFormRef = useRef<AddressFormHandle>(null);

  const { data: savedAddress, isPending: loadingAddress } = useQuery({
    queryKey: ["get-address"],
    queryFn: () => getAddress(token),
  });

  const currentAddress = savedAddress?.[0];

  const { mutateAsync: editAddressMutation, isPending } = useMutation({
    mutationFn: (req: EditAddressRequest) => editAddress(token, req),
    onSuccess: () => {
      toast.success("Address edited successfully.");
      queryClient.invalidateQueries({
        queryKey: ["get-address"],
      });
      close();
    },
    onError: (error) => {
      console.error("Error in editing address:", error.message);
      toast.error(error.message);
    },
  });

  const handleSave = async () => {
    if (addressFormRef?.current) {
      const addressForm = await addressFormRef.current.submitForm();
      if (!addressForm) {
        toast.error("Please complete your address details");
        return;
      }
      if (addressForm) {
        const address: AddressInputTypes = {
          personName: addressForm.personName,
          line1: addressForm.line1,
          line2: addressForm.line2,
          area: addressForm.area,
          zipCode: addressForm.zipCode,
          country: addressForm.country,
          state: addressForm.state,
          city: addressForm.city,
          countryCode: addressForm.countryCode,
          isDefault: addressForm?.isDefault || false,
        };
        onSubmit(address);
      }
    }
  };

  const { data: countryOptions } = useQuery({
    queryFn: () => getCountryList(),
    queryKey: ["all-countries"],
    staleTime: 1000 * 60 * 5,
  });

  const onSubmit: SubmitHandler<AddressInputTypes> = (address) => {
    const editAddressReq: EditAddressRequest = {
      addressId: currentAddress?._id || "",
      ...address,
      country: address?.country?.value,
    };
    try {
      editAddressMutation(editAddressReq);
    } catch (error) {
      console.log(error, "Error while editing address");
    }
  };

  if (savedAddress && savedAddress?.length < 1) return null;

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
    <div className="w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <h6 className="font-medium">Address</h6>
        <Button
          variant="ghost"
          size="sm"
          onClick={open}
          isLoading={loadingAddress}
        >
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {!loadingAddress ? (
          <>
            {savedAddress && savedAddress?.length > 0 && (
              <SavedAddressCard {...savedAddress?.[0]} />
            )}
          </>
        ) : (
          <SavedAddressCardSkeleton />
        )}
      </div>
      {savedAddress && savedAddress?.length < 1 && (
        <div className="fall">
          <h6>No saved address found. Please click on Add Address</h6>
        </div>
      )}
      <Dialog isOpen={isOpen} onClose={close} title="Edit address" noClose>
        <AddressForm
          initialValues={transformedInitialValues}
          showSearchAddress={true}
          ref={addressFormRef}
          disableCountryRestrict
        />
        <div className="flex justify-end pb-2">
          <Button variant="ghost" className="mt-2" size="md" onClick={close}>
            Discard
          </Button>
          <Button
            className="mt-4"
            onClick={handleSave}
            size="md"
            isLoading={isPending}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default SavedAddresses;
