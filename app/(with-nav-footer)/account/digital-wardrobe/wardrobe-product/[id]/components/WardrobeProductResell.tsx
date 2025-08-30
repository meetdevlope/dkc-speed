"use client";

import { Button } from "components/Button";
import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import Link from "next/link";
import React from "react";
import { ROUTES } from "utils/routes";
import WardrobeProductValuationContent from "./WardrobeProductValuationContent";
import { WardrobeItem } from "../../../action";

interface WardrobeProductResellProps {
  token: string;
  product: WardrobeItem;
}

const WardrobeProductResell: React.FC<WardrobeProductResellProps> = (props) => {
  const { product, token } = props;

  const { close, isOpen, open } = useToggle();
  const {
    isOpen: findValuation,
    open: openFindValuation,
    close: closeFindValuation,
  } = useToggle();

  const handleClose = () => {
    close();
    closeFindValuation();
  };

  return (
    <div className="w-full">
      <Button onClick={open} size="md" fullWidth>
        Resell
      </Button>
      <Dialog isOpen={isOpen} onClose={close} title="Request Resell" noClose>
        {findValuation ? (
          <WardrobeProductValuationContent
            product={product}
            token={token}
            dialogClose={handleClose}
          />
        ) : (
          <div>
            <div className="flex items-center gap-x-1">
              <h6 className="text-center">
                Hey, do you want to figure out the valuation?
              </h6>
              <button
                className="cursor-pointer font-medium text-primary-500 underline"
                onClick={openFindValuation}
              >
                Know Your Item Value with AI
              </button>
            </div>
            <div className="mt-8 flex items-center justify-end gap-x-4">
              <Button onClick={close} size="md" variant="outline">
                Maybe later
              </Button>
              <Link href={ROUTES.PRODUCTS.ORDER_DKC_BAG}>
                <Button fullWidth size="md">
                  Order bag
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default WardrobeProductResell;
