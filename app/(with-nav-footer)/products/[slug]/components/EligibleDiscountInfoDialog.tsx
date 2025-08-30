"use client";

import { CurrencyDisplay } from "components/CurrencyDisplay";
import Dialog from "components/Dialog";
import Icon from "components/icon/Icon";
import { useToggle } from "hooks/useToggle";
import React from "react";

interface EligibleDiscountInfoDialogProps {
  amount: number;
  title: string;
}

const EligibleDiscountInfoDialog: React.FC<EligibleDiscountInfoDialogProps> = (
  props,
) => {
  const { amount, title } = props;
  const { close, isOpen, open } = useToggle();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    open();
  };

  return (
    <>
      <Icon
        name="info"
        size={20}
        iconType="stroke"
        color="var(--neutral-400)"
        onClick={handleClick}
      />
      <Dialog isOpen={isOpen} onClose={close} title="Discount Details">
        Saved <CurrencyDisplay amount={amount} /> with {title}
      </Dialog>
    </>
  );
};

export default EligibleDiscountInfoDialog;
