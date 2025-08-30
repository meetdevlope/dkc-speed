"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { returnRentConfirm, returnRentProduct } from "../action";

interface ConfirmReturnButtonProps {
  token: string;
  id: string;
}

const ConfirmReturnButton: React.FC<ConfirmReturnButtonProps> = (props) => {
  const { id, token } = props;
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => returnRentProduct(token, id),
    onSuccess: async (response) => {
      if (response) {
        window.open(response, "_blank");
      }
    },
  });

  const mutationConfirm = useMutation({
    mutationFn: () => returnRentConfirm(token, id),
    onSuccess: async (response) => {
      if (response) {
        router.refresh();
        toast.success("Rent confirmed");
      }
    },
  });

  return (
    <div>
      <Button
        size="md"
        onClick={mutationConfirm.mutate}
        fullWidth
        className="mt-1"
        isLoading={mutationConfirm?.isPending}
      >
        Confirm Return Initiation
      </Button>
      <h6 className="mt-2 text-center text-gray-500">
        Didn&apos;t initiated return?{" "}
        <Button
          variant="link"
          size="md"
          onClick={mutation.mutate}
          className="!p-0 font-medium text-gray-800"
        >
          {mutation.isPending ? "Loading..." : "Re-initiate"}
        </Button>
      </h6>
    </div>
  );
};

export default ConfirmReturnButton;
