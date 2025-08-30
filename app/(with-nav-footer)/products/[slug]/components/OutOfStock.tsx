"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "store/auth";
import { createNotification } from "../action";
import ErrorText from "components/ErrorText";
import Link from "next/link";
import { ROUTES } from "utils/routes";

type OutOfStockProps = {
  token: string;
  skuId: string;
};

const OutOfStock: React.FC<OutOfStockProps> = (props) => {
  const { skuId, token } = props;

  const userEmail = useAuthStore()?.user?.user?.email;
  const [showLoginError, setShowLoginError] = useState<string>("");

  const createNotificationMutation = useMutation({
    mutationFn: () => createNotification(token, skuId),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`We'll notify you on - ${userEmail}`);
    },
    onError: () => {
      toast.error("Send notification failed");
    },
  });

  const handleClick = async () => {
    try {
      if (userEmail) {
        await createNotificationMutation.mutateAsync();
      } else {
        setShowLoginError("You must be logged in.");
      }
    } catch (error) {
      toast.success(`We'll notify you on - ${userEmail}`);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-2 rounded-md bg-neutral-50 p-1">
        <h6 className="text-center font-medium text-neutral-400">
          Item out of stock
        </h6>
      </div>

      <Button fullWidth variant="outline" onClick={handleClick}>
        Notify me when available
      </Button>
      {showLoginError && (
        <div className="fall mt-2 gap-x-1">
          <ErrorText> {showLoginError} </ErrorText>
          <Link
            href={ROUTES.LOGIN + "?redirectTo=" + ROUTES.PRODUCTS.SLUG(skuId)}
          >
            <Button size="sm">Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OutOfStock;
