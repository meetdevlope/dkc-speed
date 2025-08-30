"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import { Input } from "components/Input";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BaseApiResponse } from "types/baseApiTypes";

type RegisterBagButtonProps = {
  sku: string;
  token: string;
};

const RegisterBagButton: React.FC<RegisterBagButtonProps> = (props) => {
  const { sku, token } = props;

  const [checked, setChecked] = useState(false);
  const [skuInput, setSkuInput] = useState("");

  useEffect(() => {
    if (sku !== "bag-number") {
      setSkuInput(sku);
    }
  }, [sku]);

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setChecked(checked);
  }, []);

  const handleSkuChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSkuInput(val);
    },
    [],
  );

  const handleReturn = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order/return-bag/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skuId: skuInput,
          }),
        },
      );

      if (response.ok) {
        const data: BaseApiResponse<string> = await response.json();

        return data.data;
      } else {
        throw new Error(`Failed to return bag: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error returning bag:", error);
      throw error;
    }
  }, [skuInput, token]);

  const { mutateAsync: returnBagMutation, isPending: isLoading } = useMutation({
    mutationFn: handleReturn,
    onSuccess: (res) => {
      if (res) {
        window.open(res);
      } else {
        toast.error("No url for return portal found");
      }
    },
    onError: (error) => {
      console.error("Error in mutation:", error.message);
      toast.error("Could not return bag. Try again!");
    },
  });

  const handleReturnClick = useCallback(async () => {
    await returnBagMutation();
  }, [returnBagMutation]);

  return (
    <div className="flex flex-col">
      <Input
        label="Bag Barcode"
        placeholder="Enter Bag number"
        value={skuInput}
        onChange={handleSkuChange}
      />

      <div className="mt-8 flex gap-2">
        <input
          type="checkbox"
          name="agreeTAndC"
          id="agreeTAndC"
          onChange={handleCheck}
          checked={checked}
          className="cursor-pointer accent-neutral-500"
        />
        <label htmlFor="agreeTAndC">I agree to DKC T&Cs</label>
      </div>
      <Button
        disabled={!checked || !skuInput || skuInput === "bag-number"}
        className="mt-4 w-full"
        onClick={handleReturnClick}
        isLoading={isLoading}
      >
        Register
      </Button>
    </div>
  );
};

export default RegisterBagButton;
