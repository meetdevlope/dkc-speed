"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BaseApiResponse } from "types/baseApiTypes";

interface ConfirmReturnButtonProps {
  token: string;
  id: string;
}

const ConfirmBagReturnButton: React.FC<ConfirmReturnButtonProps> = (props) => {
  const { id, token } = props;
  const router = useRouter();

  const mutationConfirm = useMutation({
    mutationFn: () => returnBagConfirm(token, id),
    onSuccess: async (response) => {
      if (response) {
        router.refresh();
        toast.success("Bag return confirmed");
      }
    },
  });

  return (
    <Button
      size="md"
      onClick={mutationConfirm.mutate}
      fullWidth
      isLoading={mutationConfirm?.isPending}
      variant="outline"
    >
      Confirm Return Initiation
    </Button>
  );
};

export default ConfirmBagReturnButton;

const returnBagConfirm = async (
  token: string,
  orderId: string,
): Promise<string> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/order/return-bag/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
        }),
      },
    );

    const data: BaseApiResponse<string> = await res.json();

    if (!res.ok) {
      toast.error(`${data?.message}`);
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    const msg = error as string;
    throw new Error(msg);
  }
};
