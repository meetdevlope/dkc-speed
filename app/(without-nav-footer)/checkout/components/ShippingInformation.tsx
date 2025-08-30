"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAddress,
  getAddress,
} from "app/(with-nav-footer)/account/(with-max-width)/personal-details/action";
import { AddressInputTypes } from "components/address/AddressForm";
import SavedAddressForm, {
  SavedAddressFormHandle,
} from "components/address/SavedAddressForm";
import DeleteDialog from "components/DeleteDialog";
import Dialog from "components/Dialog";
import { Icons } from "components/Icons";
import { useToggle } from "hooks/useToggle";
import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import SavedAddressCard from "../../../(with-nav-footer)/account/(with-max-width)/personal-details/components/SavedAddressCard";

type ShippingInformationProps = {
  token: string;
  setAddressString: React.Dispatch<React.SetStateAction<string>>;
};

const ShippingInformation: React.FC<ShippingInformationProps> = (props) => {
  const { token, setAddressString } = props;

  const { isOpen, open, close } = useToggle();
  const [openDeleteAddressDialog, setOpenDeleteAddressDialog] =
    useState<string>("");
  const [editFormValues, setEditFormValues] = useState<AddressInputTypes>();

  const [isEditMode, setIsEditMode] = useState<string>("");

  const { data: savedAddress, isLoading: loadingAddress } = useQuery({
    queryKey: ["get-address"],
    queryFn: () => getAddress(token),
  });

  const { mutateAsync: deleteAddressMutation } = useMutation({
    mutationFn: () => deleteAddress(token, openDeleteAddressDialog),
    onSuccess: () => {
      toast.success("Address deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["get-address"],
      });
      setAddressString("");
      setOpenDeleteAddressDialog("");
    },
    onError: (error) => {
      console.error("Error in mutation:", error.message);
      toast.error("Could not delete address. Try again!");
    },
  });

  const handleDeleteAddress = useCallback(async () => {
    try {
      await deleteAddressMutation();
    } catch (error) {
      console.log(error, "Catch error deleting address");
    }
  }, [deleteAddressMutation]);

  const queryClient = useQueryClient();

  const addressFormRef = useRef<SavedAddressFormHandle>(null);

  const handleClearForm = () => {
    if (addressFormRef.current) {
      addressFormRef.current.clearForm();
    }
  };

  const handleAddressDialogClose = useCallback(() => {
    close();
    handleClearForm();
    setIsEditMode("");
    setEditFormValues(undefined);
  }, [close]);

  return (
    <div>
      <h3 className="text-primary1">Shipping Information</h3>
      <div className="my-2 flex items-center justify-between">
        <h6 className="text-description">Your Saved Addresses</h6>
        <button
          className="fall bg-beige text-description gap-1 rounded-md px-2 py-1 text-sm"
          onClick={open}
        >
          <Icons.add /> Add Address
        </button>
      </div>
      {!loadingAddress ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {savedAddress?.map((item, index) => (
            <SavedAddressCard {...item} key={index} />
          ))}
        </div>
      ) : (
        <div className="shimmer-loading h-[200px] w-full" />
      )}
      <Dialog
        isOpen={isOpen}
        onClose={handleAddressDialogClose}
        title={isEditMode ? `Edit Address` : `Add address`}
        noClose
      >
        <SavedAddressForm
          token={token}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          ref={addressFormRef}
          initialValues={editFormValues}
          onFormSubmit={close}
        />
      </Dialog>
      <DeleteDialog
        isOpen={Boolean(openDeleteAddressDialog)}
        name="this address"
        close={() => setOpenDeleteAddressDialog("")}
        deleteFunc={handleDeleteAddress}
      />
    </div>
  );
};

export default ShippingInformation;
