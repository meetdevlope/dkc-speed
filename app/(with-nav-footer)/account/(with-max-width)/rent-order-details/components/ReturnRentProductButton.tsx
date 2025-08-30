"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "components/Button";
import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import React from "react";
import { returnRentProduct } from "../action";
import { useRouter } from "next/navigation";

interface ReturnRentProductButtonProps {
  token: string;
  id: string;
}

const ReturnRentProductButton: React.FC<ReturnRentProductButtonProps> = (
  props,
) => {
  const { id, token } = props;
  const { isOpen, open, close } = useToggle();
  const route = useRouter();

  const mutation = useMutation({
    mutationFn: () => returnRentProduct(token, id),
    onSuccess: async (response) => {
      if (response) {
        window.open(response);
        close();
        route.refresh();
      }
    },
  });

  return (
    <>
      <Button size="sm" fullWidth className="mt-1" onClick={open}>
        Initiate Return
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={close}
        title="Product Return Process"
        noClose
        actions={{
          primary: {
            label: "Initiate Return",
            onClick: mutation.mutate,
            loading: mutation.isPending,
            size: "md",
          },
          secondary: {
            label: "Close",
            onClick: close,
            size: "md",
          },
        }}
      >
        <ol className="list-inside list-decimal space-y-4 text-gray-700">
          <li>
            <span className="font-medium text-gray-900">
              You&apos;ll be redirected
            </span>{" "}
            to our return partner&apos;s portal.
          </li>
          <li>
            <span className="font-medium text-gray-900">
              Fill in the required details
            </span>{" "}
            and submit your return request there.
          </li>
          <li>
            <span className="font-medium text-gray-900">
              Once you&apos;re done, come back
            </span>{" "}
            to this page.
          </li>
          <li>
            <span className="font-medium text-gray-900">
              Click the &quot;Confirm Return Initiation&quot; button
            </span>{" "}
            below to confirm your return.
          </li>
        </ol>
      </Dialog>
    </>
  );
};

export default ReturnRentProductButton;
