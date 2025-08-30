"use select";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAddress,
  editAddress,
} from "app/(with-nav-footer)/account/(with-max-width)/personal-details/action";
import React, { forwardRef } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { CreateAddressRequest, EditAddressRequest } from "types/address.types";
import AddressForm, { AddressInputTypes } from "./AddressForm";

type SavedAddressFormProps = {
  token: string;
  isEditMode: string;
  setIsEditMode: React.Dispatch<React.SetStateAction<string>>;
  initialValues?: AddressInputTypes;
  onFormSubmit?: () => void;
};

export type SavedAddressFormHandle = {
  clearForm: () => void;
};

const SavedAddressForm = forwardRef<
  SavedAddressFormHandle,
  SavedAddressFormProps
>((props) => {
  const { token, isEditMode, setIsEditMode, onFormSubmit, initialValues } =
    props;

  const queryClient = useQueryClient();

  const { mutateAsync: createAddressMutation } = useMutation({
    mutationFn: (address: CreateAddressRequest) =>
      createAddress(token, address),
    onSuccess: () => {
      toast.success("Address created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["get-address"],
      });
      close();
    },
    onError: (error) => {
      console.error("Error in mutation:", error.message);
      toast.error("Could not create address. Try again!");
    },
  });

  const { mutateAsync: editAddressMutation } = useMutation({
    mutationFn: (req: EditAddressRequest) => editAddress(token, req),
    onSuccess: () => {
      toast.success("Address edited successfully.");
      queryClient.invalidateQueries({
        queryKey: ["get-address"],
      });
      close();
      setIsEditMode("");
    },
    onError: (error) => {
      console.error("Error in editing address:", error.message);
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<AddressInputTypes> = async (data) => {
    const {
      area,
      city,
      country,
      line1,
      personName,
      state,
      zipCode,
      isDefault,
    } = data;

    const address: CreateAddressRequest = {
      area,
      city,
      country: country?.value,
      line1,
      personName,
      state,
      zipCode,
      isDefault,
    };

    const editAddressReq: EditAddressRequest = {
      addressId: isEditMode,
      ...address,
    };

    if (Boolean(isEditMode)) {
      try {
        editAddressMutation(editAddressReq);
      } catch (error) {
        console.log(error, "Error while editing address");
      }
    } else {
      try {
        createAddressMutation(address);
      } catch (error) {
        console.log(error, "Error while creating address");
      }
    }

    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  return (
    <AddressForm
      onFormSubmit={onSubmit}
      initialValues={initialValues}
      showSearchAddress={!isEditMode}
    />
  );
});

SavedAddressForm.displayName = "SavedAddressForm";

export default SavedAddressForm;
