"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "app/(with-nav-footer)/products/[slug]/action";
import Dialog from "components/Dialog";
import { useToggle } from "hooks/useToggle";
import React, { useMemo } from "react";
import QuickViewContent from "./QuickViewContent";
import QuickViewSkeleton from "./QuickViewSkeleton";
import { Product } from "types/product.types";
import Drawer from "components/Drawer";
import useWindowSize from "hooks/useWindowSize";

type QuickViewProps = {
  slug: string;
  token: string;
  skuId: string;
  deviceId: string;
  defProductDetails?: Product;
};

const QuickView: React.FC<QuickViewProps> = (props) => {
  const { slug, token, deviceId, skuId, defProductDetails } = props;
  const { width: deviceWidth } = useWindowSize();

  const { close, isOpen, open } = useToggle();

  const { data: dProductDetails, isLoading: isLoadingProductDetails } =
    useQuery({
      queryKey: [`get-product-details-${skuId}`],
      queryFn: () => getProductDetails(token, slug),
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      enabled: isOpen && !defProductDetails,
    });

  const productDetails = useMemo(
    () => defProductDetails || dProductDetails,
    [dProductDetails, defProductDetails],
  );

  return (
    <>
      <button
        className="fall absolute right-0 bottom-1.5 left-0 mx-auto w-full max-w-[80%] cursor-pointer rounded-md bg-white py-1 text-sm shadow"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      >
        <span className="text-xs transition-all">Quick View</span>
      </button>
      <div>
        {deviceWidth < 600 ? (
          <Drawer isOpen={isOpen} onClose={close} direction="down">
            {!isLoadingProductDetails ? (
              <QuickViewContent
                productDetails={productDetails as Product}
                deviceId={deviceId}
                skuId={skuId}
                token={token}
                direction="vertical"
              />
            ) : (
              <QuickViewSkeleton direction="vertical" />
            )}
          </Drawer>
        ) : (
          <Dialog
            isOpen={isOpen}
            onClose={close}
            title="Product"
            size="lg"
            noClose
          >
            {!isLoadingProductDetails ? (
              <QuickViewContent
                productDetails={productDetails as Product}
                deviceId={deviceId}
                skuId={skuId}
                token={token}
              />
            ) : (
              <QuickViewSkeleton />
            )}
          </Dialog>
        )}
      </div>
    </>
  );
};

export default QuickView;
