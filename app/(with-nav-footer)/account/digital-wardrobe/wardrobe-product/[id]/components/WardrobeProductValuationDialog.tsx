"use client";

import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import React, { ReactNode } from "react";
import { WardrobeItem } from "../../../action";
import WardrobeProductValuationContent from "./WardrobeProductValuationContent";

interface WardrobeProductValuationProps {
  trigger: ReactNode;
  token: string;
  product: WardrobeItem;
}

const WardrobeProductValuationDialog: React.FC<
  WardrobeProductValuationProps
> = (props) => {
  const { trigger, token, product } = props;
  const { close, isOpen, open } = useToggle();

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
      >
        {trigger}
      </div>
      <Dialog
        isOpen={isOpen}
        onClose={close}
        title="AI Product Valuation"
        noClose
      >
        <WardrobeProductValuationContent
          product={product}
          token={token}
          dialogClose={close}
        />
      </Dialog>
    </div>
  );
};

export default WardrobeProductValuationDialog;
