"use client";

import { useQuery } from "@tanstack/react-query";
import Icon from "components/icon/Icon";
import React from "react";
import { DiscountUtil } from "utils/discount";
import { getBestOffer } from "../action";
import { CurrencyDisplay } from "components/CurrencyDisplay";

type BestProductOfferProps = {
  token: string;
  skuId: string;
  sellingPrice: number;
  originalPrice: number;
  showOnlyBestPrice?: boolean;
  showBestPriceWithSelling?: boolean;
  hideIfNoBestPrice?: boolean;
};

const BestProductOffer: React.FC<BestProductOfferProps> = (props) => {
  const {
    skuId,
    token,
    sellingPrice,
    originalPrice,
    showOnlyBestPrice,
    showBestPriceWithSelling,
    hideIfNoBestPrice,
  } = props;

  const { data: bestOffer } = useQuery({
    queryFn: () => getBestOffer(token || "", skuId),
    queryKey: [`best-offer-${skuId}`],
  });

  if (
    hideIfNoBestPrice &&
    Object.values(bestOffer?.discountMap || {}).length < 1
  ) {
    return null;
  }

  if (!bestOffer?.discountMap) {
    return (
      <div>
        <CurrencyDisplay amount={sellingPrice} />
        <CurrencyDisplay
          amount={originalPrice}
          className="ml-2 text-sm font-medium text-neutral-300 line-through"
        />
      </div>
    );
  }

  if (showOnlyBestPrice)
    return (
      <span className="text-base font-bold">
        {DiscountUtil.getBestPrice(
          bestOffer.discountMap?.[skuId],
          sellingPrice,
        )}
      </span>
    );

  if (showBestPriceWithSelling)
    return (
      <div className="flex gap-2">
        <h5 className="font-medium uppercase">
          <span className="text-base font-semibold">
            {DiscountUtil.getBestPrice(
              bestOffer.discountMap?.[skuId],
              sellingPrice,
            )}
          </span>
          <span className="text-description ml-2 text-sm font-medium line-through">
            <CurrencyDisplay amount={sellingPrice} />
          </span>
        </h5>
        {/* <Tooltip text={bestOffer?.discountTitle || ""}> */}
        <Icon name="info" />
        {/* </Tooltip> */}
      </div>
    );

  return (
    <div className="mx-3 my-5">
      <h5 className="font-medium uppercase">
        Best Price:{" "}
        <span className="text-base font-bold">
          <CurrencyDisplay
            className="font-semibold"
            amount={DiscountUtil.getBestPrice(
              bestOffer.discountMap?.[skuId],
              sellingPrice,
            )}
          />
        </span>
        <span className="ml-2 text-base text-neutral-400 line-through">
          <CurrencyDisplay amount={sellingPrice} />
        </span>
      </h5>
      <h6 className="mt-2 font-secondary text-neutral-400">
        {bestOffer.discountTitle}
      </h6>
    </div>
  );
};

export default BestProductOffer;
