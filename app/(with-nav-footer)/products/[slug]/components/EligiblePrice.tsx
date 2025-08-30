import { CurrencyDisplay } from "components/CurrencyDisplay";
import React from "react";
import { useCartStore } from "store/cart";
import { DiscountUtil } from "utils/discount";
import EligibleDiscountInfoDialog from "./EligibleDiscountInfoDialog";

type EligiblePriceProps = {
  skuId: string;
  sellingPrice: number;
  originalPrice: number;
  showOnlyPrice?: boolean;
  showPriceWithSelling?: boolean;
  rentalSubTotal?: number;
};

const EligiblePrice: React.FC<EligiblePriceProps> = (props) => {
  const {
    originalPrice,
    skuId,
    showOnlyPrice,
    sellingPrice,
    showPriceWithSelling,
    rentalSubTotal = 0,
  } = props;

  const { myDiscounts } = useCartStore();

  // const cartOriginalPrice = useMemo(() => {
  //   if (cartData) {
  //     const item = cartData.find(
  //       (e) =>
  //         (e.details as ProductCart).skuId === skuId &&
  //         e.cart.type === CartTypeEnum.product_rent,
  //     );

  //     return (item?.details as ProductCart)?.originalPrice || 0;
  //   }
  //   return originalPrice;
  // }, [cartData, originalPrice, skuId]);

  const productDiscount = myDiscounts?.discountMap?.[skuId] || 0;

  const validOriginalPrice = () => {
    const newOriginalPrice = rentalSubTotal || originalPrice;

    if (newOriginalPrice <= sellingPrice) return;

    return (
      <div>
        <CurrencyDisplay
          amount={Number(productDiscount) > 0 ? sellingPrice : newOriginalPrice}
          className="ml-1 text-sm font-normal text-neutral-300 line-through"
        />
      </div>
    );
  };

  if (!myDiscounts.discountMap) {
    return (
      <div className="flex items-center gap-x-2">
        <CurrencyDisplay amount={sellingPrice} className="font-medium" />
        {validOriginalPrice()}
      </div>
    );
  }

  const isEligible = Object.keys(myDiscounts.discountMap).find(
    (e) => e === skuId,
  );

  if (showOnlyPrice)
    return (
      <CurrencyDisplay
        className="font-medium"
        amount={DiscountUtil.getBestPrice(productDiscount, sellingPrice)}
      />
    );

  if (showPriceWithSelling)
    return (
      <div className="flex gap-2">
        <CurrencyDisplay
          className="font-medium"
          amount={DiscountUtil.getBestPrice(productDiscount, sellingPrice)}
        />
        {validOriginalPrice()}
        {isEligible === skuId && (
          <EligibleDiscountInfoDialog
            amount={productDiscount}
            title={myDiscounts?.discountTitle}
          />
        )}
      </div>
    );

  return (
    <div className="mx-3 my-5">
      <h5 className="font-medium uppercase">
        Best Price:{" "}
        <CurrencyDisplay
          className="text-base font-medium"
          amount={DiscountUtil.getBestPrice(0, sellingPrice)}
        />
      </h5>
      {validOriginalPrice()}
      <CurrencyDisplay
        className="mt-2 text-base font-medium"
        amount={productDiscount}
      />
    </div>
  );
};

export default EligiblePrice;
